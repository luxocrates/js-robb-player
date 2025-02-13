import { makeParser } from "./parser";

// Format references:
// - https://gist.github.com/cbmeeks/2b107f0a8d36fc461ebb056e94b2f4d6
// - http://unusedino.de/ec64/technical/formats/sidplay.html
//
// (Beware: neither signal very well whether the numbers they quote are
// decimal or hex.)

const parseHeader = makeParser((_) => ({
  magicID:     _.string(4),
  version:     _.word_be(),
  dataOffset:  _.word_be(),
  loadAddress: _.word_be(),
  initAddress: _.word_be(),
  playAddress: _.word_be(),
  songs:       _.word_be(),
  startSong:   _.word_be(),
  speed:       _.long_be(),
  name:        _.string(32),
  author:      _.string(32),
  released:    _.string(32),
}));

export function ingest_sid(bytes: number[]) {
  let header;
  
  try {
    header = parseHeader(bytes);
  }
  catch (e) {
    console.error("Unexpected early end of file");
  }

  if (header.magicID !== "PSID") {
    throw new Error("Only PSID .sid files can be played.");
  }

  let { loadAddress, dataOffset } = header;

  if (loadAddress === 0) {
    // means the load address is at the start of the data section, like a
    // .prg file
    loadAddress = (
      bytes[dataOffset++] | 
      bytes[dataOffset++] << 8
    );
  }

  return { loadAddress, dataOffset };
}
