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

import { SongButtons } from "./SongButtons";

const songs = [
  { song: monty0, name: "Monty On The Run song 0", warn: false },
  { song: monty1, name: "Monty On The Run song 1", warn: false },
  { song: monty2, name: "Monty On The Run song 2", warn: false },
  { song: commando0, name: "Commando song 0", warn: true },
  { song: commando1, name: "Commando song 1", warn: true },
  { song: commando2, name: "Commando song 2", warn: true },
  { song: crazyComets0, name: "Crazy Comets song 0", warn: true },
  { song: masterOfMagic0, name: "Master Of Magic song 0", warn: true },
  { song: gremlins0, name: "Gremlins song 0", warn: true },
  { song: warhawk0, name: "Warhawk song 0", warn: true },
  { song: oneMan0, name: "One Man and his Droid song 0", warn: true },
];

export const Page = () => {
  const [ songIndex, setSongIndex ] = useState(0);

  return (
    <>
      <h1>JavaScript Robb Song Player</h1>
      {/* Need a way to shut the SID up first */}
      {/* <button onClick={stop}>Stop</button> */}

      {
        [0, 1, 2].map(
          (voice) => (
            <div key={voice} style={{ fontFamily: "monospace" }}>
              Voice {voice} track pos:
              {" "}
              <span id={`track${voice}pos`}>(not started)</span>
              {" "}
              pat:
              {" "}
              <span id={`track${voice}pat`}>(not started)</span>{" "}
              pos:
              {" "}
              <span id={`track${voice}patpos`}>(not started)</span>
            </div>
          )
        )
      }
  
      <div>
        <button
          disabled={songIndex === 0}
          onClick={
            () => setSongIndex(i => Math.max(i - 1, 0))
          }
          >
          ◀
        </button>
        <button
          disabled={songIndex === songs.length - 1}
          onClick={
            () => setSongIndex(i => Math.min(i + 1, songs.length - 1))
          }
          >
          ▶
        </button>
      </div>

      <h3>{songs[songIndex].name}</h3>

      <SongButtons song={songs[songIndex].song} warn={songs[songIndex].warn} />
    </>
  );
};
