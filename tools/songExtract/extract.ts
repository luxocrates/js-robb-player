import {
  type RobbInstrument,
  type RobbSong,
  type RobbPattern,
  type RobbTrack,
  type RobbFx,
} from "../../src/robbPlayer";

import { patternWalk } from "../../src/patternWalk";

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
  if (candidates.length < 1) {
    return null;
  }
  if (candidates.length > 1) {
    console.warn(
      "*** Multiple matching candidates:",
      candidates.map((x) => `0x${(x + org).toString(16)}`)
    );
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

function findSongOffset1(): number | null {
  // To get songs, Monty on the Run's disassembly. has this:
  // (Note: I think Anthony had currtrkhi and currtrklo names swapped)

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

  // ...for which the dump has this:

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
    return null;
  }

  const addr = (hi << 8) | lo;
  return addr - org + (songPick * 6);
}

function findSongOffset2(): number | null {
  // This was an alternative way of pointing to the songs, seen often in
  // single-song players like Thing On A Spring, but we take songPick into
  // consideration too. For many modules (Action Biker, Samantha Fox Strip
  // Poker), it works.
  
  let loPointers_hi = 0;
  let loPointers_lo = 0;
  let hiPointers_hi = 0;  // Not used now, but maybe later...
  let hiPointers_lo = 0;  // Not used now, but maybe later...

  if (hunt(
    buffer,
    [
      0xbd,                           // lda loPointers,x
      (x) => { loPointers_lo = x; },
      (x) => { loPointers_hi = x; }, 
      0x85, null,                     // sta $xx (varies)
      0xbd,                           // lda currtrklo,x
      (x) => { hiPointers_lo = x; },
      (x) => { hiPointers_hi = x; }, 
      0x85, null,                     // sta $xx (varies)
    ]
  ) === null) {
    return null;
  }

  return (songPick * 6) + ((loPointers_hi << 8) | loPointers_lo) - org;
}

function findTracks(): RobbTrack[] {
  const songsOffset = findSongOffset1() || findSongOffset2();
  if (!songsOffset) {
    throw new Error("Can't find song tracks");
  }

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

function findTimescale() {
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
    console.error("Can't find timescale, using default");
  }

  // Default timescale
  if (hi === 0 && lo === 0) return 2;

  const addr = (hi << 8) | lo;
  const timescale = buffer[addr - org];

  return timescale;  
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

function findEffects(): RobbFx[] {
  // Remember, order matters!
  const acc: RobbFx[] = [];

  // We'll just assume for the time being that bit 0 is always drums.
  // Later we can make a detector for it.
  acc.push({
    type: "drums",
    mask: 0x01,
  });

  // Iterate through all the effect-finder functions. If any match,
  // slot it in according to which bit it targets.
  for (const fn of (
    [
      findSkydive,
      findZipUp,
    ] as ((() => (RobbFx | null))[])  
  )) {
    const fx = fn();
    if (fx !== null) acc.push(fx);
  }

  // Also assume that bit 2 is always arpeggios. Monty had the arpeggios
  // performed after the skydive, so we'll place it here...
  acc.push({
    type: "arpeggio",
    mask: 0x04,
  });

  return acc;
}

/** Looks for Thing On A Spring's zip up */
function findZipUp(): RobbFx | null {
  let mask = 0;
  const offset = hunt(
    buffer,
    [
      // Disassembly                Thing On A Spring
      //
      0xad, null, null,           // LDA $c49b       Read instrument FX bit
      0x29, (x) => { mask = x; }, // AND #$02        Is bit 1 set?
      0xf0, null,                 // BEQ $c2df       If not, move on to next effect
      0xbd, null, null,           // LDA $c498,X     Read saved frequency high byte
      0xf0, null,                 // BEQ $c2df       If it's already looped, move on
      0xfe, null, null,           // INC $c498,X     Increment it
      0xac, null, null,           // LDY $c46c       Get offset for voice number
      0x99, null, null,           // STA $d401,Y     Commit the high byte
      ]
  );

  if (offset === null) return null;
  console.log("Found Thing On A Spring zip-up, mask", mask);

  return { type: "zipup", mask };
}

/** Looks for Monty On The Run's 0x02 skydive */
function findSkydive(): RobbFx | null {
  let mask = 0;
  let ticksBetween = 0;

  const offset = hunt(
    buffer,
    [
      // Disassembly                         Anthony's notes
      //
      0xad, null, null,                   // lda instrfx      ;check if skydive
      0x29, (x) => { mask = x; },         // and (bitmask)
      0xf0, null,                         // beq octarp
      0xad, null, null,                   // lda counter      ;every 2nd vbl
      0x29, (x) => { ticksBetween = x; }, // and (ticks between)
      0xf0, null,                         // beq octarp
      0xbd, null, null,                   // lda savefreqhi,x ;check if skydive
      0xf0, null,                         // beq octrp        ;already complete
      0xde, null, null,                   // dec savefreqhi,x ;decr and save the
      0xac, null, null,                   // ldy tmpregofst   ;high byte freq
      0x99, 0x01, 0xd4,                   // sta $d401,y
    ]
  );

  if (offset === null) return null;
  console.log("Found Monty On The Run skydive, mask", mask);

  // It's actually a mask
  if (ticksBetween !== 1) {
    throw new Error("Bad assumption about ticksBetween");
  }

  return { type: "skydive", mask };
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
  const fx = findEffects();

  // Audit the fxSeen against the instruments
  {
    let suppliedMask = 0;
    let demandedMask = 0;

    for (const instrument of instruments) {
      if (!instrument) continue;
      demandedMask |= instrument.fx;
    }

    for (const { mask } of fx) {
      suppliedMask |= mask;
    }

    if (suppliedMask !== demandedMask) {
      console.warn("Not all of the effects were identified.");
      console.warn(`Supplied: $${suppliedMask.toString(16).padStart(2, "0")}`);
      console.warn(`Demanded: $${demandedMask.toString(16).padStart(2, "0")}`);
    }
  }

  return {
    tracks,
    patterns,
    instruments,
    timescale: findTimescale(),
    freqs: findFreqs(),
    fx,
  };
}
