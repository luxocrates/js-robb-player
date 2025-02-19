/**
 * Iterates the bytes array of a RobbPattern, which contains notes of various
 * byte lengths, calling a callback for each note with whichever byte slots
 * exist.
 */
export function patternWalk(
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
