import { type RobbInstrument, type RobbSong } from "../../src/robbPlayer";

const $xx = (n: number) => "$" + n.toString(16).padStart(2, "0");

function dump8(cl: (_:string) => void, arr: number[]) {
  let acc: string[] = [];

  function emit() {
    if (acc.length === 0) return;
    cl(`      ${acc.join(", ")},`);
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

export function prettyPrintModule(module: RobbSong) {
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
  for (let i = 0; i < module.tracks.length; i++) {
    const track = module.tracks[i];
    cl(`    [ // track ${i}`);
    dump8(cl, track);
    cl("    ],");
  }

  cl("  ],");

  // Patterns
  cl("  patterns: [");
  for (let i = 0; i < module.patterns.length; i++) {
    const pattern = module.patterns[i];

    if (pattern.length > 0) {
      cl(`    [ // pattern ${$xx(i)} (${i})`);
      dump8(cl, pattern);
      cl("    ],");
    }
    else {
      cl("    [],  // (not referenced)");
    }
  }

  cl("  ],");

  // Instruments
  cl("  instruments: [");
  for (let i = 0; i < module.instruments.length; i++) {
    const instrument = module.instruments[i];

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
  cl(`  slowness: ${module.slowness},`);

  // Frequencies
  cl("  freqs: [");
  dump16(cl, module.freqs);
  cl("  ],");

  cl("};");
  cl("");
  cl("export default song;");  
  cl("");
  
  return acc.join("\n");
}
