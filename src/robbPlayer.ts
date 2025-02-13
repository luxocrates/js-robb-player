/**
 * This is a TypeScript implementation of Rob Hubbard's Commodore 64 music
 * player -- specifically, the one used in Monty On The Run, as shown in
 * commented disassembly at:
 * 
 * https://codebase64.org/doku.php?id=magazines:chacking5#rob_hubbard_s_musicdisassembled_commented_and_explained
 * 
 * It'll try play many other of Rob's songs too, but the instrument fx bits mean
 * different things in different songs, and you might hear some weird results.
 */

export type RobbSong = {
  tracks: RobbTrack[];
  patterns: RobbPattern[];
  instruments: (RobbInstrument | undefined)[];
  slowness: number;
  freqs: number[];
};

/**
 * Tracks[track] would be an array of patterns for that track, where `track`
 * would be SID voice number.
 */
export type RobbTrack = number[];

/** array of bytes in groups of up to 4 */
export type RobbPattern = number[];

export type RobbInstrument = {
  /** Gets mutated by pulsework */
  pulseWidthLo: number    // byte 0

  /** Gets mutated by pulsework */
  pulseWidthHi: number    // byte 1

  controlReg: number      // byte 2
  attackDecay: number     // byte 3
  sustainRelease: number  // byte 4
  vibratoDepth: number    // byte 5

  /** Pulse step (bits 7-5) and ticks per step (bits 4-0) */
  pulseSpeed: number      // byte 6
  fx: number              // byte 7
};

let maybeSong: RobbSong | undefined;

const loByte = (x: number) => (x >> 0) & 0xff;
const hiByte = (x: number) => (x >> 8) & 0xff;

type PlayerState = {
  tick: number;
  isPlaying: boolean,
  ticksUntilTrackwork: number,
  trackStates: TrackState[],
};

type TrackState = {
  // generally, these represent the next thing to be played, not the current
  posWithinPat: number,
  noteRemain: number,
  pat: number,
  posWithinTrack: number,
  instNum: number,
  noRelease: boolean,
  noteNum: number,      // Byte-index into frequencies table
  portaval: number,     // raw code for portamento
  freqSaveLo: number,   // low-byte curr freq for portamento
  freqSaveHi: number,   // high-byte curr freq for portamento
  byte1Save: number,    // copy of first byte from latest pattern tuple
  voicectrl: number,

  pulseDir: number;
  pulseDelay: number;
};

function makeDefaultTrackState (): TrackState {
  return {
    // generally, these represent the next thing to be played, not the current
    posWithinPat: 0,
    noteRemain: 0,
    pat: 0,
    posWithinTrack: 0,
    instNum: 0,
    noRelease: false,
    noteNum: 0,
    portaval: 0,
    freqSaveLo: 0,
    freqSaveHi: 0,
    byte1Save: 0,
    voicectrl: 0,
    pulseDir: 0,
    pulseDelay: 0,
  };
};

function makeDefaultPlayerState(): PlayerState {
  return {
    tick: 0,
    isPlaying: true,
    ticksUntilTrackwork: 0,
    trackStates: [
      makeDefaultTrackState(),
      makeDefaultTrackState(),
      makeDefaultTrackState(),
    ],
  }
}

let playerState: PlayerState = makeDefaultPlayerState();

export function playerInit(song: RobbSong) {
  maybeSong = song;
  playerState = makeDefaultPlayerState();
}

export type PlayerListeners = {
  /** A track is advancing to a new pattern */
  onTrackAdvance?: (
    voice: number,
    trackPos: number,
    pat: number,
  ) => void;

  /** A pattern is advancing to a new note */
  onPatAdvance?: (voice: number, patPos: number) => void;
};

