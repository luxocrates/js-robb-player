import { useState } from "react";

import monty0 from "../robbSongs/Monty_on_the_Run0";
import monty1 from "../robbSongs/Monty_on_the_Run1";
import monty2 from "../robbSongs/Monty_on_the_Run2";
import commando0 from "../robbSongs/Commando0";
import commando1 from "../robbSongs/Commando1";
import commando2 from "../robbSongs/Commando2";
import crazyComets0 from "../robbSongs/Crazy_Comets0";
import masterOfMagic0 from "../robbSongs/Master_of_Magic0";
import gremlins0 from "../robbSongs/Gremlins0";
import warhawk0 from "../robbSongs/Warhawk0";
import oneMan0 from "../robbSongs/One_Man_and_his_Droid0";
import gerry1 from "../robbSongs/Gerry_the_Germ1";
import zoids0 from "../robbSongs/Zoids0";

import { type RobbSong } from "../robbPlayer";

import { SongButtons } from "./SongButtons";
import { useRobbPlayerContext } from "./RobbPlayerProvider";

export type CompatibilityWarning = "monty" | "wait15s";

const songs: {
  song: RobbSong,
  name: string,
  warnings: CompatibilityWarning[],
}[] = [
  {
    song: monty0,
    name: "Monty On The Run song 0",
    warnings: [],
  },
  {
    song: monty1,
    name: "Monty On The Run song 1",
    warnings: [],
  },
  {
    song: monty2,
    name: "Monty On The Run song 2",
    warnings: [],
  },
  {
    song: commando0,
    name: "Commando song 0",
    warnings: ["monty"],
  },
  {
    song: commando1,
    name: "Commando song 1",
    warnings: ["monty"],
  },
  {
    song: commando2,
    name: "Commando song 2",
    warnings: ["monty"],
  },
  {
    song: crazyComets0,
    name: "Crazy Comets song 0",
    warnings: ["monty"],
  },
  {
    song: masterOfMagic0,
    name: "Master Of Magic song 0",
    warnings: ["monty"],
  },
  {
    song: gremlins0,
    name: "Gremlins song 0",
    warnings: ["monty"],
  },
  {
    song: warhawk0,
    name: "Warhawk song 0",
    warnings: ["monty", "wait15s"],
  },
  {
    song: oneMan0,
    name: "One Man and his Droid song 0",
    warnings: ["monty"],
  },
  {
    song: gerry1,
    name: "Gerry The Germ song 1",
    warnings: ["monty"],
  },
  {
    song: zoids0,
    name: "Zoids song 0",
    warnings: ["monty"],
  },
];

export const Page = () => {
  const [ songIndex, setSongIndex ] = useState(0);
  const { stop } = useRobbPlayerContext();

  return (
    <>
      <h1>JavaScript Robb Song Player</h1>
      <p>
        A JavaScript/
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
          target="_blank"
          rel="noopener noreferrer"
        >
          WebAudio
        </a>
        -native implementation of Rob Hubbard’s famous Commodore 64 chipmusic
        <br />
        <a
          href="https://github.com/luxocrates/js-robb-player"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/luxocrates/js-robb-player
        </a>
      </p>
      <p>
        😔 Apologies — the player doesn’t currently work on iOS Safari
      </p>

      <h3>{songs[songIndex].name}</h3>

      <div>
        <button
          disabled={songIndex === 0}
          onClick={
            () => {
              setSongIndex(i => Math.max(i - 1, 0))
              stop();
            }
          }
          >
          ◀
        </button>
        <button
          disabled={songIndex === songs.length - 1}
          onClick={
            () => {
              setSongIndex(i => Math.min(i + 1, songs.length - 1))
              stop();
            }
          }
          >
          ▶
        </button>
      </div>

      <SongButtons
        key={
          // Force a re-paint
          songIndex
        }
        song={songs[songIndex].song}
        warnings={songs[songIndex].warnings}
      />
    </>
  );
};
