import { type RobbSong } from "../robbPlayer";

const song: RobbSong = {
  tracks: [
    [ // track 0
      0x00, 0x01, 0x02, 0x03, 0x04, 0x09, 0x1e, 0x09,
      0x1f, 0x00, 0x0a, 0x20, 0x0a, 0x21, 0x0a, 0x20,
      0x0a, 0x21, 0x0a, 0x20, 0x0a, 0x21, 0x0d, 0x01,
      0x02, 0x03, 0x04, 0x09, 0x1e, 0x09, 0x1f, 0x00,
      0x0a, 0x20, 0x0a, 0x21, 0x0a, 0x20, 0x0a, 0x21,
      0x14, 0x19, 0x19, 0x19, 0x19, 0x15, 0x15, 0x15,
      0x1a, 0x0a, 0x20, 0x0a, 0x21, 0x14, 0x14, 0x0a,
      0x20, 0x0a, 0x21, 0x14, 0x14, 0x19, 0x19, 0x19,
      0x19, 0x19, 0x19, 0x19, 0x19, 0xff,
    ],
    [ // track 1
      0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x13, 0x11, 0x11,
      0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11,
      0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x1b, 0x1b,
      0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1a, 0x1c, 0x1c,
      0x1c, 0x1c, 0x1c, 0x13, 0x0e, 0x0e, 0x0e, 0x0f,
      0x1d, 0x1d, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11,
      0x11, 0x15, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11,
      0x11, 0x1d, 0x1d, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b,
      0x1b, 0x1b, 0x1a, 0x1c, 0x1c, 0x1c, 0x1c, 0x1c,
      0x13, 0x0e, 0x0e, 0x18, 0x17, 0x17, 0x17, 0x17,
      0x17, 0x17, 0x0e, 0x18, 0x18, 0x0e, 0x18, 0x18,
      0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19,
      0xff,
    ],
    [ // track 2
      0x12, 0x05, 0x06, 0x07, 0x08, 0x0b, 0x22, 0x0b,
      0x23, 0x12, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c,
      0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c,
      0x10, 0x05, 0x06, 0x07, 0x08, 0x0b, 0x22, 0x0b,
      0x23, 0x12, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c,
      0x0c, 0x0c, 0x0c, 0x0c, 0x16, 0x16, 0x16, 0x16,
      0x16, 0x16, 0x1d, 0x1d, 0x1d, 0x1d, 0x1d, 0x1d,
      0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c,
      0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c,
      0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19,
      0xff,
    ],
  ],
  patterns: [
    { // pattern $00 (0)
      offset: 1615,
      bytes: [
        0x85, 0x05, 0x58, 0x05, 0x4c, 0x05, 0x58, 0x02,
        0x4c, 0x05, 0x58, 0x02, 0x4c, 0x05, 0x58, 0x05,
        0x4c, 0x05, 0x58, 0x05, 0x58, 0x05, 0x4c, 0x05,
        0x58, 0x02, 0x4c, 0x02, 0x58, 0x4b, 0x8b, 0x0d,
        0x1b, 0x85, 0x05, 0x58, 0x05, 0x4c, 0x05, 0x58,
        0x02, 0x4c, 0x05, 0x58, 0x02, 0x4c, 0x05, 0x58,
        0x05, 0x4c, 0x05, 0x58, 0x05, 0x58, 0x05, 0x4c,
        0x05, 0x58, 0x02, 0x4c, 0x02, 0x58, 0x4b, 0x8b,
        0x0d, 0x17, 0x85, 0x05, 0x58, 0x05, 0x4c, 0x05,
        0x58, 0x02, 0x4c, 0x05, 0x58, 0x02, 0x4c, 0x05,
        0x58, 0x05, 0x4c, 0x05, 0x58, 0x05, 0x58, 0x05,
        0x4c, 0x05, 0x58, 0x02, 0x4c, 0x02, 0x58, 0x82,
        0x00, 0x29, 0x05, 0x29, 0x02, 0x29, 0x02, 0x2a,
        0x05, 0x2a, 0x02, 0x2a, 0x02, 0x2b, 0x05, 0x2b,
        0x02, 0x2b, 0x02, 0x2c, 0x05, 0x2c, 0x02, 0x2c,
        0xff,
      ],
    },
    { // pattern $01 (1)
      offset: 1736,
      bytes: [
        0x02, 0x3c, 0x02, 0x3d, 0x05, 0x40, 0x05, 0x40,
        0x02, 0x3d, 0x02, 0x40, 0x02, 0x42, 0x02, 0x40,
        0x05, 0x3c, 0x02, 0x3b, 0x08, 0x39, 0x02, 0x3c,
        0x02, 0x3d, 0x05, 0x40, 0x02, 0x40, 0x02, 0x40,
        0x02, 0x3d, 0x02, 0x40, 0x02, 0x45, 0x02, 0x45,
        0x05, 0x43, 0x08, 0x40, 0x02, 0x40, 0x02, 0x40,
        0x02, 0x42, 0x05, 0x45, 0x05, 0x45, 0x05, 0x45,
        0x05, 0x42, 0x05, 0x40, 0x05, 0x3c, 0x02, 0x3b,
        0x22, 0x39, 0x37, 0x39, 0x17, 0x39, 0xff,
      ],
    },
    { // pattern $02 (2)
      offset: 1807,
      bytes: [
        0x02, 0x3c, 0x02, 0x3d, 0x05, 0x40, 0x05, 0x40,
        0x02, 0x3d, 0x02, 0x40, 0x02, 0x42, 0x02, 0x40,
        0x05, 0x3c, 0x02, 0x3b, 0x08, 0x39, 0x02, 0x3c,
        0x02, 0x3d, 0x05, 0x40, 0x05, 0x42, 0x02, 0x3d,
        0x02, 0x40, 0x4b, 0x42, 0x02, 0x40, 0x02, 0x42,
        0x02, 0x43, 0x02, 0x44, 0x02, 0x44, 0x02, 0x43,
        0x02, 0x42, 0x05, 0x40, 0x02, 0x3d, 0x05, 0x40,
        0x02, 0x40, 0x02, 0x3f, 0x02, 0x3e, 0x05, 0x3c,
        0x02, 0x3b, 0x22, 0x39, 0x37, 0x39, 0x17, 0x39,
        0xff,
      ],
    },
    { // pattern $03 (3)
      offset: 1880,
      bytes: [
        0x88, 0x07, 0x40, 0x02, 0x40, 0x02, 0x42, 0x02,
        0x40, 0x02, 0x43, 0x0b, 0x44, 0x42, 0x05, 0x42,
        0x05, 0x3d, 0x05, 0x40, 0x05, 0x40, 0x02, 0x41,
        0x02, 0x42, 0x02, 0x3d, 0x17, 0x40, 0x42, 0x08,
        0x40, 0x02, 0x40, 0x02, 0x42, 0x02, 0x40, 0x02,
        0x43, 0x0b, 0x44, 0x42, 0x05, 0x42, 0x05, 0x41,
        0x05, 0x42, 0x05, 0x42, 0x02, 0x42, 0x02, 0x40,
        0x02, 0x3d, 0x0b, 0x39, 0x42, 0x4b, 0xff,
      ],
    },
    { // pattern $04 (4)
      offset: 1943,
      bytes: [
        0x02, 0x39, 0x02, 0x3a, 0x05, 0x3d, 0x05, 0x3d,
        0x02, 0x3a, 0x02, 0x3d, 0x02, 0x44, 0x02, 0x43,
        0x05, 0x42, 0x02, 0x42, 0x02, 0x41, 0x05, 0x40,
        0x05, 0x3f, 0x05, 0x3f, 0x02, 0x3f, 0x02, 0x3e,
        0x02, 0x3f, 0x17, 0x3b, 0x42, 0x02, 0x37, 0x02,
        0x38, 0x05, 0x3b, 0x05, 0x3b, 0x02, 0x38, 0x02,
        0x3b, 0x02, 0x40, 0x02, 0x3f, 0x05, 0x3e, 0x02,
        0x40, 0x02, 0x41, 0x02, 0x42, 0x02, 0x44, 0x05,
        0x45, 0x05, 0x45, 0x02, 0x42, 0x02, 0x40, 0x05,
        0x3d, 0x05, 0x40, 0x8b, 0x0d, 0x40, 0x45, 0xff,
      ],
    },
    { // pattern $05 (5)
      offset: 2746,
      bytes: [
        0x05, 0x21, 0x05, 0x21, 0x02, 0x24, 0x02, 0x25,
        0x02, 0x2a, 0x02, 0x28, 0x05, 0x21, 0x05, 0x21,
        0x02, 0x1e, 0x02, 0x1f, 0x05, 0x20, 0x05, 0x21,
        0x05, 0x21, 0x02, 0x24, 0x02, 0x25, 0x02, 0x2a,
        0x02, 0x28, 0x05, 0x21, 0x05, 0x21, 0x02, 0x2a,
        0x02, 0x29, 0x02, 0x28, 0x02, 0x20, 0x05, 0x21,
        0x05, 0x21, 0x02, 0x24, 0x02, 0x25, 0x02, 0x2a,
        0x02, 0x28, 0x05, 0x21, 0x05, 0x21, 0x02, 0x1e,
        0x02, 0x1f, 0x05, 0x20, 0x05, 0x21, 0x05, 0x2d,
        0x05, 0x1e, 0x05, 0x2a, 0x05, 0x1f, 0x05, 0x2b,
        0x05, 0x20, 0x05, 0x2c, 0xff,
      ],
    },
    { // pattern $06 (6)
      offset: 2831,
      bytes: [
        0x05, 0x21, 0x05, 0x21, 0x02, 0x24, 0x02, 0x25,
        0x02, 0x2a, 0x02, 0x28, 0x05, 0x21, 0x05, 0x21,
        0x02, 0x1e, 0x02, 0x1f, 0x05, 0x20, 0x05, 0x21,
        0x05, 0x21, 0x02, 0x24, 0x02, 0x25, 0x02, 0x2a,
        0x02, 0x28, 0x05, 0x21, 0x05, 0x21, 0x02, 0x2a,
        0x02, 0x29, 0x02, 0x28, 0x02, 0x20, 0x05, 0x1c,
        0x05, 0x1c, 0x02, 0x1f, 0x02, 0x20, 0x02, 0x25,
        0x02, 0x23, 0x05, 0x1c, 0x05, 0x1c, 0x02, 0x19,
        0x02, 0x1a, 0x05, 0x1c, 0x05, 0x21, 0x05, 0x21,
        0x02, 0x24, 0x02, 0x25, 0x02, 0x2a, 0x02, 0x28,
        0x17, 0x21, 0xff,
      ],
    },
    { // pattern $07 (7)
      offset: 2914,
      bytes: [
        0x05, 0x1c, 0x05, 0x1c, 0x02, 0x1f, 0x02, 0x20,
        0x02, 0x25, 0x02, 0x23, 0x05, 0x1c, 0x05, 0x1c,
        0x02, 0x19, 0x02, 0x1a, 0x05, 0x1c, 0x05, 0x21,
        0x05, 0x21, 0x02, 0x24, 0x02, 0x25, 0x02, 0x2a,
        0x02, 0x28, 0x05, 0x21, 0x05, 0x21, 0x02, 0x2a,
        0x02, 0x29, 0x02, 0x28, 0x02, 0x20, 0x05, 0x1c,
        0x05, 0x1c, 0x02, 0x1f, 0x02, 0x20, 0x02, 0x25,
        0x02, 0x23, 0x05, 0x1c, 0x05, 0x1c, 0x02, 0x19,
        0x02, 0x1a, 0x05, 0x1c, 0x05, 0x21, 0x05, 0x21,
        0x02, 0x24, 0x02, 0x25, 0x02, 0x2a, 0x02, 0x28,
        0x05, 0x21, 0x05, 0x21, 0x05, 0x20, 0x05, 0x1f,
        0xff,
      ],
    },
    { // pattern $08 (8)
      offset: 3003,
      bytes: [
        0x05, 0x1e, 0x05, 0x1e, 0x02, 0x21, 0x02, 0x22,
        0x02, 0x27, 0x02, 0x25, 0x05, 0x1e, 0x05, 0x1e,
        0x02, 0x27, 0x02, 0x26, 0x05, 0x25, 0x05, 0x23,
        0x05, 0x23, 0x02, 0x26, 0x02, 0x27, 0x02, 0x2c,
        0x02, 0x2a, 0x05, 0x23, 0x05, 0x23, 0x02, 0x2c,
        0x02, 0x2b, 0x05, 0x2a, 0x05, 0x1c, 0x05, 0x1c,
        0x02, 0x1f, 0x02, 0x20, 0x02, 0x25, 0x02, 0x23,
        0x05, 0x1c, 0x05, 0x1c, 0x02, 0x25, 0x02, 0x24,
        0x05, 0x23, 0x05, 0x21, 0x05, 0x21, 0x02, 0x24,
        0x02, 0x25, 0x05, 0x1e, 0x05, 0x1c, 0x8b, 0x0d,
        0x1c, 0x45, 0xff,
      ],
    },
    { // pattern $09 (9)
      offset: 2023,
      bytes: [
        0x85, 0x04, 0x2d, 0x05, 0x2d, 0x02, 0x40, 0x02,
        0x3f, 0x02, 0x40, 0x02, 0x3f, 0x02, 0x40, 0x05,
        0x42, 0x08, 0x40, 0x05, 0x3e, 0x05, 0x2d, 0x05,
        0x2d, 0x02, 0x3d, 0x02, 0x3c, 0x02, 0x3d, 0x02,
        0x3c, 0x02, 0x3d, 0x05, 0x3e, 0x08, 0x3d, 0x05,
        0x3c, 0x05, 0x2f, 0x05, 0x2f, 0x02, 0x3b, 0x02,
        0x3a, 0x02, 0x3b, 0x02, 0x3a, 0xff,
      ],
    },
    { // pattern $0a (10)
      offset: 2139,
      bytes: [
        0x82, 0x0a, 0x3c, 0x02, 0x3d, 0x05, 0x40, 0x05,
        0x40, 0x02, 0x3d, 0x02, 0x40, 0x02, 0x42, 0x02,
        0x42, 0x02, 0x41, 0x02, 0x40, 0x4b, 0x02, 0x3c,
        0x02, 0x3d, 0x05, 0x40, 0x05, 0x40, 0x02, 0x3d,
        0x02, 0x40, 0xff,
      ],
    },
    { // pattern $0b (11)
      offset: 3086,
      bytes: [
        0x85, 0x02, 0x21, 0x05, 0x21, 0x02, 0x3d, 0x02,
        0x3c, 0x02, 0x3d, 0x02, 0x3c, 0x02, 0x3d, 0x05,
        0x3e, 0x08, 0x3d, 0x05, 0x3b, 0x05, 0x21, 0x05,
        0x21, 0x02, 0x39, 0x02, 0x38, 0x02, 0x39, 0x02,
        0x38, 0x02, 0x39, 0x05, 0x3b, 0x08, 0x39, 0x05,
        0x39, 0x05, 0x23, 0x05, 0x23, 0x02, 0x38, 0x02,
        0x37, 0x02, 0x38, 0x02, 0x37, 0xff,
      ],
    },
    { // pattern $0c (12)
      offset: 3202,
      bytes: [
        0x85, 0x02, 0x21, 0x05, 0x21, 0x82, 0x09, 0x38,
        0x82, 0x02, 0x24, 0x05, 0x25, 0x05, 0x23, 0x05,
        0x21, 0x85, 0x09, 0x38, 0x82, 0x02, 0x1c, 0x02,
        0x1e, 0xff,
      ],
    },
    { // pattern $0d (13)
      offset: 2193,
      bytes: [
        0x02, 0x3c, 0x02, 0x3d, 0x05, 0x40, 0x05, 0x40,
        0x02, 0x3d, 0x02, 0x40, 0x02, 0x42, 0x02, 0x42,
        0x02, 0x41, 0x05, 0x40, 0x02, 0x40, 0x02, 0x42,
        0x02, 0x45, 0x02, 0x45, 0x02, 0x45, 0x02, 0x44,
        0x08, 0x43, 0x02, 0x42, 0x02, 0x42, 0x02, 0x41,
        0x08, 0x40, 0x02, 0x3f, 0x02, 0x3f, 0x02, 0x3e,
        0x08, 0x3d, 0x02, 0x3c, 0x02, 0x3c, 0x02, 0x3b,
        0x05, 0x39, 0x42, 0x81, 0x0e, 0x34, 0x01, 0x33,
        0x01, 0x32, 0x01, 0x31, 0x01, 0x30, 0x01, 0x2f,
        0x01, 0x2e, 0x01, 0x2d, 0x01, 0x2c, 0x01, 0x2b,
        0x01, 0x2a, 0x01, 0x29, 0x01, 0x28, 0x01, 0x29,
        0x01, 0x2a, 0x01, 0x2b, 0x01, 0x2c, 0x01, 0x2d,
        0x01, 0x2e, 0x01, 0x2f, 0x01, 0x30, 0x01, 0x31,
        0x01, 0x32, 0x01, 0x33, 0xff,
      ],
    },
    { // pattern $0e (14)
      offset: 2302,
      bytes: [
        0x82, 0x0b, 0x33, 0x02, 0x34, 0x05, 0x37, 0x05,
        0x37, 0x02, 0x34, 0x02, 0x37, 0x02, 0x39, 0x02,
        0x39, 0x02, 0x38, 0x02, 0x37, 0x4b, 0x02, 0x33,
        0x02, 0x34, 0x05, 0x37, 0x05, 0x37, 0x02, 0x34,
        0x02, 0x37, 0x42, 0x08, 0x33, 0x02, 0x32, 0x05,
        0x31, 0x42, 0x02, 0x33, 0x02, 0x34, 0x05, 0x37,
        0x05, 0x37, 0x02, 0x34, 0x02, 0x37, 0x02, 0x39,
        0x02, 0x39, 0x02, 0x38, 0x02, 0x37, 0x4b, 0x02,
        0x33, 0x02, 0x34, 0x05, 0x37, 0x05, 0x37, 0x02,
        0x34, 0x02, 0x37, 0x02, 0x3d, 0x02, 0x3d, 0x02,
        0x39, 0x0b, 0x2d, 0x42, 0xff,
      ],
    },
    { // pattern $0f (15)
      offset: 2387,
      bytes: [
        0x02, 0x33, 0x02, 0x34, 0x05, 0x37, 0x05, 0x37,
        0x02, 0x34, 0x02, 0x37, 0x02, 0x39, 0x02, 0x39,
        0x02, 0x38, 0x05, 0x37, 0x02, 0x37, 0x02, 0x39,
        0x02, 0x3d, 0x02, 0x3d, 0x02, 0x3d, 0x02, 0x3c,
        0x08, 0x3b, 0x02, 0x39, 0x02, 0x39, 0x02, 0x38,
        0x08, 0x37, 0x02, 0x36, 0x02, 0x36, 0x02, 0x35,
        0x08, 0x34, 0x02, 0x33, 0x02, 0x33, 0x02, 0x32,
        0x08, 0x31, 0xff,
      ],
    },
    { // pattern $10 (16)
      offset: 3228,
      bytes: [
        0x85, 0x02, 0x21, 0x05, 0x21, 0x82, 0x09, 0x38,
        0x88, 0x02, 0x21, 0x37, 0x1c, 0x17, 0x1c, 0xff,
      ],
    },
    { // pattern $11 (17)
      offset: 2619,
      bytes: [
        0x85, 0x01, 0x25, 0x45, 0x8b, 0x03, 0x3a, 0x85,
        0x01, 0x25, 0x45, 0x8b, 0x03, 0x3a, 0xff,
      ],
    },
    { // pattern $12 (18)
      offset: 3244,
      bytes: [
        0x85, 0x02, 0x1c, 0x05, 0x1c, 0x02, 0x1f, 0x02,
        0x20, 0x05, 0x1c, 0x05, 0x1c, 0x05, 0x1a, 0x05,
        0x19, 0x05, 0x1c, 0x05, 0x1c, 0x05, 0x1c, 0x02,
        0x1f, 0x02, 0x20, 0x02, 0x1a, 0x02, 0x1c, 0x4b,
        0x8b, 0x0d, 0x17, 0x85, 0x02, 0x1c, 0x05, 0x1c,
        0x02, 0x1f, 0x02, 0x20, 0x05, 0x1c, 0x05, 0x1c,
        0x05, 0x1a, 0x05, 0x19, 0x05, 0x1c, 0x05, 0x1c,
        0x05, 0x1c, 0x02, 0x1f, 0x02, 0x20, 0x02, 0x1a,
        0x02, 0x1c, 0x4b, 0x8b, 0x0d, 0x23, 0x85, 0x02,
        0x1c, 0x05, 0x1c, 0x02, 0x1f, 0x02, 0x20, 0x05,
        0x1c, 0x05, 0x1c, 0x05, 0x1a, 0x05, 0x19, 0x05,
        0x1c, 0x05, 0x1c, 0x05, 0x1c, 0x02, 0x1f, 0x02,
        0x20, 0x02, 0x1a, 0x02, 0x1c, 0x02, 0x1d, 0x05,
        0x1d, 0x02, 0x1d, 0x02, 0x1e, 0x05, 0x1e, 0x02,
        0x1e, 0x02, 0x1f, 0x05, 0x1f, 0x02, 0x1f, 0x02,
        0x20, 0x05, 0x20, 0x02, 0x20, 0xff,
      ],
    },
    { // pattern $13 (19)
      offset: 2642,
      bytes: [
        0x85, 0x01, 0x25, 0x45, 0x8b, 0x03, 0x3a, 0x82,
        0x06, 0x33, 0x05, 0x33, 0x02, 0x33, 0x02, 0x30,
        0x05, 0x30, 0x02, 0x30, 0x82, 0x06, 0x2e, 0x05,
        0x2e, 0x02, 0x2e, 0x02, 0x2a, 0x05, 0x2a, 0x02,
        0x2a, 0xff,
      ],
    },
    { // pattern $14 (20)
      offset: 2446,
      bytes: [
        0x82, 0x0e, 0x45, 0x02, 0x45, 0x05, 0x42, 0x02,
        0x45, 0x02, 0x40, 0x02, 0x42, 0x02, 0x45, 0x02,
        0x48, 0x02, 0x45, 0x02, 0x47, 0x02, 0x42, 0x05,
        0x45, 0x02, 0x40, 0x05, 0x43, 0x02, 0x40, 0x02,
        0x42, 0x02, 0x3d, 0x05, 0x40, 0x02, 0x39, 0x05,
        0x3c, 0x02, 0x39, 0x02, 0x3b, 0x02, 0x36, 0x02,
        0x39, 0x08, 0x45, 0xff,
      ],
    },
    { // pattern $15 (21)
      offset: 2550,
      bytes: [
        0x45, 0x85, 0x06, 0x33, 0x02, 0x30, 0x02, 0x33,
        0x05, 0x30, 0x05, 0x33, 0x05, 0x30, 0x02, 0x30,
        0x02, 0x33, 0x05, 0x30, 0xff,
      ],
    },
    { // pattern $16 (22)
      offset: 2571,
      bytes: [
        0x85, 0x06, 0x28, 0x05, 0x28, 0x05, 0x28, 0x05,
        0x28, 0xff,
      ],
    },
    { // pattern $17 (23)
      offset: 2599,
      bytes: [
        0x85, 0x05, 0x2d, 0x05, 0x58, 0x05, 0x58, 0x02,
        0x4c, 0x05, 0x58, 0x02, 0x4c, 0x05, 0x58, 0x05,
        0x4c, 0x05, 0x58, 0xff,
      ],
    },
    { // pattern $18 (24)
      offset: 2498,
      bytes: [
        0x82, 0x00, 0x3d, 0x02, 0x3d, 0x05, 0x39, 0x02,
        0x3d, 0x02, 0x37, 0x02, 0x39, 0x02, 0x3d, 0x02,
        0x3f, 0x02, 0x3d, 0x02, 0x3e, 0x02, 0x39, 0x05,
        0x3d, 0x02, 0x37, 0x05, 0x3b, 0x02, 0x37, 0x02,
        0x39, 0x02, 0x34, 0x05, 0x37, 0x02, 0x31, 0x05,
        0x33, 0x02, 0x31, 0x02, 0x32, 0x02, 0x2d, 0x02,
        0x31, 0x08, 0x39, 0xff,
      ],
    },
    { // pattern $19 (25)
      offset: 2676,
      bytes: [
        0x57, 0xff,
      ],
    },
    { // pattern $1a (26)
      offset: 2649,
      bytes: [
        0x82, 0x06, 0x33, 0x05, 0x33, 0x02, 0x33, 0x02,
        0x30, 0x05, 0x30, 0x02, 0x30, 0x82, 0x06, 0x2e,
        0x05, 0x2e, 0x02, 0x2e, 0x02, 0x2a, 0x05, 0x2a,
        0x02, 0x2a, 0xff,
      ],
    },
    { // pattern $1b (27)
      offset: 2678,
      bytes: [
        0x82, 0x08, 0x50, 0x02, 0x60, 0x02, 0x40, 0x02,
        0x50, 0x02, 0x60, 0x02, 0x40, 0x02, 0x50, 0x02,
        0x60, 0x02, 0x50, 0x02, 0x60, 0x02, 0x40, 0x02,
        0x50, 0x02, 0x60, 0x02, 0x40, 0x02, 0x50, 0x02,
        0x60, 0xff,
      ],
    },
    { // pattern $1c (28)
      offset: 2712,
      bytes: [
        0x82, 0x0c, 0x64, 0x02, 0x58, 0x02, 0x40, 0x02,
        0x64, 0x02, 0x58, 0x02, 0x40, 0x02, 0x64, 0x02,
        0x58, 0x02, 0x40, 0x02, 0x64, 0x02, 0x58, 0x02,
        0x40, 0x02, 0x64, 0x02, 0x58, 0x02, 0x40, 0x02,
        0x64, 0xff,
      ],
    },
    { // pattern $1d (29)
      offset: 2581,
      bytes: [
        0x82, 0x06, 0x28, 0x02, 0x28, 0x02, 0x28, 0x02,
        0x28, 0x02, 0x28, 0x02, 0x28, 0x02, 0x28, 0x02,
        0x28, 0xff,
      ],
    },
    { // pattern $1e (30)
      offset: 2077,
      bytes: [
        0x02, 0x3b, 0x05, 0x3d, 0x05, 0x3b, 0x02, 0x3a,
        0x05, 0x39, 0x05, 0x38, 0x05, 0x38, 0x02, 0x39,
        0x08, 0x39, 0x05, 0x3a, 0x05, 0x3a, 0x02, 0x3b,
        0x08, 0x3b, 0xff,
      ],
    },
    { // pattern $1f (31)
      offset: 2104,
      bytes: [
        0x02, 0x3b, 0x05, 0x3d, 0x05, 0x3b, 0x02, 0x3a,
        0x05, 0x3b, 0x02, 0x3c, 0x05, 0x3c, 0x02, 0x3c,
        0x02, 0x3d, 0x05, 0x3d, 0x02, 0x3d, 0x02, 0x3e,
        0x05, 0x3e, 0x02, 0x3e, 0x02, 0x3f, 0x05, 0x3f,
        0x02, 0x3f, 0xff,
      ],
    },
    { // pattern $20 (32)
      offset: 2174,
      bytes: [
        0x42, 0x08, 0x3c, 0x02, 0x3b, 0x05, 0x39, 0x42,
        0xff,
      ],
    },
    { // pattern $21 (33)
      offset: 2183,
      bytes: [
        0x02, 0x45, 0x02, 0x45, 0x02, 0x42, 0x0b, 0x45,
        0x42, 0xff,
      ],
    },
    { // pattern $22 (34)
      offset: 3140,
      bytes: [
        0x02, 0x38, 0x05, 0x39, 0x05, 0x38, 0x02, 0x37,
        0x05, 0x36, 0x05, 0x28, 0x05, 0x28, 0x02, 0x2a,
        0x08, 0x2a, 0x05, 0x2b, 0x05, 0x2b, 0x02, 0x2c,
        0x08, 0x2c, 0xff,
      ],
    },
    { // pattern $23 (35)
      offset: 3167,
      bytes: [
        0x02, 0x38, 0x05, 0x39, 0x05, 0x38, 0x02, 0x37,
        0x05, 0x38, 0x02, 0x24, 0x05, 0x24, 0x02, 0x24,
        0x02, 0x25, 0x05, 0x25, 0x02, 0x25, 0x02, 0x26,
        0x05, 0x26, 0x02, 0x26, 0x02, 0x27, 0x05, 0x27,
        0x02, 0x27, 0xff,
      ],
    },
  ],
  instruments: [
    { // instrument $00 (0)
      pulseWidthLo:   0x40,
      pulseWidthHi:   0x0d,
      controlReg:     0x41,
      attackDecay:    0x17,
      sustainRelease: 0x65,
      vibratoDepth:   0x02,
      pulseSpeed:     0x41,
      fx:             0x00,
    },
    { // instrument $01 (1)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x08,
      sustainRelease: 0x08,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x01,
    },
    { // instrument $02 (2)
      pulseWidthLo:   0x40,
      pulseWidthHi:   0x09,
      controlReg:     0x41,
      attackDecay:    0x09,
      sustainRelease: 0x39,
      vibratoDepth:   0x00,
      pulseSpeed:     0x41,
      fx:             0x00,
    },
    { // instrument $03 (3)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x02,
      controlReg:     0x81,
      attackDecay:    0x08,
      sustainRelease: 0x0a,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x01,
    },
    { // instrument $04 (4)
      pulseWidthLo:   0x40,
      pulseWidthHi:   0x01,
      controlReg:     0x41,
      attackDecay:    0x49,
      sustainRelease: 0x87,
      vibratoDepth:   0x02,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $05 (5)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x02,
      sustainRelease: 0x00,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $06 (6)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x03,
      sustainRelease: 0x0a,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x01,
    },
    { // instrument $07 (7)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x56,
      sustainRelease: 0x87,
      vibratoDepth:   0x03,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $08 (8)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x06,
      controlReg:     0x81,
      attackDecay:    0x02,
      sustainRelease: 0x09,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x01,
    },
    { // instrument $09 (9)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x02,
      controlReg:     0x81,
      attackDecay:    0x09,
      sustainRelease: 0xa9,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x01,
    },
    { // instrument $0a (10)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x03,
      controlReg:     0x41,
      attackDecay:    0x49,
      sustainRelease: 0x39,
      vibratoDepth:   0x02,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $0b (11)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x07,
      controlReg:     0x41,
      attackDecay:    0x47,
      sustainRelease: 0x29,
      vibratoDepth:   0x02,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $0c (12)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x06,
      controlReg:     0x11,
      attackDecay:    0x06,
      sustainRelease: 0x7b,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x01,
    },
    { // instrument $0d (13)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x90,
      sustainRelease: 0xf0,
      vibratoDepth:   0x01,
      pulseSpeed:     0xe8,
      fx:             0x02,
    },
    { // instrument $0e (14)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x0c,
      controlReg:     0x41,
      attackDecay:    0x17,
      sustainRelease: 0x65,
      vibratoDepth:   0x02,
      pulseSpeed:     0x41,
      fx:             0x04,
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
    0x0700, 0x000e, 0x4c2a, 0x002c,
    0x0707, 0x0107, 0x5701, 0x0505,
    0x4141, 0x4541, 0x2858, 0x050e,
    0xff06, 0x3005, 0x4100, 0x41ff,
    0x006f, 0x3a8c, 0x0100, 0x0001,
    0x0000, 0x0101, 0x7001, 0x3a00,
    0x03af, 0x4004, 0x00e7, 0xffff,
    0x0022, 0x0032, 0x8100, 0xa081,
  ],
  fx: [
    {"type":"drums","mask":1},
    {"type":"zipup","mask":2},
    {"type":"arpeggio","mask":4},
  ],
};

export default song;