export function playerTick(
  poke: (addr: number, val: number) => void,
  listeners: PlayerListeners
) {
  if (!maybeSong) return;
  let song = maybeSong;

  if (!playerState.isPlaying) return;

  // Make some more semantic accessors for SID register pokes
  const pokeVoice = (offset: number) => (voice: number, val: number) => poke(0xd400 + offset + (voice * 7), val);

  const pokeFreqLo         = pokeVoice(0);
  const pokeFreqHi         = pokeVoice(1);
  const pokePulseLo        = pokeVoice(2);
  const pokePulseHi        = pokeVoice(3);
  const pokeCtrl           = pokeVoice(4);
  const pokeAttackDecay    = pokeVoice(5);
  const pokeSustainRelease = pokeVoice(6);
  const pokeVolFilter      = (val: number) =>  poke(0xd418, val);

  function trackwork() {
    for (let voice = 0; voice < 3; voice++) {

        /** Track state for current track */
        const trackState = playerState.trackStates[voice];
    
        function actionNextInTrack() {

          // Since posWithinTrack was cueing up the _next_ position, tell the
          // listener we've now reached it. Then cue up the next one.
          if (listeners.onTrackAdvance) listeners.onTrackAdvance(
            voice,
            trackState.posWithinTrack,
            trackState.pat
          );

          // console.log(
          //   "*** actionNextInTrack, voice", voice,
          //   "trackState.posWithinTrack =", trackState.posWithinTrack
          // );
    
          trackState.pat = song.tracks[voice][trackState.posWithinTrack];

          // pat $ff = loop
          if (trackState.pat === 0xff) {
            trackState.posWithinTrack = 0;
            // refetch
            trackState.pat = song.tracks[voice][trackState.posWithinTrack];
          }
          // pat $fe = done
          if (trackState.pat === 0xfe) {
            playerState.isPlaying = false;
            return;
          }

          trackState.posWithinPat = 0;
    
          trackState.posWithinTrack++;
        }
    
        function actionNextInPat() {
    
          // Since posWithinPat was cueing up the _next_ position, tell the
          // listener we've now reached it. Then cue up the next one.
          if (listeners.onPatAdvance) listeners.onPatAdvance(
            voice,
            trackState.posWithinPat
          );


          // console.log(
          //   "*** actionNextInPat, voice", voice,
          //   "trackState.pat = 0x", trackState.pat.toString(16),
          //   "trackState.posWithinPat =", trackState.posWithinPat
          // );
                  
          // byte1: length (bits 0-4)
          const byte1 = song.patterns[trackState.pat][trackState.posWithinPat++];
          if (byte1 === undefined) throw(`no byte 1, pat 0x${trackState.pat.toString(16)}`);

          trackState.byte1Save = byte1;
      
          trackState.noteRemain = (byte1 & 0x1f);

          // If bit 5 set, mark note as not needing ADSR release at its end
          trackState.noRelease = Boolean(byte1 & 0x20);

          // Assume no portamento
          trackState.portaval = 0;

          const isAppend = byte1 & 0x40;

          // If this is an 'append' (lengthen the note), don't read more bytes
          if (!isAppend) {

            // byte2 is optional;
            if (byte1 & 0x80) {
              const byte2 = song.patterns[trackState.pat][trackState.posWithinPat++];
              if (byte2 === undefined) throw(`no byte 2, pat 0x${trackState.pat.toString(16)}`);

              if (byte2 & 0x80) {
                // Store the raw value. 'portaval' as the disassembly had it.
                trackState.portaval = byte2;
              }

              else {
                // instrument change
                trackState.instNum = byte2 & 0x7f;
              }
            }
      
            // byte3: pitch
            const byte3 = song.patterns[trackState.pat][trackState.posWithinPat++];
            if (byte3 === undefined) throw(`no byte 3, pat 0x${trackState.pat.toString(16)}`);
      
            trackState.noteNum = byte3;

            const basePitch = (byte3 & 0x7f);
            const freqLo = loByte(song.freqs[basePitch]);
            const freqHi = hiByte(song.freqs[basePitch]);
            
            pokeFreqLo(voice, freqLo);  // voice frequency (low byte)
            pokeFreqHi(voice, freqHi);  // voice frequency (high byte)  
            
            // Save pitch for portamento, if we even have it
            trackState.freqSaveLo = freqLo;
            trackState.freqSaveHi = freqHi;

          }

          {
            // Apply instrument initial values
            const instrument = song.instruments[trackState.instNum]!;

            trackState.voicectrl = instrument.controlReg;
            
            // Poke the control value, but if we're appending, don't re-set
            // the kickoff bit (LSB)
            
            pokeCtrl(
              voice,
              trackState.voicectrl & (isAppend ? 0xfe : 0xff)
            );
 
            pokePulseLo(voice, instrument.pulseWidthLo);
            pokePulseHi(voice, instrument.pulseWidthHi);
            
            pokeAttackDecay(voice, instrument.attackDecay);
            pokeSustainRelease(voice, instrument.sustainRelease);
          }
    
          const byte4 = song.patterns[trackState.pat][trackState.posWithinPat];
          if (byte4 === 0xff) {
            actionNextInTrack();
            return;
          }
        }
    
        if (playerState.tick === 0) {
          // TODO: all this should really be done in init
          pokeVolFilter(0x0f);
          actionNextInTrack();
          actionNextInPat();
        }
  
        trackState.noteRemain--;

        if (trackState.noteRemain < 0) {
          actionNextInPat();
        }
        else {
          soundwork(voice);
        }
      }

  }

  function soundwork(voice: number) {
    const trackState = playerState.trackStates[voice];
    if (trackState.noteRemain === 0) {

      if (!trackState.noRelease) {
        // Start the release
        pokeCtrl(voice, trackState.voicectrl & 0xfe);

        // Kill ADSR
        pokeAttackDecay(voice, 0);
        pokeSustainRelease(voice, 0);
      }
    }

    /**
     * I've tried to follow the disassembly's vibrato implementation, but from
     * what I'm seeing, the base note is the lowest note of the oscillation, not
     * the center point, meaning this is going to end up pretty sharp. And
     * indeed it turns out that way.
     */
    function vibrato() {
      const { vibratoDepth } = song.instruments[trackState.instNum]!;
      if (vibratoDepth === 0) return;
      // Don't apply when length < 8

      const _01233210 = [0, 1, 2, 3, 3, 2, 1, 0][playerState.tick % 8];

      const thisFreq = song.freqs[trackState.noteNum + 0];
      const nextFreq = song.freqs[trackState.noteNum + 1];
      
      let freqDelta = nextFreq - thisFreq;
      for (let i = vibratoDepth; i > -1; i--) {
        freqDelta = Math.floor(freqDelta / 2);
      }

      const finalFreq = thisFreq + (_01233210 * freqDelta);

      if ((trackState.byte1Save & 0x1f) >= 8) {
        pokeFreqLo(voice, loByte(finalFreq));
        pokeFreqHi(voice, hiByte(finalFreq));
      }
    }

    function pulsework() {
      const instrument = song.instruments[trackState.instNum]!;
      const { pulseSpeed } = instrument;
      if (pulseSpeed === 0) return;

      if (--trackState.pulseDelay < 0) {
        trackState.pulseDelay = pulseSpeed & 0x1f;

        const absDelta = pulseSpeed & 0xe0;

        let pulseWidth = (instrument.pulseWidthHi << 8) | instrument.pulseWidthLo;

        if (trackState.pulseDir === 1) {
          // Increase pulseWidth, and flip direction on reaching $0exx
          pulseWidth += absDelta;
          if ((pulseWidth & 0xf00) === 0xe00) {
            trackState.pulseDir = 0;
          }
        }
        else {
          // Decrease pulseWidth, and flip direction on reaching $08xx
          pulseWidth -= absDelta;
          if ((pulseWidth & 0xf00) === 0x800) {
            trackState.pulseDir = 1;
          }
        }

        pokePulseLo(voice, loByte(pulseWidth));
        pokePulseHi(voice, hiByte(pulseWidth));

        // Mutate the original instrument with the current pulse value
        // This is how the original code did it, but I see a problem. If two
        // voices are using the same instrument at once (which Monty does),
        // and one crests the turnaround point, they'll fight each other,
        // leaving the pulse width effectively constant.
        instrument.pulseWidthLo = loByte(pulseWidth);
        instrument.pulseWidthHi = hiByte(pulseWidth);
      }
      
    }

    function fx() {
      const { fx } = song.instruments[trackState.instNum]!;

      // Drums
      if (fx & 0x1) {

        // TODO: I was incredibly tired when I wrote this implementation.
        // It will need some scrutinous auditing.

        /*
          lda savefreqhi,x ;don't bother if freq
          beq skydive      ;can't go any lower

          lda lengthleft,x ;or if the note has
          beq skydive      ;finished
        */
        if ((trackState.freqSaveHi > 0) && (trackState.noteRemain > 0)) {
          
          /*
            lda savelnthcc,x ;check if this is the
            and #$1f         ;first vbl for this
            sec              ;instrument-note
            sbc #$01
            cmp lengthleft,x
            ldy tmpregofst
            bcc firstime

            lda savefreqhi,x ;not the first time
            dec savefreqhi,x ;so dec freqhi for
            sta $d401,y      ;drum sound
          */

          if (trackState.noteRemain) {

            if (
              // first time
              (
                trackState.noteRemain === 
                  ((trackState.byte1Save & 0x1f) - 1)
              )
              // or voicectrl is zero (ignoring kickoff bit)
              || ((trackState.voicectrl & 0xfe) === 0)
              ) {
              // noise
              /*
                lda voicectrl,x  ;if ctrlreg is 0 then
                and #$fe         ;noise is used always
                bne dumpctrl
              */

              pokeCtrl(voice, 0x80);
            }
            else {
              /*
                dec savefreqhi,x ;so dec freqhi for
                sta $d401,y      ;drum sound
              */
            
              trackState.freqSaveHi--;
              pokeFreqHi(voice, trackState.freqSaveHi);
              pokeCtrl(voice, trackState.voicectrl);
            }
          }
        }
      }

      // Skydive -- it seems the other Hubbard tracks use this bit for something
      // else, making this routine have a very weird effect on them.
      if (fx & 2) {          
        if (playerState.tick & 1) {
          // skydives and drums too
          if (trackState.freqSaveHi > 0) {
            trackState.freqSaveHi--;
            pokeFreqHi(voice, trackState.freqSaveHi);
          }
        }
      }

      // Octave arpeggio
      if (fx & 0x4) {

        const semitonesAdd = (playerState.tick & 1) * 12;

        const pitch = trackState.noteNum + semitonesAdd;

        pokeFreqLo(voice, loByte(song.freqs[pitch]));
        pokeFreqHi(voice, hiByte(song.freqs[pitch]));
      }
    }

    function portamento() {
      const { portaval } = trackState;
      if (portaval) {
        const isDown = portaval & 1;
        const portAmount = portaval & 0x7e;
        const curFreqLo = trackState.freqSaveLo;
        const curFreqHi = trackState.freqSaveHi;
        const curFreq = (curFreqHi << 8) | curFreqLo;
        const delta = ((isDown ? -1 : 1) * portAmount);
        const newFreq = (curFreq + delta) & 0xffff;

        trackState.freqSaveLo = loByte(newFreq);
        trackState.freqSaveHi = hiByte(newFreq);

        pokeFreqLo(voice, trackState.freqSaveLo);
        pokeFreqHi(voice, trackState.freqSaveHi);
      }
    }

    vibrato();
    pulsework();
    portamento();
    fx();
  }

  if (--playerState.ticksUntilTrackwork < 0) {
    playerState.ticksUntilTrackwork = song.slowness;
    trackwork();
  }
  else {
    for (let voice = 0; voice < 3; voice++) {
      soundwork(voice);
    }
  }

  playerState.tick++;
}
