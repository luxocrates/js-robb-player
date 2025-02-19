import { useState, type FC } from "react";
import { useRobbPlayerContext } from "./RobbPlayerProvider";
import { type PlayerListeners, type RobbSong } from "../robbPlayer";

export const Patterns: FC<{
  song: RobbSong,
  isolatedPatternSongs: (RobbSong | undefined)[],
  trackPosGetters: (number | null)[],
  trackPatGetters: (number | null)[],
  makeMakeListeners: () => PlayerListeners,
}> = ({
  song,
  isolatedPatternSongs,
  trackPosGetters,
  trackPatGetters,
  makeMakeListeners,
}) => {
  const [ showTrack, setShowTrack ] = useState<null | number>(null);
  const { play } = useRobbPlayerContext();
  // const [ isTracksExpanded, setIsTracksExpanded] = useState(false);

    /**
     * We want to show patterns that are unterminated, and lead into the next
     * one contiguously in memory; which, in turn, that one could potentially
     * lead into yet another. Of the songs I've seen, Zoids song 0 currently holds
     * the record at a chain of 3).
     *
     * For the first step of that, we build an array where each element contains
     * the pattern number of the first subsumed pattern.
     */
    const immediateFollowers = new Map<number, number>();
    for (let i = 0; i < song.patterns.length; i++) {
      if (song.patterns[i].bytes.length === 0) continue;

      const thisPat = song.patterns[i];
      let lowestSubsumedPatOffset = Number.MAX_SAFE_INTEGER;
      let lowestSubsumedPatNumber: (null | number) = null;

      const { bytes, offset: iOffset } = thisPat;
      const iPatLength = bytes.length;

      for (let j = 0; j < song.patterns.length; j++) {
        if (i === j) continue;
        const jOffset = song.patterns[j].offset;

        if (jOffset > iOffset && jOffset < (iOffset + iPatLength)) {
          if (jOffset < lowestSubsumedPatOffset) {
            lowestSubsumedPatNumber = j;
            lowestSubsumedPatOffset = jOffset;
          }
        }
      }

      if (lowestSubsumedPatNumber !== null) {
        immediateFollowers.set(i, lowestSubsumedPatNumber);
      }
    }

  /**
   * Now we have the immediate-followers lookup, build an array that follows
   * each pattern to its child, to its grandchild, etc.
   * 
   * (No, an infinite loop isn't possible.)
   */
  const patternChains: number[][] = [];
  for (let i = 0; i < song.patterns.length; i++) {
    const chain = [];
    let curr = i;
    while (true) {
      const next = immediateFollowers.get(curr);
      if (next === undefined) break;
      chain.push(next);
      curr = next;
    }
    patternChains.push(chain);
  }

  function makeButtonsForAllPatterns() {
    return isolatedPatternSongs.map(
      (song, index) => (
        song
          ? (
            <button
              className={
                [
                  ...(
                    [0, 1, 2].map(
                      (voice) => (
                        trackPatGetters[voice] === index
                          ? [`activeOnVoice${voice}`]
                          : []
                      )
                    ).flat()
                  )
                ].join(" ")
              }
              key={index}
              onClick={() => play(song, makeMakeListeners())}
            >
              {[index, ...patternChains[index]].map(
                i => String(i)).join(" → ")
              }
            </button>
          )
          : null
      )
    );
  }

  function makePatternButtonsForTrack(voice: number) {
    return song.tracks[voice].map(
      (pat, index) => (
        pat !== 0xff && pat !== 0xfe
          ? (
            <button
              className={
                [0, 1, 2].map(
                  // `voice` is the isolated track we're building this pattern
                  // list for.
                  // `voice2` will ne an iterator through other tracks to see
                  // if any are playing this pattern.
                  (voice2) => (
                    [
                      ...(
                        (trackPosGetters[voice] === index)
                          ? ["trackpos"]
                          : []
                      ),
                      ...(
                        (trackPatGetters[voice2] === pat) ? [`activeOnVoice${voice2}`] : []
                      ),
                    ]
                  )
                ).flat().join(" ")
              }
              key={index}
              onClick={() => {
                play(isolatedPatternSongs[pat]!, makeMakeListeners());
              }}
            >
              {[pat, ...patternChains[pat]].map(i => String(i)).join(" → ")}
            </button>
          )
          : (
            <button disabled key={index}>
              {pat}
            </button>
          )
      )
    );
  }

  const patterns = (showTrack === null)
    ? makeButtonsForAllPatterns()
    : makePatternButtonsForTrack(showTrack);

  return (
    <div className="patterns">
      <h4>Patterns</h4>
      <div className="trackRadios">
        {
          ([
            [null, "All"],
            [0, "Track 0"],
            [1, "Track 1"],
            [2, "Track 2"],
          ] as [(null | number), string][]).map(
            ([value, label]) => (
              <button
                className={
                  [
                    "radio",
                    ...[(showTrack === value) && "selected"]
                  ].join(" ")
                }
                key={label}
                onClick={
                  () => { setShowTrack(value); }
                }
              >
                {label}
              </button>
            )
          )
        }
      </div>
      { patterns }
    </div>
  );
};
