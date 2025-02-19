import { Fragment, useMemo, useState, type FC } from "react";
import { useRobbPlayerContext } from "./RobbPlayerProvider";

import { makeIsolatedPatternSongs } from "../makeIsolatedPatternSongs";
import { makeIsolatedInstrumentSongs } from "../makeIsolatedInstrumentSongs";
import { type RobbSong, type PlayerListeners } from "../robbPlayer";
import { type CompatibilityWarning } from "./Page";
import { Tracks } from "./Tracks";
import { Patterns } from "./Patterns";
import { Instruments } from "./Instruments";

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
  trackPatNumSetters: ((_: null | number) => void)[],
  trackPatPosSetters: ((_: null | number) => void)[],
): PlayerListeners {
  return {
    onStop() {
      for (let voice = 0; voice < 3; voice++ ) {
        trackPosSetters[voice](null);
        trackPatNumSetters[voice](null);
      }
    },

    onTrackAdvance(
      voice: number,
      trackPos: number,
      pat: number,
    ) {
      trackPosSetters[voice](trackPos);
      trackPatNumSetters[voice](pat);

      // TODO: make these React-hosted
      {
        const el = document.getElementById(`track${voice}pos`);
        if (el) el.innerText = String(trackPos);
      }
      {
        const el = document.getElementById(`track${voice}pat`);
        if (el) el.innerText = String(pat);
      }
    },

    onPatAdvance(voice, patPos) {
      trackPatPosSetters[voice](patPos);

      // TODO: make these React-hosted
      const el = document.getElementById(`track${voice}patpos`);
      if (el) el.innerText = String(patPos);
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
  missingFx:
    "The player may be missing some instrument effects for this song",
  wait15s:
    "The first 15s are a little painful, but it gets better!",
};

export const SongButtons: FC<{
  song: RobbSong, warnings: CompatibilityWarning[]
}> = ({ song, warnings }) => {
  const { play, stop } = useRobbPlayerContext();

  const [ track0Pos, setTrack0Pos ] = useState<null | number>(null);
  const [ track1Pos, setTrack1Pos ] = useState<null | number>(null);
  const [ track2Pos, setTrack2Pos ] = useState<null | number>(null);

  const [ track0PatNum, setTrack0PatNum ] = useState<null | number>(null);
  const [ track1PatNum, setTrack1PatNum ] = useState<null | number>(null);
  const [ track2PatNum, setTrack2PatNum ] = useState<null | number>(null);

  const [ track0PatPos, setTrack0PatPos ] = useState<null | number>(null);
  const [ track1PatPos, setTrack1PatPos ] = useState<null | number>(null);
  const [ track2PatPos, setTrack2PatPos ] = useState<null | number>(null);

  const trackPosGetters = [
    track0Pos,
    track1Pos,
    track2Pos,
  ];

  const trackPosSetters = [
    setTrack0Pos,
    setTrack1Pos,
    setTrack2Pos,
  ];


  const trackPatNumGetters = [
    track0PatNum,
    track1PatNum,
    track2PatNum,
  ];

  const trackPatNumSetters = [
    setTrack0PatNum,
    setTrack1PatNum,
    setTrack2PatNum,
  ];

  const trackPatPosGetters = [
    track0PatPos,
    track1PatPos,
    track2PatPos,
  ];

  const trackPatPosSetters = [
    setTrack0PatPos,
    setTrack1PatPos,
    setTrack2PatPos,
  ];

  const makeMakeListeners = () => makeListeners(
    trackPosSetters,
    trackPatNumSetters,
    trackPatPosSetters
  );

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

  const warningList = warnings.map(
    (type, i) => (
      <div key={i}>
        ⚠️{" "}
        <small>{warningStrings[type]}</small>
      </div>
    )
  );

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
            trackPatNumSetters[voice](null);
            trackPatPosSetters[voice](null);
          }
        }}>
          Stop
        </button>
      </div>

      { warningList }

      <Tracks
        song={song}
        isolatedPatternSongs={isolatedPatternSongs}
        trackPosGetters={trackPosGetters}
        trackPatNumGetters={trackPatNumGetters}
        makeMakeListeners={makeMakeListeners}
        patternChains={patternChains}
      />

      <Patterns
        song={song}
        isolatedPatternSongs={isolatedPatternSongs}
        trackPatNumGetters={trackPatNumGetters}
        trackPatPosGetters={trackPatPosGetters}
        makeMakeListeners={makeMakeListeners}
        patternChains={patternChains}
      />

      <Instruments
        isolatedInstrumentSongs={isolatedInstrumentSongs}
        makeMakeListeners={makeMakeListeners}
      />
      
    </Fragment>
  );
}
