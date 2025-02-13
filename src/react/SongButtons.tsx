import { Fragment, type FC } from "react";
import { useRobbPlayerContext } from "./RobbPlayerProvider";

import { makeIsolatedPatternSongs } from "../makeIsolatedPatternSongs";
import { makeIsolatedInstrumentSongs } from "../makeIsolatedInstrumentSongs";
import { type RobbSong, type PlayerListeners } from "../robbPlayer";

const listeners: PlayerListeners = {
  onTrackAdvance: (
    voice: number,
    trackPos: number,
    pat: number,
  ) => {
    {
      const el = document.getElementById(`track${voice}pos`);
      el!.innerText = String(trackPos);
    }
    {
      const el = document.getElementById(`track${voice}pat`);
      el!.innerText = String(pat);
    }
  },
  onPatAdvance: (voice, patPos) => {
    const el = document.getElementById(`track${voice}patpos`);
    el!.innerText = String(patPos);
  },
};

export const SongButtons: FC<{ song: RobbSong, warn: boolean }> = ({ song, warn }) => {
  const { play } = useRobbPlayerContext();

  return (
    <Fragment>
      {
        warn && (
          <p>
            ⚠️ The player was written for Monty On The Run’s instrument effects.
            Things might not sound right.
          </p>
        )
      }
      <div>
        <button onClick={() => {
            play(song, listeners);
          }}>Play song
        </button>
      </div>
      <div>
        <h4>Patterns</h4>
        {
          makeIsolatedPatternSongs(song).map(
            (song, index) => (
              song
                ? (
                  <button key={index} onClick={() => {
                    play(song, listeners);
                  }}>
                    {String(index)}
                  </button>
                )
                : null
            )
          )
        }
      </div>
      <div>
        <h4>Instruments</h4>
        {
          makeIsolatedInstrumentSongs(song).map(
            (song, index) => (
              song
                ? (
                  <button key={index} onClick={() => {
                    play(song, listeners);
                  }}>
                    {String(index)}
                  </button>
                )
                : null
            )
          )
        }
      </div>
    </Fragment>
  );
}
