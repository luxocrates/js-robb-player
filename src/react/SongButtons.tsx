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

  const [ track0Pat, setTrack0Pat ] = useState<null | number>(null);
  const [ track1Pat, setTrack1Pat ] = useState<null | number>(null);
  const [ track2Pat, setTrack2Pat ] = useState<null | number>(null);

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

      <Tracks />

      <Patterns
        song={song}
        isolatedPatternSongs={isolatedPatternSongs}
        trackPosGetters={trackPosGetters}
        trackPatGetters={trackPatGetters}
        makeMakeListeners={makeMakeListeners}
      />

      <Instruments
        isolatedInstrumentSongs={isolatedInstrumentSongs}
        makeMakeListeners={makeMakeListeners}
      />
      
    </Fragment>
  );
}
