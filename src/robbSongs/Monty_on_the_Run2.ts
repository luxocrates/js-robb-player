import { type RobbSong } from "../robbPlayer";

const song: RobbSong = {
  tracks: [
    [ // track 0
      0x46, 0x47, 0x48, 0x46, 0x47, 0x48, 0x49, 0x49,
      0x49, 0x49, 0x49, 0x49, 0x49, 0x49, 0x4b, 0x4b,
      0x4b, 0x4b, 0x4b, 0x4b, 0x4c, 0x4a, 0x4a, 0x4a,
      0x4a, 0x4a, 0x4a, 0x4a, 0x4a, 0x4a, 0x4a, 0x4a,
      0x4a, 0x4a, 0x4a, 0x4a, 0x4a, 0x4b, 0x4b, 0x4b,
      0x4b, 0x4b, 0x4b, 0x4c, 0xff,
    ],
    [ // track 1
      0x41, 0xff,
    ],
    [ // track 2
      0x42, 0x42, 0x43, 0x43, 0x44, 0x44, 0x45, 0x45,
      0xff,
    ],
  ],
  patterns: [
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { // pattern $41 (65)
      offset: 4812,
      bytes: [
        0x87, 0x11, 0x3f, 0x07, 0x44, 0x07, 0x46, 0x07,
        0x44, 0x07, 0x4b, 0x07, 0x44, 0x07, 0x46, 0x07,
        0x44, 0xff,
      ],
    },
    { // pattern $42 (66)
      offset: 4830,
      bytes: [
        0x8f, 0x02, 0x20, 0x87, 0x03, 0x2f, 0x87, 0x02,
        0x20, 0x07, 0x20, 0x07, 0x20, 0x87, 0x03, 0x2f,
        0x87, 0x02, 0x1b, 0xff,
      ],
    },
    { // pattern $43 (67)
      offset: 4850,
      bytes: [
        0x8f, 0x02, 0x1d, 0x87, 0x03, 0x2f, 0x87, 0x02,
        0x1d, 0x07, 0x1d, 0x07, 0x1d, 0x87, 0x03, 0x2f,
        0x87, 0x02, 0x18, 0xff,
      ],
    },
    { // pattern $44 (68)
      offset: 4870,
      bytes: [
        0x8f, 0x02, 0x19, 0x87, 0x03, 0x2f, 0x87, 0x02,
        0x19, 0x07, 0x19, 0x07, 0x19, 0x87, 0x03, 0x2f,
        0x87, 0x02, 0x20, 0xff,
      ],
    },
    { // pattern $45 (69)
      offset: 4890,
      bytes: [
        0x8f, 0x02, 0x1b, 0x87, 0x03, 0x2f, 0x87, 0x02,
        0x1b, 0x07, 0x1b, 0x07, 0x1b, 0x87, 0x03, 0x2f,
        0x87, 0x02, 0x22, 0xff,
      ],
    },
    { // pattern $46 (70)
      offset: 4910,
      bytes: [
        0xbf, 0x09, 0x3c, 0x3f, 0x3c, 0x0f, 0x3c, 0x03,
        0x3d, 0x03, 0x3c, 0x03, 0x3d, 0x03, 0x3c, 0x07,
        0x3d, 0x07, 0x3f, 0x07, 0x3d, 0x07, 0x3c, 0x07,
        0x3d, 0x0f, 0x3c, 0x37, 0x38, 0x1f, 0x38, 0xff,
      ],
    },
    { // pattern $47 (71)
      offset: 4917,
      bytes: [
        0x03, 0x3d, 0x03, 0x3c, 0x03, 0x3d, 0x03, 0x3c,
        0x07, 0x3d, 0x07, 0x3f, 0x07, 0x3d, 0x07, 0x3c,
        0x07, 0x3d, 0x0f, 0x3c, 0x37, 0x38, 0x1f, 0x38,
        0xff,
      ],
    },
    { // pattern $48 (72)
      offset: 4942,
      bytes: [
        0x07, 0x35, 0x17, 0x3d, 0x0f, 0x3c, 0x07, 0x3c,
        0x0f, 0x3a, 0x27, 0x3a, 0x3f, 0x3a, 0x3f, 0x3a,
        0x1f, 0x3a, 0xff,
      ],
    },
    { // pattern $49 (73)
      offset: 4961,
      bytes: [
        0x47, 0x8f, 0x12, 0x3c, 0x17, 0x3f, 0x07, 0x3d,
        0x07, 0x3c, 0x47, 0x0f, 0x3c, 0x17, 0x3c, 0x07,
        0x3a, 0x07, 0x38, 0xff,
      ],
    },
    { // pattern $4a (74)
      offset: 4981,
      bytes: [
        0x87, 0x13, 0x44, 0x07, 0x48, 0x07, 0x49, 0x07,
        0x48, 0x07, 0x44, 0x07, 0x49, 0x07, 0x48, 0x07,
        0x49, 0xff,
      ],
    },
    { // pattern $4b (75)
      offset: 4999,
      bytes: [
        0xa3, 0x09, 0x44, 0xa3, 0xe8, 0x44, 0x22, 0x46,
        0xa4, 0xd9, 0x46, 0x1f, 0x44, 0x0f, 0x3f, 0xff,
      ],
    },
    { // pattern $4c (76)
      offset: 5015,
      bytes: [
        0x23, 0x4b, 0xa3, 0xfe, 0x4b, 0x23, 0x4d, 0xa3,
        0xf1, 0x4d, 0x1f, 0x4b, 0x0f, 0x49, 0x23, 0x46,
        0xa3, 0xfe, 0x46, 0x23, 0x48, 0xa3, 0xeb, 0x48,
        0x1f, 0x46, 0x0f, 0x46, 0xff,
      ],
    },
  ],
  instruments: [
    undefined,
    undefined,
    { // instrument $02 (2)
      pulseWidthLo:   0xa0,
      pulseWidthHi:   0x02,
      controlReg:     0x41,
      attackDecay:    0x09,
      sustainRelease: 0x80,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $03 (3)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x02,
      controlReg:     0x81,
      attackDecay:    0x09,
      sustainRelease: 0x09,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x05,
    },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { // instrument $09 (9)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x4a,
      sustainRelease: 0x69,
      vibratoDepth:   0x02,
      pulseSpeed:     0x81,
      fx:             0x00,
    },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { // instrument $11 (17)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x00,
      controlReg:     0x11,
      attackDecay:    0x0a,
      sustainRelease: 0xfa,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x05,
    },
    { // instrument $12 (18)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x37,
      sustainRelease: 0x40,
      vibratoDepth:   0x02,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $13 (19)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x11,
      attackDecay:    0x07,
      sustainRelease: 0x70,
      vibratoDepth:   0x02,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
  ],
  timescale: 1,
  freqs: [
    0x0116, 0x0127, 0x0138, 0x014b,
    0x015f, 0x0173, 0x018a, 0x01a1,
    0x01ba, 0x01d4, 0x01f0, 0x020e,
    0x022d, 0x024e, 0x0271, 0x0296,
    0x02bd, 0x02e7, 0x0313, 0x0342,
    0x0374, 0x03a9, 0x03e0, 0x041b,
    0x045a, 0x049b, 0x04e2, 0x052c,
    0x057b, 0x05ce, 0x0627, 0x0685,
    0x06e8, 0x0751, 0x07c1, 0x0837,
    0x08b4, 0x0937, 0x09c4, 0x0a57,
    0x0af5, 0x0b9c, 0x0c4e, 0x0d09,
    0x0dd0, 0x0ea3, 0x0f82, 0x106e,
    0x1168, 0x126e, 0x1388, 0x14af,
    0x15eb, 0x1739, 0x189c, 0x1a13,
    0x1ba1, 0x1d46, 0x1f04, 0x20dc,
    0x22d0, 0x24dc, 0x2710, 0x295e,
    0x2bd6, 0x2e72, 0x3138, 0x3426,
    0x3742, 0x3a8c, 0x3e08, 0x41b8,
    0x45a0, 0x49b8, 0x4e20, 0x52bc,
    0x57ac, 0x5ce4, 0x6270, 0x684c,
    0x6e84, 0x7518, 0x7c10, 0x8370,
    0x8b40, 0x9370, 0x9c40, 0xa578,
    0xaf58, 0xb9c8, 0xc4e0, 0xd098,
    0xdd08, 0xea30, 0xf820, 0xfd2e,
    0x0700, 0x000e, 0x0204, 0x2204,
    0x220a, 0x1301, 0x2501, 0x2517,
    0x4141, 0x4641, 0x4326, 0x0210,
    0xff10, 0x0825, 0x4100, 0x00ff,
    0x0076, 0x3e08, 0x0002, 0x1d01,
    0x0001, 0x0000, 0x8001, 0x3e00,
    0x3409, 0xc408, 0x0026, 0x0000,
    0x8000, 0x00fa, 0xffff, 0x0030,
  ],
  fx: [
    {"type":"drums","mask":1},
    {"type":"skydive","mask":2},
    {"type":"arpeggio","mask":4},
  ],
};

export default song;
