import { type FC, useState } from "react";
import { PlayerListeners, RobbSong } from "../robbPlayer";
import { useRobbPlayerContext } from "./RobbPlayerProvider";

export const Tracks: FC<{
  song: RobbSong,
  isolatedPatternSongs: (RobbSong | undefined)[],
  trackPosGetters: (number | null)[],
  trackPatNumGetters: (number | null)[],
  makeMakeListeners: () => PlayerListeners,
  patternChains: number[][],
}> = ({
  song,
  isolatedPatternSongs,
  trackPosGetters,
  trackPatNumGetters: trackPatGetters,
  makeMakeListeners,
  patternChains,
}) => {
  const { play } = useRobbPlayerContext();
  const [ showTrack, setShowTrack ] = useState<null | number>(null);

  const trackInfo = (
    [0, 1, 2].map(
      (voice) => (
        <div key={voice} className={`voice${voice}`}>
          Track <span className="changingNumber">{voice}</span>
          <span>
            {" "}
            pos:
            {" "}
            <span
              id={`track${voice}pos`}
              className="changingNumber"
            >
              -
            </span>
            {" "}
            pat:
            {" "}
            <span
              id={`track${voice}pat`}
              className="changingNumber"
            >
              -
            </span>
            , offset
            {" "}
            <span
              id={`track${voice}patpos`}
              className="changingNumber"
            >
              -
            </span>
          </span>
        </div>
      )
    )
  );

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

  return (
    <>
      <h4>Tracks</h4>
      {
        <>
          <div className="trackRadios">
            {
              ([
                [null, "Summary"],
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
          {
            (showTrack === null)
              ? trackInfo
              : makePatternButtonsForTrack(showTrack)
          }
        </>
      }
    </>
  );
};
