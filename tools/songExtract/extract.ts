import {
  type RobbInstrument,
  type RobbSong,
  type RobbPattern,
  type RobbTrack,
} from "../../src/robbPlayer";

let buffer: number[] = [];
let songPick = 0;
let org = 0;

/**
 * Given a number array (`buffer`) and a pattern array (`pattern`), determines
 * if there's a single offset within `buffer` where the pattern matches. If so,
 * functions within `pattern` are called, to receive the byte values at those
 * locations.
 * 
 * Returns a byte offset of the match; `null` if there are no matches, or an
 * exception if there are multiple matches.
 */
function hunt(
  buffer: number[],
  pattern: (
    | number
    | null
    | ((byte: number) => void)
  )[]
): null | number {
  /** All `buffer` offsets where a match was found */
  const candidates: number[] = [];

  // Pass 1: for every possible offset within `buffer`, try overlay the
  // ground numbers from `pattern`. If none contradict, add it to the
  // list of candidate offsets.
  for (
    let bufOffset = 0;
    bufOffset < buffer.length - pattern.length;
    bufOffset++
  ) {
    let contradictions = false;

    for (let patOffset = 0; patOffset < pattern.length; patOffset++) {
      if (typeof pattern[patOffset] === "number") {
        if (buffer[bufOffset + patOffset] !== pattern[patOffset]) {
          contradictions = true;
          break;
        }
      }
    }
    if (!contradictions) {
      candidates.push(bufOffset);
    }
  }

  // If there's one and only one file offset that matches, we can proceed.
  // Otherwise, drop out.
  if (candidates.length !== 1) {
    return null;
  }

  // Pass 2: iterate through the pattern, and for each slot that held a
  // function, call that function with the value of the byte in `buffer` with
  // the corresponding offset.
  const bufOffset = candidates[0];
  for (let patOffset = 0; patOffset < pattern.length; patOffset++) {
    const patValue = pattern[patOffset];

    if (typeof patValue === "function") {
      patValue(buffer[bufOffset + patOffset]);
    }
  }

  return bufOffset;
}

/**
 * Iterates a pattern bytes array, which contains notes of various byte lengths,
 * calling a callback for each note with whichever byte slots exist.
 */
function patternWalk(
  buffer: number[],
  start: number,
  callback: (
    durationByte: number | undefined,
    instrOrPortamentoByte: number | undefined,
    pitchByte: number | undefined,
    sentinelByte: number | undefined,
  ) => void,
) {
  for (let offset = start;;) {
    let durationByte: number | undefined;
    let instrOrPortamentoByte: number | undefined;
    let pitchByte: number | undefined;
    let sentinelByte: number | undefined;

    // First byte is always note duration, plus flags that dictate overall
    // length
    durationByte = buffer[offset++];
    if (durationByte === undefined) throw new Error();

    // If durationByte had bit 8 set, the next byte is for instrument changes or
    // portamento
    if (durationByte & 0x80) {
      instrOrPortamentoByte = buffer[offset++];
      if (instrOrPortamentoByte === undefined) throw new Error();
    }

    // The next byte is for note pitch, but doesn't exist if the durationByte
    // had bit 6 set (to say the same pitch continues)
    if (!(durationByte & 0x40)) {
      pitchByte = buffer[offset++];
      if (pitchByte === undefined) throw new Error();
    }

    // If the next byte is 0xff, then the pattern is over. But if it's not set,
    // don't consume it. We're just peeking.
    sentinelByte = buffer[offset] & 0xff;
    if (sentinelByte === undefined) throw new Error();

    callback(
      durationByte,
      instrOrPortamentoByte,
      pitchByte,
      sentinelByte === 0xff ? 0xff : undefined
    );

    if (sentinelByte === 0xff) return;
  }
}

function findSongsOffset() {
  // To get songs, dissass. has this:

  /*
  initmusic =*

    lda #$00         ;music num
    ldy #$00
    asl
    sta tempstore
    asl
    clc
    adc tempstore    ;now music num*6
    tax

  - lda songs,x      ;copy ptrs to this
    sta currtrkhi,y  ;music's tracks to
    inx              ;current tracks
    iny
    cpy #$06
    bne -
  */

  // Dump has this:

  /*
  $955a: 0a         ASL
  $955b: 18         CLC
  $955c: 6d dc 84   ADC $84dc
  $955f: aa         TAX
  $9560: bd 6c 85   LDA $856c,X       <- this $856c is what we want
  $9563: 99 66 85   STA $8566,Y
  $9566: e8         INX
  $9567: c8         INY
  $9568: c0 06      CPY #$06
  $956a: d0 f4      BNE $9560
  */

  let lo = 0, hi = 0;
  if (hunt(
    buffer,
    [
      0xaa,
      0xbd,
      (x) => { lo = x; },
      (x) => { hi = x; },
      0x99,
    ]
  ) === null) {
    throw new Error("Can't find songs");
  }

  const addr = (hi << 8) | lo;
  return addr - org + (songPick * 6);
}

