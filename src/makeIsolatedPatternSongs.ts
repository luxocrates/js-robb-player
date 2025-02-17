import {
  type RobbPattern,
  type RobbInstrument,
  type RobbSong,
  placeholderInstrument
} from "./robbPlayer";

/**
 * Given a song, creates an array of new songs that each play just one pattern
 * from the original song
 */
export function makeIsolatedPatternSongs(song: RobbSong) {
  return song.patterns.map(
    (pattern, i) => (
      pattern.bytes.length === 0
        ? undefined
        : makeIsolatedPatternSong(song, i)
    )
  );
}

function makeIsolatedPatternSong(song: RobbSong, num: number): RobbSong {
  /**
   * A silent instrument to be played on tracks 1 and 2 while the isolated
   * pattern will be on track 0.
   */
  const silentInstrument: RobbInstrument = {
    pulseWidthLo: 0,
    pulseWidthHi: 0,
    controlReg: 0,
    attackDecay: 0,
    sustainRelease: 0,
    vibratoDepth: 0,
    pulseSpeed: 0,
    fx: 0,
  };
  
  /** A pattern that just repeats silence */
  const silentPattern: RobbPattern = {
    offset: 0,
    bytes: [
    // Time/control: Play for $1f, and change instrument ($80)
    0x9f,
    // Instrument number: the index of the `silentInstrument` we'll be adding
    song.instruments.length,
    // Pitch: doesn't matter
    0,
    // End of pattern
    0xff
  ]};
  
  const silentPatternIndex = song.patterns.length;

  return {
    tracks: [
      [num, silentPatternIndex, 0xfe],
      [silentPatternIndex, 0xff],
      [silentPatternIndex, 0xff],
    ],
    patterns: [
      ...song.patterns,
      // This is now in position silentPatternIndex
      silentPattern,
    ],

    instruments: [
      ...song.instruments.map(
        (x) => x ? {...x} : placeholderInstrument
      ),
      silentInstrument,
    ],
    freqs: [...song.freqs],
    timescale: song.timescale,
    fx: [...song.fx],
  };
}
