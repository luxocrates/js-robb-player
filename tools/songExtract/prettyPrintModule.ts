import { type RobbInstrument, type RobbSong } from "../../src/robbPlayer";

const $xx = (n: number) => "$" + n.toString(16).padStart(2, "0");

function dump8(cl: (_:string) => void, arr: number[], space: number) {
  let acc: string[] = [];

  let spaces = "";
  while (space--) spaces += " ";

  function emit() {
    if (acc.length === 0) return;
    cl(`${spaces}${acc.join(", ")},`);
    acc = [];
  }

  for (let i = 0; i < arr.length; i++) {
    if (i % 8 === 0) emit();
    acc.push("0x" + arr[i].toString(16).padStart(2, "0"));
  }
  emit();
}

function dump16(cl: (_:string) => void, arr: number[]) {
  let acc: string[] = [];

  function emit() {
    if (acc.length === 0) return;
    cl(`    ${acc.join(", ")},`);
    acc = [];
  }

  for (let i = 0; i < arr.length; i++) {
    if (i % 4 === 0) emit();
    acc.push("0x" + arr[i].toString(16).padStart(4, "0"));
  }
  emit();
}

function dumpInstr(cl: (_:string) => void, i: RobbInstrument) {
  for (const key of [
    "pulseWidthLo",
    "pulseWidthHi",
    "controlReg",
    "attackDecay",
    "sustainRelease",
    "vibratoDepth",
    "pulseSpeed",
    "fx",
  ]) {
    cl(`      ${(key + ":").padEnd(16, " ")}0x${(i[key]).toString(16).padStart(2, "0")},`);
  }
}

export function prettyPrintSong(song: RobbSong) {
  const acc: string[] = [];
  const cl = (a: string, b?: any) => {
    if (b !== undefined) throw new Error();
    acc.push(a);
  };

  cl(`import { type RobbSong } from "../robbPlayer";`);
  cl(``);
  cl(`const song: RobbSong = {`);

  // Tracks
  cl("  tracks: [");
  for (let i = 0; i < song.tracks.length; i++) {
    const track = song.tracks[i];
    cl(`    [ // track ${i}`);
    dump8(cl, track, 6);
    cl("    ],");
  }

  cl("  ],");

  // Patterns
  cl("  patterns: [");
  for (let i = 0; i < song.patterns.length; i++) {
    const { bytes, offset } = song.patterns[i];

    if (bytes.length > 0) {
      cl(`    { // pattern ${$xx(i)} (${i})`);
      cl(`      offset: ${offset},`);
      cl(`      bytes: [`);
      dump8(cl, bytes, 8);
      cl("      ],");
      cl("    },");
    }
    else {
      cl("    { offset: 0, bytes: [] },  // (not referenced)");
    }
  }

  cl("  ],");

  // Instruments
  cl("  instruments: [");
  for (let i = 0; i < song.instruments.length; i++) {
    const instrument = song.instruments[i];

    if (instrument) {
      cl(`    { // instrument ${$xx(i)} (${i})`);
      dumpInstr(cl, instrument);
      cl("    },");
    } else {
      cl("    undefined,");
    }
  }
  cl("  ],");

  // Slowness
  cl(`  slowness: ${song.slowness},`);

  // Frequencies
  cl("  freqs: [");
  dump16(cl, song.freqs);
  cl("  ],");

  cl("};");
  cl("");
  cl("export default song;");
  cl("");
  
  return acc.join("\n");
}
