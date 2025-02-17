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
 * (*1): can't extract slowness
 * (*2): has silent instruments
 * (*3): thinks it extracts, but actually gets wrong data
 * (*4): extracted song unlike any known songs
 * 
 * MUSICIANS/H/Hubbard_Rob/
 *  - Action_Biker.sid (*1)
 *  - Battle_of_Britain.sid
 *  - Bump_Set_Spike.sid
 *  - Chain_Reaction.sid (see Zoolook)
 *  - Commando.sid
 *  - Confuzion.sid
 *  - Crazy_Comets.sid
 *  - Delta_Mix-E-Load_loader.sid (*1)(*3)
 *  - Dragons_Lair_Part_II.sid (*1)(*4)
 *  - Flash_Gordon.sid (*1)
 *  - Food_Feud.sid (*1)(*2)
 *  - Formula_1_Simulator.sid
 *  - Game_Killer.sid
 *  - Gerry_the_Germ.sid
 *  - Geoff_Capes_Strongman_Challenge.sid
 *  - Gremlins.sid
 *  - Hunter_Patrol.sid
 *  - International_Karate.sid (*3)
 *  - Kentilla.sid
 *  - Kings_of_the_Beach_ingame.sid (*1)
 *  - Las_Vegas_Video_Poker.sid
 *  - Lightforce.sid (*1)(*2)
 *  - Master_of_Magic.sid
 *  - Monty_on_the_Run.sid
 *  - Ninja.sid (*1)
 *  - One_Man_and_his_Droid.sid
 *  - Proteus.sid
 *  - Rasputin.sid
 *  - Samantha_Fox_Strip_Poker.sid (*1)
 *  - Sigma_Seven.sid
 *  - Spellbound.sid
 *  - Thanatos.sid (*1)(*2)
 *  - Thing_on_a_Spring.sid
 *  - Thrust.sid
 *  - W_A_R.sid (*1)(*2)
 *  - W_A_R_Preview.sid (*1)(*2)
 *  - Zoids.sid
 *  - Zoolook.sid (*1)(*2)
 * 
 *  MUSICIANS/L/Laxity/
 *   - Min_Axel_F.sid
 *   - Wizax_tune.sid
 * 
 *  MUSICIANS/R/Red_Kimmel_Jeroen/
 *   - Rhaa_Lovely.sid
 *   - Touch_Me.sid
 *   - Dont_Go.sid
 * 
 *  MUSICIANS/D/Deenen_Charles/
 *   - Give_It_a_Try.sid
 */

import { readFileSync, writeFileSync } from "fs";
import path from "node:path";

import { ingest_sid } from "./psidIngest";
import { extractSong } from "./extract";
import { prettyPrintSong } from "./prettyPrintModule";

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

const extractedModule = extractSong(
  file.slice(dataOffset),
  loadAddress,
  song
);

/**
 * Emit the extracted data as a .ts file
 */

writeFileSync(outFilename, prettyPrintSong(extractedModule));
console.log("Success! Wrote to", outFilename);
