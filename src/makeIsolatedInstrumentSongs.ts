import { type RobbPattern, type RobbInstrument, type RobbSong } from "./robbPlayer";

// We have to play the instrument at some pitch. This is the index of the
// frequencies table we'll use.
const PITCH = 0x38;

/**
 * Given a song, creates an array of new songs that each play just one note from
 * each instrument of the original song
 */
export function makeIsolatedInstrumentSongs(song: RobbSong) {
  return song.instruments.map(
    (instrument, i) => (
      instrument
        ? makeIsolatedInstrumentSong(song, i)
        : undefined
    )
  );
}

function makeIsolatedInstrumentSong(song: RobbSong, num: number): RobbSong {
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
  
  const oneNotePatternIndex = song.patterns.length;
  const silentPatternIndex = song.patterns.length + 1;
  const silentInstrumentIndex = song.instruments.length;

  /** A pattern that just repeats silence */
  const silentPattern: RobbPattern = [
    // Time/control: Play for $1f, and change instrument ($80)
    // Instrument number: the index of the `silentInstrument` we'll be adding
    // Pitch: whatever
    0x9f, silentInstrumentIndex, 0,
    // End of pattern
    0xff,
  ];

  const oneNotePattern: RobbPattern = [
    0x9f, num, PITCH,
    0x5f,
    0xff,
  ];
  
  
  return {
    tracks: [
      [oneNotePatternIndex, silentPatternIndex, 0xfe],
      [silentPatternIndex, 0xff],
      [silentPatternIndex, 0xff],
    ],
    patterns: [
      ...song.patterns,
      // These are now in positions oneNotePatternIndex and silentPatternIndex
      oneNotePattern,
      silentPattern,
    ],
    instruments: [
      ...song.instruments,
      // This is now in position silentInstrumentIndex
      silentInstrument,
    ],
    freqs: [...song.freqs],
    slowness: 2,
  };
}

