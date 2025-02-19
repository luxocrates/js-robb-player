import { useMemo, useRef, useState, type FC } from "react";
import { useRobbPlayerContext } from "./RobbPlayerProvider";
import { type PlayerListeners, type RobbSong } from "../robbPlayer";
import { patternWalk } from "../patternWalk";

export const Patterns: FC<{
  song: RobbSong;
  isolatedPatternSongs: (RobbSong | undefined)[],
  trackPatNumGetters: (number | null)[],
  makeMakeListeners: () => PlayerListeners,
  patternChains: number[][],
  trackPatPosGetters: (number | null)[],
}> = ({
  song,
  isolatedPatternSongs,
  trackPatNumGetters,
  makeMakeListeners,
  patternChains,
  trackPatPosGetters,
}) => {
  const [ showTrack, setShowTrack ] = useState<null | number>(null);
  const { play } = useRobbPlayerContext();

  /** Maps an offset to the set of bytes for that note */
  type ClumpMap = Map<number, Clump>
  type Clump = [
    number | undefined,
    number | undefined,
    number | undefined,
    number | undefined,
  ];

  const clumpsRef = useRef<ClumpMap | null>(null);

  /** Build the clumps map */
  useMemo(
    () => {
      let clumps = new Map<number, Clump>();

      if (showTrack !== null) {
        const patNum = trackPatNumGetters[showTrack];
        if (patNum !== null) {
          const pattern = song.patterns[patNum];
          if (pattern) {
            const { bytes } = pattern;
            if (bytes.length > 0) {
              let offset = 0;
              patternWalk(bytes, 0, (b1, b2, b3, b4) => {
                // console.log("*** pat", patNum, ":", b1, b2, b3, b4);

                let length = 0;
                if (b1 !== undefined) length++;
                if (b2 !== undefined) length++;
                if (b3 !== undefined) length++;
                if (b4 !== undefined) length++;

                clumps.set(offset, [b1, b2, b3, b4]);
                offset += length;
              });
              clumpsRef.current = clumps;
            }
            else clumpsRef.current = null;
          }
        }
      }
    },
    [
      song,
      showTrack === null ? null : trackPatNumGetters[showTrack],
    ]
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
                        trackPatNumGetters[voice] === index
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

  function makePatternBrowserForTrack(track: number) {
    const clumps = clumpsRef.current;
    if (clumps === null) return null;

    const patNum = trackPatNumGetters[track];
    if (patNum === null) return null;

    const patPos = trackPatPosGetters[track];
    if (patPos === null) return null;
    
    const clump = clumps.get(patPos);
    if (clump === undefined) return null;

    function showByte1(byte: number | undefined) {
      if (byte === undefined) return ""; // TODO

      const ip = byte & 0x80 ? 1 : 0;
      const na = byte & 0x40 ? 1 : 0;
      const nr = byte & 0x20 ? 1 : 0;
      const dur = byte & 0x1f;

      return `${
        ip ? " 1" : "  "
      } ${
        na ? " 1" : "  "
      } ${
        nr ? " 1" : "  "
      }  ${
        dur.toString().padStart(2)
      }`;
    }

    function showByte2(byte: number | undefined) {
      if (byte === undefined) return "          ";

      if (byte & 0x80) {
        // Portamento
        const sign = byte & 1;
        const val = (byte & 0b01111110) >> 1;
        return `port: ${sign ? "-" : "+"}${val.toString().padEnd(3)}`;
      }
      else {
        // Instrument change
        return `inst: ${(byte & 0x7f).toString().padEnd(3)} `;
      }
    }

    function showByte3(byte: number | undefined) {
      if (byte === undefined) return "     ";
      return `${(byte & 0x7f).toString().padEnd(3)}  `;
    }

    function showOffset(offset: number) {
      return `${offset.toString().padStart(4," ")}`;
    }

    function showPat(patNum: number) {
      return patNum.toString().padStart(3);
    }

    const header = `| Pat | Offs | IP NA NR Dur | Inst/Port  | Pitch |`;
    const line = `${header}\n| ${showPat(patNum)} | ${showOffset(patPos)} | ${showByte1(clump[0])} | ${showByte2(clump[1])} | ${showByte3(clump[2])} |`;

    return (
      <>
        { clump !== null && (
          <>
            {/* <div>
              <code>{JSON.stringify(clump)}</code>
            </div> */}
            <div>
              <pre>{line}</pre>
            </div>
          </>
        )
        }
      </>
    );
  }

  const patterns = (showTrack === null)
    ? makeButtonsForAllPatterns()
    : makePatternBrowserForTrack(showTrack);

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
