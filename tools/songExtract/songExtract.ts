#!/usr/bin/env npx tsx

/**
 * Usage: `songExtract (.sid filename) [(0-indexed song number)]`
 * 
 * This is a commandline tool for pulling semantic song data out of '.sid' PSID
 * files. It works by pattern-matching sequences of opcodes from a known
 * song player to sections of memory of the input file, then extracting the file
 * data based on where the addresses in the opcodes' operands were pointing to.
 * 
 * So far, it's been seen to work with the following HVSC files (though the
 * compatibility of the player with the extracted data is another question):
 * 
 *  - Bump_Set_Spike.sid
 *  - Commando.sid
 *  - Crazy_Comets.sid
 *  - Delta_Mix-E-Load_loader.sid (but not really)
 *  - Dragons_Lair_Part_II.sid
 *  - Flash_Gordon.sid
 *  - Gerry_the_Germ.sid
 *  - Geoff_Capes_Strongman_Challenge.sid
 *  - Gremlins.sid
 *  - Kings_of_the_Beach_ingame.sid
 *  - Las_Vegas_Video_Poker.sid
 *  - Master_of_Magic.sid
 *  - Monty_on_the_Run.sid
 *  - One_Man_and_his_Droid.sid
 *  - Proteus.sid
 *  - Spellbound.sid
 *  - Zoids.sid
 */

import { readFileSync, writeFileSync } from "fs";
import path from "node:path";

import { ingest_sid } from "./psidIngest";
import { extractSong } from "./extract";
import { prettyPrintModule } from "./prettyPrintModule";

const OUT_DIR = "out";

/**
 * Munge through commandline arguments
 */

if (process.argv.length !== 3 && process.argv.length !== 4) {
  console.error("Usage: `songExtract (.sid filename) [(0-indexed song number)]");
  process.exit(1);
}

const filename = process.argv[2];
const song = Number(process.argv[3]) || 0;

if (song === undefined) {
  console.warn("No song number specified. Assuming 0.");
}

const outFilename = path.join(
  OUT_DIR,
  `${path.basename(filename, path.extname(filename))}${song}.ts`
);

/**
 * Open the file, parse it as a PSID
 */

const file = Array.from(readFileSync(filename));

const { loadAddress, dataOffset } = ingest_sid(file);

console.log("loadAddress:", loadAddress);
console.log("dataOffset:", dataOffset);

const extractedSong = extractSong(
  file.slice(dataOffset),
  loadAddress,
  song
);

/**
 * Emit the extracted data as a .ts file
 */

writeFileSync(outFilename, prettyPrintModule(extractedSong));
console.log("Success! Wrote to", outFilename);