function findTracks(): RobbTrack[] {
  const songsOffset = findSongsOffset();
  const ret: RobbTrack[] = [];

  for (let track = 0; track < 3; track++) {
    // Get base offset
    const lo = buffer[songsOffset + 0 + (track * 1)];
    const hi = buffer[songsOffset + 3 + (track * 1)];
    const base = (hi << 8) | lo;

    const pats: number[] = [];
    for (let i = 0; i < 256; i++) {
      const pat = buffer[base + i - org];
      pats.push(pat);
      if ((pat & 0xfe) === 0xfe) break;
    }

    ret.push(pats);
  }

  return ret;
}

function findPatterns(tracks: RobbTrack[]): RobbPattern[] {
  // For patptl (array of low-bytes), we'll use:
  /*
    getnotedata =*

      tay
      lda patptl,y     ;put base addr.w of
      sta $04          ;the pattern in $4
      lda patpth,y
      sta $05
  */
  // which is:
  /*
    $80aa: a8         TAY
    $80ab: b9 7e 85   LDA $857e,Y
    $80ae: 85 04      STA $04
    $80b0: b9 cb 85   LDA $85cb,Y
    $80b3: 85 05      STA $05
    $80b5: a9 00      LDA #$00
  */

  let patptl_lo = 0, patptl_hi = 0;
  let patpth_lo = 0, patpth_hi = 0;

  if (hunt(
    buffer,
    [
      0xa8,
      0xb9,
      (x) => { patptl_lo = x; },
      (x) => { patptl_hi = x; },
      0x85,
      null,
      0xb9,
      (x) => { patpth_lo = x; },
      (x) => { patpth_hi = x; },
      0x85,
  ]) === null) {
    throw new Error("Can't find patterns");
  }

  const patptl_addr = (patptl_hi << 8) | patptl_lo;
  const patpth_addr = (patpth_hi << 8) | patpth_lo;

  const los = patptl_addr - org;
  const his = patpth_addr - org;

  // Walk through all the tracks, and build a set of pattern numbers for every
  // one encountered
  const set = new Set<number>();
  for (let track = 0; track < 3; track++) {
    for (const pat of tracks[track]) {
      if (!((pat & 0xfe) === 0xfe)) {
        set.add(pat);
      }
    }
  }

  // Which was the number of the last pattern to have been referenced?
  const lastPat = Array.from(set).reduce(
    (acc, cur) => Math.max(acc, cur),
    0
  );

  /**
   * Extract a pattern, given its number. Note that where patterns fall through,
   * this will keep going capturing until it hits an end. It won't mark where
   * the fallthrough was, but the offset will let you infer that.
   */
  function extractPattern(pat: number): {
    bytes: number[],
    offset: number,
  } {
    const patBaseLo = buffer[los + pat];
    const patBaseHi = buffer[his + pat];

    const offset = ((patBaseHi << 8) | patBaseLo) - org;
    const bytes: number[] = [];

    patternWalk(
      buffer,
      offset,
      (byte1, byte2, byte3, byte4) => {
        if (byte1 !== undefined) bytes.push(byte1);
        if (byte2 !== undefined) bytes.push(byte2);
        if (byte3 !== undefined) bytes.push(byte3);
        if (byte4 !== undefined) bytes.push(byte4);
      }
    );

    return { bytes, offset };
  }

  // Build an array of patterns by walking through the set, in numeric order,
  // and extracting each individually.
  // Some pattern numbers likely won't have been referenced in the tracks.
  // This can happen, in part, because a module might have had multiple songs.
  // For those, we'll just emit an empty array for the sake of type safety.
  const ret: RobbPattern[] = [];
  for (let pat = 0; pat <= lastPat; pat++) {
    ret.push(
      set.has(pat)
      ? extractPattern(pat)
      : { bytes: [], offset: 0 }
    );
  }

  return ret;
}

