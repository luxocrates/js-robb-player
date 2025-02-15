import { type RobbPattern, type RobbInstrument, type RobbSong } from "./robbPlayer";

/**
 * Given a song, creates an array of new songs that each play just one pattern
 * from the original song
 */
export function makeIsolatedPatternSongs(song: RobbSong) {
  return song.patterns.map(
    (pattern, i) => (
      pattern.length === 0
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

  /**
   * A non-silent instrument to used as instrument `num` if one wasn't defined.
   * This is needed because a pattern might not start with an instrument change,
   * so we need an audible placeholder in the default slot.
   */
  const placeholderInstrument: RobbInstrument = {
    pulseWidthLo:   0x00,
    pulseWidthHi:   0x08,
    controlReg:     0x41,
    attackDecay:    0x08,
    sustainRelease: 0x50,
    vibratoDepth:   0x00,
    pulseSpeed:     0x00,
    fx:             0x00,
  };
  
  /** A pattern that just repeats silence */
  const silentPattern: RobbPattern = [
    // Time/control: Play for $1f, and change instrument ($80)
    0x9f,
    // Instrument number: the index of the `silentInstrument` we'll be adding
    song.instruments.length,
    // Pitch: doesn't matter
    0,
    // End of pattern
    0xff
  ];
  
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
    slowness: song.slowness,
  };
}
