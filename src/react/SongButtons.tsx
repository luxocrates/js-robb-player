import { Fragment, type FC } from "react";
import { useRobbPlayerContext } from "./RobbPlayerProvider";

import { makeIsolatedPatternSongs } from "../makeIsolatedPatternSongs";
import { makeIsolatedInstrumentSongs } from "../makeIsolatedInstrumentSongs";
import { type RobbSong, type PlayerListeners } from "../robbPlayer";
import { type CompatibilityWarning } from "./Page";

const activePatForVoice: (number | undefined)[] = [
  undefined,
  undefined,
  undefined,
];

const activeInstForVoice: (number | undefined)[] = [
  undefined,
  undefined,
  undefined,
];

function removeActiveTagForVoice(voice: number, curr: number, tag: string) {
  if (curr !== undefined) {
    const els = document.getElementsByClassName(`${tag}${curr}`);
    for (const el of els) {
      el.classList.remove(`activeOnVoice${voice}`);
    }
  }
}

function addActiveTagForVoice(voice: number, curr: number, tag: string) {
  const els = document.getElementsByClassName(`${tag}${curr}`);
  for (const el of els) {
    el.classList.add(`activeOnVoice${voice}`);
  }
}

function removeActivePatForVoice(voice: number) {
  const curr = activePatForVoice[voice];
  if (curr !== undefined) {
    removeActiveTagForVoice(voice, curr, "pattern");
  }
}

function addActivePatForVoice(voice: number) {
  const curr = activePatForVoice[voice];
  if (curr !== undefined) {
    addActiveTagForVoice(voice, curr, "pattern");
  }
}

function removeActiveInstForVoice(voice: number) {
  const curr = activeInstForVoice[voice];
  if (curr !== undefined) {
    removeActiveTagForVoice(voice, curr, "inst");
  }
}

function addActiveInstForVoice(voice: number) {
  const curr = activeInstForVoice[voice];
  if (curr !== undefined) {
    addActiveTagForVoice(voice, curr, "inst");
  }
}


const listeners: PlayerListeners = {
  onStop() {
    for (let voice = 0; voice < 3; voice++ ) {
      removeActivePatForVoice(voice);
      removeActiveInstForVoice(voice);
    }
  },

  onTrackAdvance(
    voice: number,
    trackPos: number,
    pat: number,
  ) {
    {
      const el = document.getElementById(`track${voice}pos`);
      el!.innerText = String(trackPos);
    }
    {
      const el = document.getElementById(`track${voice}pat`);
      el!.innerText = String(pat);
    }

    removeActivePatForVoice(voice);
    activePatForVoice[voice] = pat;
    addActivePatForVoice(voice);
  },

  onPatAdvance(voice, patPos) {
    const el = document.getElementById(`track${voice}patpos`);
    el!.innerText = String(patPos);
  },

  onNewInstrument(voice, instNum) {
    removeActiveInstForVoice(voice);
    activeInstForVoice[voice] = instNum;
    addActiveInstForVoice(voice);
  }
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

  const instruments = makeIsolatedInstrumentSongs(song).map(
    (song, index) => (
      song
        ? (
          <button
            key={index}
            className={`inst${index}`}
            onClick={() => {
              play(song, listeners);
            }}
          >
            {String(index)}
          </button>
        )
        : null
    )
  );

  const patterns = makeIsolatedPatternSongs(song).map(
    (song, index) => (
      song
        ? (
          <button
            className={`pattern${index}`}
            key={index}
            onClick={() => {
              play(song, listeners);
            }}
          >
            {[index, ...patternChains[index]].map(i => String(i)).join(" → ")}
          </button>
        )
        : null
    )
  );

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
        <button onClick={() => { play(song, listeners); }}>
          Play song
        </button>
        <button onClick={() => {
          stop();
          (listeners.onStop!)();
        }}>
          Stop
        </button>
      </div>

      { warningList }

      <h4>Tracks</h4>

      { trackInfo }

      <div className="patterns">
        <h4>Patterns</h4>
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