function findInstruments(patterns: RobbPattern[]): (RobbInstrument | undefined)[] {
  // For instr we'll use:
  /*
    sta $d404,y

    lda instr+0,x    ;get pulse width lo
    sta $d402,y

    lda instr+1,x    ;get pulse width hi
    sta $d403,y
  */
  // which is:
  /*
    $8139: 99 04 d4   STA $d404,Y
    $813c: bd b4 93   LDA $93b4,X       <- this $93b4 is what we want
    $813f: 99 02 d4   STA $d402,Y
    $8142: bd b5 93   LDA $93b5,X
    $8145: 99 03 d4   STA $d403,Y
  */

  let lo = 0, hi = 0;

  if (hunt(
    buffer,
    [
      0x99,
      0x04,
      0xd4,
      0xbd,
      (x) => { lo = x; },
      (x) => { hi = x; },
  ]) === null) {
    throw new Error("Can't find instruments");
  }
  
  const addr = (hi << 8) | lo;

  // Find all referenced instrument numbers
  const instrsSeen = new Set<number>();
  for (const { bytes } of patterns) {
    // Not all pattern slots are filled
    if (bytes.length === 0) continue;

    patternWalk(
      bytes,
      0,
      (_, instrOrPortamentoByte) => {
        if (instrOrPortamentoByte === undefined) return;

        // Negative values are portamento
        if (instrOrPortamentoByte & 0x80) return;

        // Positive values are instrument numbers
        instrsSeen.add(instrOrPortamentoByte);
      }
    );
  }

  const baseOffset = addr - org;

  // Which was the number of the last instrument to have been referenced?
  const lastInst = Array.from(instrsSeen).reduce(
    (acc, cur) => Math.max(acc, cur),
    0
  );

  // Fill instrument slots up to that last number with instrument data, if that
  // instrument number was even referenced.
  const ret: (RobbInstrument | undefined)[] = [];
  for (let i = 0; i <= lastInst; i++) {
    ret.push(
      instrsSeen.has(i)
      ? {
        pulseWidthLo:   buffer[baseOffset + (i * 8) + 0],
        pulseWidthHi:   buffer[baseOffset + (i * 8) + 1],
        controlReg:     buffer[baseOffset + (i * 8) + 2],
        attackDecay:    buffer[baseOffset + (i * 8) + 3],
        sustainRelease: buffer[baseOffset + (i * 8) + 4],
        vibratoDepth:   buffer[baseOffset + (i * 8) + 5],
        pulseSpeed:     buffer[baseOffset + (i * 8) + 6],
        fx:             buffer[baseOffset + (i * 8) + 7],  
      }
      : undefined
    )
  }

  return ret;
}

function findSlowness() {
  // For resetspd we'll use:
  /*
    contplay =*

    ldx #3-1         ;number of chanels

    dec speed        ;check the speed
    bpl mainloop

    lda resetspd     ;reset speed if needed
    sta speed

  */
  // which is:
  /*
    $8052: a2 02      LDX #$02
    $8054: ce eb 84   DEC $84eb
    $8057: 10 06      BPL $805f
    $8059: ad ec 84   LDA $84ec       <- this $84ec is what we want
    $805c: 8d eb 84   STA $84eb
  */

  let lo = 0, hi = 0;

  if (hunt(
    buffer,
    [
      0xa2,
      0x02,
      0xce,
      null,
      null,
      0x10,
      0x06,
      0xad,
      (x) => { lo = x; },
      (x) => { hi = x; },
      0x8d,
    ]) === null) {
    console.error("Can't find slowness, using default");
  }

  if (hi === 0 && lo === 0) return 1;

  const addr = (hi << 8) | lo;
  const slowness = buffer[addr - org];

  return slowness;  
}

function findFreqs() {
  const offset = hunt(
    buffer,
    [
      0x16,
      0x01,
      0x27,
      0x01,
      0x38,
      0x01,
    ]);
    
  if (offset === null) {
    throw new Error("Can't find frequency table");
  }

  return new Array(128).fill(0).map(
    (_, i) => buffer[offset + (i * 2) + 0] | (buffer[offset + (i * 2) + 1] << 8)
  );
}

/**
 * Looks for structures in a memory dump and converts them to semantic
 * data for the player
 */
export function extractSong(
  inBuffer: number[],
  inOrg: number,
  inSong: number
): RobbSong {
  buffer = inBuffer;
  org = inOrg;
  songPick = inSong || 0;

  const tracks = findTracks();
  const patterns = findPatterns(tracks);
  const instruments = findInstruments(patterns);

  return {
    tracks,
    patterns,
    instruments,
    slowness: findSlowness(),
    freqs: findFreqs(),
  };
}
