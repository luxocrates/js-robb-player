import { Fragment, useMemo, useState, type FC } from "react";
import { useRobbPlayerContext } from "./RobbPlayerProvider";

import { makeIsolatedPatternSongs } from "../makeIsolatedPatternSongs";
import { makeIsolatedInstrumentSongs } from "../makeIsolatedInstrumentSongs";
import { type RobbSong, type PlayerListeners } from "../robbPlayer";
import { type CompatibilityWarning } from "./Page";

const activeInstForVoice: (number | undefined)[] = [
  undefined,
  undefined,
  undefined,
];

function removeActiveInstForVoice(voice: number) {
  const curr = activeInstForVoice[voice];
  if (curr !== undefined) {
    const els = document.getElementsByClassName(`inst${curr}`);
    for (const el of els) {
      el.classList.remove(`activeOnVoice${voice}`);
    }
  }
}

function addActiveInstForVoice(voice: number) {
  const curr = activeInstForVoice[voice];
  if (curr !== undefined) {
    const els = document.getElementsByClassName(`inst${curr}`);
    for (const el of els) {
      el.classList.add(`activeOnVoice${voice}`);
    }
  }
}

function makeListeners(
  trackPosSetters: ((_: null | number) => void)[],
  trackPatSetters: ((_: null | number) => void)[],
): PlayerListeners {
  return {
    onStop() {
      for (let voice = 0; voice < 3; voice++ ) {
        trackPosSetters[voice](null);
        trackPatSetters[voice](null);
      }
    },

    onTrackAdvance(
      voice: number,
      trackPos: number,
      pat: number,
    ) {
      trackPosSetters[voice](trackPos);
      trackPatSetters[voice](pat);

      // TODO: make these React-hosted
      {
        const el = document.getElementById(`track${voice}pos`);
        el!.innerText = String(trackPos);
      }
      {
        const el = document.getElementById(`track${voice}pat`);
        el!.innerText = String(pat);
      }
    },

    onPatAdvance(voice, patPos) {
      // TODO: make these React-hosted
      const el = document.getElementById(`track${voice}patpos`);
      el!.innerText = String(patPos);
    },

    onNewNote(voice, instNum) {
      // TODO: make these React-hosted
      void voice;
      const els = document.getElementsByClassName(`inst${instNum}`);
      for (const el of els) {
        el.classList.add("fresh");
        setTimeout(
          () => el.classList.remove("fresh"),
          68
        );
      }
    },
  
    onNewInstrument(voice, instNum) {
      // TODO: make these React-hosted
      removeActiveInstForVoice(voice);
      activeInstForVoice[voice] = instNum;
      addActiveInstForVoice(voice);
    }
  };
};

const warningStrings: {[key in CompatibilityWarning]: string} = {
  monty:
    "The player was written for Monty On The Run’s effects set. " +
    "Instruments might not sound right.",
  wait15s:
    "The first 15s are a little painful, but it gets better!",
};

export const SongButtons: FC<{
  song: RobbSong, warnings: CompatibilityWarning[]
}> = ({ song, warnings }) => {
  const { play, stop } = useRobbPlayerContext();
  const [ showTrack, setShowTrack ] = useState<null | number>(null);

  const [ track0Pos, setTrack0Pos ] = useState<null | number>(null);
  const [ track1Pos, setTrack1Pos ] = useState<null | number>(null);
  const [ track2Pos, setTrack2Pos ] = useState<null | number>(null);

  const [ track0Pat, setTrack0Pat ] = useState<null | number>(null);
  const [ track1Pat, setTrack1Pat ] = useState<null | number>(null);
  const [ track2Pat, setTrack2Pat ] = useState<null | number>(null);

  const trackPosSetters = [
    setTrack0Pos,
    setTrack1Pos,
    setTrack2Pos,
  ];
  const trackPatSetters = [
    setTrack0Pat,
    setTrack1Pat,
    setTrack2Pat,
  ];

  const trackPatGetters = [
    track0Pat,
    track1Pat,
    track2Pat,
  ];

  const makeMakeListeners = () => makeListeners(trackPosSetters, trackPatSetters);

  /** An array of songs, corresponding to an isolated pattern */
  const isolatedPatternSongs = useMemo(
    // TODO: later we'll want to build these on-demand, to play them in the
    // right voice if you've clicked a button in the track-isolation mode
    () => makeIsolatedPatternSongs(song),
    [ song ]
  );

  /** An array of songs, corresponding to one note of an instrument */
  const isolatedInstrumentSongs = useMemo(
    () => makeIsolatedInstrumentSongs(song),
    [ song ]
  );

  /**
   * We want to show patterns that are unterminated, and lead into the next
   * one contiguously in memory. (In turn, that one could potentially lead into
   * yet another, though I haven't seen that happen yet).
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
   * This is theoretical. I've yet to see in practice any chaining beyond one
   * successor.
   * 
   * An infinite loop isn't possible.
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

  const instruments = isolatedInstrumentSongs.map(
    (song, index) => (
      song
        ? (
          <button
            key={index}
            className={`inst${index}`}
            onClick={() => {
              play(song, makeMakeListeners());
            }}
          >
            {String(index)}
          </button>
        )
        : null
    )
  );

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
    const trackPosGetters = [
      track0Pos,
      track1Pos,
      track2Pos,
    ];

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
          : null
      )
    );
  }

  const patterns = (showTrack === null)
    ? makeButtonsForAllPatterns()
    : makePatternButtonsForTrack(showTrack);


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

  const warningList = warnings.map(
    (type, i) => (
      <div key={i}>
        ⚠️{" "}
        <small>{warningStrings[type]}</small>
      </div>
    )
  );

  return (
    <Fragment>
      
      <div>
        <button onClick={() => play(song, makeMakeListeners())}>
          Play song
        </button>
        <button onClick={() => {
          stop();
          // TODO
          // (listeners.onStop!)();

          for (let voice = 0; voice < 3; voice++ ) {
            trackPosSetters[voice](null);
            trackPatSetters[voice](null);
          }
        }}>
          Stop
        </button>
      </div>

      { warningList }

      <h4>Tracks</h4>

      { trackInfo }

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
      <div>
        <h4>Instruments</h4>
        { instruments }
        <p>
          🤓{" "}
          <small>
            If an instrument doesn’t highlight when you play an isolated
            pattern, it’s because the pattern doesn’t start with an instrument
            change. A placeholder instrument will be used.
          </small>
        </p>
      </div>
    </Fragment>
  );
}
