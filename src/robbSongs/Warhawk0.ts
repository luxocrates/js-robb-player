import { type RobbSong } from "../robbPlayer";

const song: RobbSong = {
  tracks: [
    [ // track 0
      0x04, 0x24, 0x23, 0x23, 0x04, 0x05, 0x04, 0x06,
      0x11, 0x04, 0x06, 0x07, 0x10, 0x0b, 0x0c, 0x0b,
      0x0d, 0x11, 0x11, 0x07, 0x10, 0x13, 0x13, 0x14,
      0x14, 0x13, 0x13, 0x14, 0x16, 0x16, 0x19, 0x19,
      0x1c, 0x1c, 0x1c, 0x1c, 0x1c, 0x1c, 0x1c, 0x1c,
      0x1e, 0x1e, 0x1f, 0x1f, 0x13, 0x13, 0x14, 0x14,
      0x0b, 0x0c, 0x0b, 0x0d, 0x25, 0x25, 0x25, 0x25,
      0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25,
      0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25,
      0x25, 0x25, 0x25, 0x25, 0x29, 0x23, 0x23, 0xff,
    ],
    [ // track 1
      0x23, 0x04, 0x24, 0x23, 0x0e, 0x0e, 0x0e, 0x0e,
      0x0e, 0x0e, 0x0e, 0x0e, 0x12, 0x0e, 0x0e, 0x0e,
      0x0e, 0x0f, 0x0f, 0x0f, 0x0f, 0x0e, 0x0e, 0x0e,
      0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x12, 0x12, 0x0f,
      0x0f, 0x0f, 0x0f, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e,
      0x0e, 0x0e, 0x17, 0x17, 0x17, 0x17, 0x1b, 0x1b,
      0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b,
      0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b,
      0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1b, 0x1d, 0x1d,
      0x1d, 0x1d, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e,
      0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x25,
      0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x23,
      0x29, 0x23, 0xff,
    ],
    [ // track 2
      0x23, 0x23, 0x04, 0x24, 0x01, 0x01, 0x02, 0x02,
      0x03, 0x03, 0x01, 0x01, 0x01, 0x01, 0x02, 0x02,
      0x03, 0x03, 0x01, 0x01, 0x01, 0x02, 0x02, 0x01,
      0x01, 0x02, 0x03, 0x01, 0x01, 0x01, 0x02, 0x02,
      0x03, 0x03, 0x01, 0x01, 0x08, 0x08, 0x02, 0x02,
      0x08, 0x08, 0x02, 0x02, 0x09, 0x09, 0x01, 0x01,
      0x0a, 0x0a, 0x03, 0x03, 0x09, 0x09, 0x01, 0x01,
      0x0a, 0x0a, 0x03, 0x03, 0x01, 0x02, 0x02, 0x01,
      0x01, 0x02, 0x03, 0x01, 0x01, 0x02, 0x02, 0x01,
      0x01, 0x02, 0x03, 0x01, 0x08, 0x08, 0x02, 0x02,
      0x08, 0x08, 0x02, 0x15, 0x01, 0x01, 0x09, 0x09,
      0x02, 0x02, 0x03, 0x03, 0x01, 0x01, 0x09, 0x09,
      0x02, 0x02, 0x15, 0x15, 0x15, 0x15, 0x18, 0x18,
      0x18, 0x15, 0x15, 0x15, 0x09, 0x09, 0x09, 0x1a,
      0x1a, 0x1a, 0x18, 0x18, 0x18, 0x15, 0x15, 0x15,
      0x09, 0x09, 0x09, 0x1a, 0x1a, 0x1a, 0x18, 0x18,
      0x18, 0x15, 0x15, 0x15, 0x09, 0x1a, 0x1a, 0x18,
      0x18, 0x18, 0x0a, 0x0a, 0x0a, 0x03, 0x03, 0x03,
      0x01, 0x01, 0x09, 0x09, 0x02, 0x02, 0x03, 0x03,
      0x09, 0x09, 0x01, 0x01, 0x0a, 0x0a, 0x03, 0x03,
      0x09, 0x09, 0x01, 0x01, 0x0a, 0x0a, 0x03, 0x03,
      0x03, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25,
      0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25, 0x25,
      0x25, 0x23, 0x23, 0x29, 0xff,
    ],
  ],
  patterns: [
    { offset: 0, bytes: [] },  // (not referenced)
    { // pattern $01 (1)
      offset: 3392,
      bytes: [
        0x83, 0x02, 0x13, 0x03, 0x1f, 0x83, 0x03, 0x68,
        0x83, 0x02, 0x13, 0x03, 0x1f, 0x03, 0x13, 0x83,
        0x03, 0x68, 0x83, 0x02, 0x1f, 0xff,
      ],
    },
    { // pattern $02 (2)
      offset: 3414,
      bytes: [
        0x83, 0x02, 0x18, 0x03, 0x24, 0x83, 0x03, 0x68,
        0x83, 0x02, 0x18, 0x03, 0x24, 0x03, 0x18, 0x83,
        0x03, 0x68, 0x83, 0x02, 0x24, 0xff,
      ],
    },
    { // pattern $03 (3)
      offset: 3436,
      bytes: [
        0x83, 0x02, 0x1a, 0x03, 0x26, 0x83, 0x03, 0x68,
        0x83, 0x02, 0x1a, 0x03, 0x26, 0x03, 0x1a, 0x83,
        0x03, 0x68, 0x83, 0x02, 0x26, 0xff,
      ],
    },
    { // pattern $04 (4)
      offset: 2584,
      bytes: [
        0x8b, 0x00, 0x42, 0x0b, 0x43, 0x0b, 0x3e, 0x0b,
        0x3f, 0x07, 0x3e, 0x07, 0x3a, 0x0b, 0x39, 0x0b,
        0x3a, 0x27, 0x32, 0x9f, 0x12, 0x32, 0x8b, 0x00,
        0x33, 0x0b, 0x32, 0x0b, 0x3c, 0x0b, 0x39, 0x07,
        0x3f, 0x07, 0x3e, 0xff,
      ],
    },
    { // pattern $05 (5)
      offset: 2620,
      bytes: [
        0x0b, 0x3d, 0x27, 0x3e, 0x97, 0x12, 0x3e, 0x83,
        0x0f, 0x43, 0x03, 0x46, 0x03, 0x45, 0x03, 0x44,
        0x03, 0x43, 0xff,
      ],
    },
    { // pattern $06 (6)
      offset: 2639,
      bytes: [
        0x0b, 0x39, 0x0b, 0x3a, 0x27, 0x37, 0x9f, 0x12,
        0x37, 0xff,
      ],
    },
    { // pattern $07 (7)
      offset: 2649,
      bytes: [
        0xbf, 0x04, 0x43, 0x0f, 0x4f, 0x87, 0x05, 0x44,
        0x87, 0x04, 0x43, 0x1f, 0x43, 0x9f, 0x05, 0x43,
        0xff,
      ],
    },
    { // pattern $08 (8)
      offset: 3458,
      bytes: [
        0x83, 0x02, 0x19, 0x03, 0x25, 0x83, 0x03, 0x2b,
        0x83, 0x02, 0x19, 0x03, 0x25, 0x03, 0x19, 0x83,
        0x03, 0x2b, 0x83, 0x02, 0x25, 0xff,
      ],
    },
    { // pattern $09 (9)
      offset: 3480,
      bytes: [
        0x83, 0x02, 0x1b, 0x03, 0x27, 0x83, 0x03, 0x5f,
        0x83, 0x02, 0x1b, 0x03, 0x27, 0x03, 0x1b, 0x83,
        0x03, 0x5f, 0x83, 0x02, 0x27, 0xff,
      ],
    },
    { // pattern $0a (10)
      offset: 3502,
      bytes: [
        0x83, 0x02, 0x15, 0x03, 0x21, 0x83, 0x03, 0x5f,
        0x83, 0x02, 0x15, 0x03, 0x21, 0x03, 0x15, 0x83,
        0x03, 0x5f, 0x83, 0x02, 0x21, 0xff,
      ],
    },
    { // pattern $0b (11)
      offset: 2713,
      bytes: [
        0x9f, 0x01, 0x43, 0x0f, 0x46, 0x0f, 0x4b, 0x2f,
        0x4a, 0x9f, 0x1b, 0x4a, 0x8f, 0x01, 0x46, 0x2f,
        0x49, 0x9f, 0x1b, 0x49, 0x8f, 0x01, 0x45, 0xff,
      ],
    },
    { // pattern $0c (12)
      offset: 2737,
      bytes: [
        0x2b, 0x48, 0x9f, 0x1b, 0x48, 0x83, 0x0f, 0x3c,
        0x03, 0x3f, 0x03, 0x3e, 0x03, 0x3d, 0x03, 0x3c,
        0xff,
      ],
    },
    { // pattern $0d (13)
      offset: 2754,
      bytes: [
        0x2b, 0x4a, 0x9f, 0x1b, 0x4a, 0x83, 0x0f, 0x3f,
        0x03, 0x42, 0x03, 0x41, 0x03, 0x40, 0x03, 0x3f,
        0xff,
      ],
    },
    { // pattern $0e (14)
      offset: 3131,
      bytes: [
        0x83, 0x07, 0x4f, 0x03, 0x4f, 0x83, 0x06, 0x2e,
        0x83, 0x07, 0x4f, 0x83, 0x06, 0x2d, 0x03, 0x2e,
        0x83, 0x07, 0x4f, 0x83, 0x06, 0x2b, 0x83, 0x07,
        0x4f, 0x83, 0x06, 0x2b, 0x07, 0x2e, 0x03, 0x2d,
        0x03, 0x2e, 0x83, 0x0c, 0x2e, 0x03, 0x2c, 0xff,
      ],
    },
    { // pattern $0f (15)
      offset: 3171,
      bytes: [
        0x83, 0x08, 0x3d, 0x03, 0x3c, 0x03, 0x37, 0x07,
        0x3d, 0x03, 0x3c, 0x03, 0x37, 0x07, 0x3d, 0x03,
        0x3c, 0x03, 0x37, 0x07, 0x3d, 0x03, 0x3c, 0x03,
        0x37, 0x03, 0x3d, 0xff,
      ],
    },
    { // pattern $10 (16)
      offset: 2666,
      bytes: [
        0xbf, 0x04, 0x43, 0x0f, 0x43, 0x87, 0x05, 0x44,
        0x87, 0x04, 0x43, 0x1f, 0x43, 0x81, 0x09, 0x43,
        0x01, 0x44, 0x01, 0x45, 0x01, 0x46, 0x01, 0x47,
        0x01, 0x48, 0x01, 0x49, 0x01, 0x4a, 0x01, 0x4b,
        0x01, 0x4c, 0x01, 0x4d, 0x01, 0x4e, 0x01, 0x4f,
        0x01, 0x50, 0x01, 0x51, 0x01, 0x52, 0xff,
      ],
    },
    { // pattern $11 (17)
      offset: 2771,
      bytes: [
        0x8b, 0x0a, 0x3e, 0x0b, 0x46, 0x07, 0x3e, 0x1f,
        0x3f, 0x0b, 0x3f, 0x0b, 0x48, 0x07, 0x45, 0x1f,
        0x46, 0x0b, 0x43, 0x0b, 0x4d, 0x07, 0x4a, 0x1f,
        0x4b, 0x0b, 0x42, 0x0b, 0x48, 0x07, 0x45, 0x1f,
        0x43, 0xff,
      ],
    },
    { // pattern $12 (18)
      offset: 2805,
      bytes: [
        0x87, 0x0b, 0x3a, 0x83, 0x07, 0x4f, 0x83, 0x0b,
        0x43, 0x83, 0x07, 0x4f, 0x03, 0x4f, 0x87, 0x0b,
        0x3a, 0x87, 0x0b, 0x3c, 0x83, 0x07, 0x4f, 0x83,
        0x0b, 0x3c, 0x83, 0x07, 0x4f, 0x03, 0x4f, 0x87,
        0x0b, 0x3c, 0x87, 0x0b, 0x3c, 0x83, 0x07, 0x4f,
        0x83, 0x0b, 0x45, 0x83, 0x07, 0x4f, 0x03, 0x4f,
        0x87, 0x0b, 0x42, 0x87, 0x0b, 0x43, 0x83, 0x07,
        0x4f, 0x83, 0x0b, 0x43, 0x83, 0x07, 0x4f, 0x03,
        0x4f, 0x87, 0x0b, 0x43, 0x87, 0x0b, 0x47, 0x83,
        0x07, 0x4f, 0x83, 0x0b, 0x4a, 0x83, 0x07, 0x4f,
        0x03, 0x4f, 0x87, 0x0b, 0x47, 0x87, 0x0b, 0x48,
        0x83, 0x07, 0x4f, 0x83, 0x0b, 0x48, 0x83, 0x07,
        0x4f, 0x03, 0x4f, 0x87, 0x0b, 0x48, 0x87, 0x0b,
        0x3e, 0x83, 0x07, 0x4f, 0x83, 0x0b, 0x45, 0x83,
        0x07, 0x4f, 0x03, 0x4f, 0x87, 0x0b, 0x42, 0x87,
        0x0b, 0x3e, 0x83, 0x07, 0x4f, 0x83, 0x0b, 0x3e,
        0x83, 0x07, 0x4f, 0x03, 0x4f, 0x87, 0x0b, 0x3e,
        0xff,
      ],
    },
    { // pattern $13 (19)
      offset: 2942,
      bytes: [
        0x83, 0x0d, 0x3d, 0x03, 0x3e, 0x03, 0x3c, 0x03,
        0x3e, 0x03, 0x3a, 0x03, 0x3e, 0x03, 0x39, 0x07,
        0x37, 0x03, 0x3e, 0x03, 0x3c, 0x03, 0x3e, 0x03,
        0x3a, 0x03, 0x3e, 0x03, 0x39, 0x03, 0x37, 0xff,
      ],
    },
    { // pattern $14 (20)
      offset: 2974,
      bytes: [
        0x83, 0x0d, 0x42, 0x03, 0x43, 0x03, 0x41, 0x03,
        0x43, 0x03, 0x3f, 0x03, 0x43, 0x03, 0x3e, 0x07,
        0x3c, 0x03, 0x43, 0x03, 0x41, 0x03, 0x43, 0x03,
        0x3f, 0x03, 0x43, 0x03, 0x3e, 0x03, 0x3c, 0xff,
      ],
    },
    { // pattern $15 (21)
      offset: 3524,
      bytes: [
        0x83, 0x02, 0x14, 0x03, 0x20, 0x83, 0x03, 0x60,
        0x83, 0x02, 0x14, 0x03, 0x20, 0x03, 0x14, 0x83,
        0x03, 0x60, 0x83, 0x02, 0x20, 0xff,
      ],
    },
    { // pattern $16 (22)
      offset: 3006,
      bytes: [
        0x83, 0x0d, 0x41, 0x03, 0x42, 0x03, 0x3f, 0x03,
        0x42, 0x03, 0x3e, 0x03, 0x42, 0x03, 0x3d, 0x07,
        0x3c, 0x03, 0x42, 0x03, 0x41, 0x03, 0x42, 0x03,
        0x3f, 0x03, 0x42, 0x03, 0x3d, 0x03, 0x3c, 0xff,
      ],
    },
    { // pattern $17 (23)
      offset: 3199,
      bytes: [
        0x83, 0x07, 0x4b, 0x83, 0x06, 0x2c, 0x03, 0x30,
        0x83, 0x07, 0x4b, 0x83, 0x06, 0x2e, 0x03, 0x2c,
        0x83, 0x0c, 0x2e, 0x03, 0x2c, 0xff,
      ],
    },
    { // pattern $18 (24)
      offset: 3546,
      bytes: [
        0x83, 0x02, 0x16, 0x03, 0x22, 0x83, 0x03, 0x60,
        0x83, 0x02, 0x16, 0x03, 0x22, 0x03, 0x16, 0x83,
        0x03, 0x60, 0x83, 0x02, 0x22, 0xff,
      ],
    },
    { // pattern $19 (25)
      offset: 3038,
      bytes: [
        0x87, 0x08, 0x52, 0x8b, 0x0e, 0x46, 0x0b, 0x4e,
        0x0b, 0x4d, 0x1f, 0x55, 0x83, 0x0f, 0x46, 0x03,
        0x49, 0x03, 0x48, 0x03, 0x47, 0x03, 0x46, 0x87,
        0x08, 0x50, 0x8b, 0x0e, 0x46, 0x0b, 0x4e, 0x0b,
        0x4d, 0x1f, 0x50, 0x83, 0x0f, 0x48, 0x03, 0x4b,
        0x03, 0x4a, 0x03, 0x49, 0x03, 0x48, 0x87, 0x08,
        0x4b, 0x8b, 0x0e, 0x46, 0x0b, 0x49, 0x0b, 0x48,
        0x1f, 0x4b, 0x83, 0x0f, 0x4b, 0x03, 0x4e, 0x03,
        0x4d, 0x03, 0x4c, 0x03, 0x4b, 0x87, 0x08, 0x4d,
        0x8b, 0x0e, 0x45, 0x0b, 0x4e, 0x0b, 0x4d, 0x1f,
        0x54, 0x83, 0x0f, 0x42, 0x03, 0x45, 0x03, 0x44,
        0x03, 0x43, 0x03, 0x42, 0xff,
      ],
    },
    { // pattern $1a (26)
      offset: 3568,
      bytes: [
        0x83, 0x02, 0x1d, 0x03, 0x29, 0x83, 0x03, 0x60,
        0x83, 0x02, 0x1d, 0x03, 0x29, 0x03, 0x1d, 0x83,
        0x03, 0x60, 0x83, 0x02, 0x29, 0xff,
      ],
    },
    { // pattern $1b (27)
      offset: 3221,
      bytes: [
        0x83, 0x04, 0x3c, 0x03, 0x3c, 0x83, 0x05, 0x3d,
        0x83, 0x08, 0x5e, 0x83, 0x04, 0x3c, 0x83, 0x08,
        0x5e, 0x83, 0x05, 0x3d, 0x83, 0x04, 0x3c, 0x83,
        0x08, 0x5e, 0x83, 0x04, 0x3c, 0x83, 0x05, 0x3d,
        0x83, 0x08, 0x5e, 0xff,
      ],
    },
    { // pattern $1c (28)
      offset: 3257,
      bytes: [
        0x83, 0x10, 0x46, 0x03, 0x46, 0x03, 0x46, 0x83,
        0x08, 0x52, 0x83, 0x10, 0x46, 0x83, 0x08, 0x52,
        0x83, 0x10, 0x46, 0x03, 0x46, 0x83, 0x08, 0x52,
        0x83, 0x10, 0x46, 0x03, 0x46, 0x83, 0x08, 0x52,
        0xff,
      ],
    },
    { // pattern $1d (29)
      offset: 3290,
      bytes: [
        0x83, 0x04, 0x3e, 0x03, 0x3e, 0x83, 0x05, 0x3f,
        0x83, 0x08, 0x51, 0x83, 0x04, 0x3e, 0x83, 0x08,
        0x51, 0x83, 0x05, 0x3f, 0x83, 0x04, 0x3e, 0x83,
        0x08, 0x51, 0x83, 0x04, 0x3e, 0x83, 0x05, 0x3f,
        0x83, 0x08, 0x51, 0xff,
      ],
    },
    { // pattern $1e (30)
      offset: 3326,
      bytes: [
        0x83, 0x04, 0x45, 0x03, 0x45, 0x03, 0x45, 0x83,
        0x08, 0x4f, 0x83, 0x04, 0x45, 0x83, 0x08, 0x4f,
        0x83, 0x04, 0x45, 0x03, 0x45, 0x83, 0x08, 0x4f,
        0x83, 0x04, 0x45, 0x03, 0x45, 0x83, 0x08, 0x4f,
        0xff,
      ],
    },
    { // pattern $1f (31)
      offset: 3359,
      bytes: [
        0x83, 0x05, 0x45, 0x03, 0x45, 0x03, 0x45, 0x83,
        0x08, 0x4e, 0x83, 0x05, 0x45, 0x83, 0x08, 0x4e,
        0x83, 0x05, 0x45, 0x03, 0x45, 0x83, 0x08, 0x4e,
        0x83, 0x05, 0x45, 0x03, 0x45, 0x83, 0x08, 0x4e,
        0xff,
      ],
    },
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { // pattern $23 (35)
      offset: 3626,
      bytes: [
        0x64, 0xff,
      ],
    },
    { // pattern $24 (36)
      offset: 3628,
      bytes: [
        0x0b, 0x39, 0x0b, 0x3a, 0x27, 0x37, 0xaf, 0x12,
        0x37, 0x3f, 0x43, 0x3f, 0x4f, 0x7f, 0x7f, 0x4f,
        0xff,
      ],
    },
    { // pattern $25 (37)
      offset: 3645,
      bytes: [
        0x80, 0x11, 0x4a, 0x00, 0x4c, 0x00, 0x4e, 0x00,
        0x4f, 0xff,
      ],
    },
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { offset: 0, bytes: [] },  // (not referenced)
    { // pattern $29 (41)
      offset: 3695,
      bytes: [
        0x81, 0x0c, 0x28, 0x82, 0x14, 0x30, 0x8f, 0xc7,
        0x02, 0x35, 0xff, 0x82, 0x0a, 0x2f, 0x9c, 0x15,
        0x2f, 0xff,
      ],
    },
  ],
  instruments: [
    { // instrument $00 (0)
      pulseWidthLo:   0xa0,
      pulseWidthHi:   0x00,
      controlReg:     0x41,
      attackDecay:    0x8d,
      sustainRelease: 0x9f,
      vibratoDepth:   0x2b,
      pulseSpeed:     0x30,
      fx:             0x00,
    },
    { // instrument $01 (1)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x8c,
      sustainRelease: 0xcf,
      vibratoDepth:   0x1a,
      pulseSpeed:     0x70,
      fx:             0x08,
    },
    { // instrument $02 (2)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x01,
      controlReg:     0x41,
      attackDecay:    0x0a,
      sustainRelease: 0xbf,
      vibratoDepth:   0x00,
      pulseSpeed:     0x20,
      fx:             0x00,
    },
    { // instrument $03 (3)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x02,
      controlReg:     0x15,
      attackDecay:    0x09,
      sustainRelease: 0x0f,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0xf5,
    },
    { // instrument $04 (4)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x01,
      controlReg:     0x41,
      attackDecay:    0x0d,
      sustainRelease: 0x6d,
      vibratoDepth:   0x00,
      pulseSpeed:     0x30,
      fx:             0x25,
    },
    { // instrument $05 (5)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x01,
      controlReg:     0x41,
      attackDecay:    0x0d,
      sustainRelease: 0x6d,
      vibratoDepth:   0x00,
      pulseSpeed:     0x30,
      fx:             0x35,
    },
    { // instrument $06 (6)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x01,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0x09,
      vibratoDepth:   0x00,
      pulseSpeed:     0x40,
      fx:             0x05,
    },
    { // instrument $07 (7)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0x08,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x95,
    },
    { // instrument $08 (8)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x02,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0x4f,
      vibratoDepth:   0x00,
      pulseSpeed:     0x10,
      fx:             0xc5,
    },
    { // instrument $09 (9)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x08,
      sustainRelease: 0xff,
      vibratoDepth:   0x00,
      pulseSpeed:     0xf0,
      fx:             0x35,
    },
    { // instrument $0a (10)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x01,
      controlReg:     0x41,
      attackDecay:    0x09,
      sustainRelease: 0x0e,
      vibratoDepth:   0x00,
      pulseSpeed:     0x41,
      fx:             0xc5,
    },
    { // instrument $0b (11)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x05,
      controlReg:     0x41,
      attackDecay:    0x08,
      sustainRelease: 0x0c,
      vibratoDepth:   0x00,
      pulseSpeed:     0x40,
      fx:             0xc5,
    },
    { // instrument $0c (12)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0x0a,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x01,
    },
    { // instrument $0d (13)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x00,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0xfa,
      vibratoDepth:   0x00,
      pulseSpeed:     0x90,
      fx:             0x05,
    },
    { // instrument $0e (14)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x11,
      attackDecay:    0x7f,
      sustainRelease: 0xfa,
      vibratoDepth:   0x19,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $0f (15)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0xda,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x95,
    },
    { // instrument $10 (16)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x02,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0x6d,
      vibratoDepth:   0x00,
      pulseSpeed:     0x40,
      fx:             0x55,
    },
    { // instrument $11 (17)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x05,
      controlReg:     0x41,
      attackDecay:    0xaf,
      sustainRelease: 0xfc,
      vibratoDepth:   0x21,
      pulseSpeed:     0x20,
      fx:             0x00,
    },
    { // instrument $12 (18)
      pulseWidthLo:   0xa0,
      pulseWidthHi:   0x09,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0xff,
      vibratoDepth:   0x21,
      pulseSpeed:     0x10,
      fx:             0x00,
    },
    undefined,
    { // instrument $14 (20)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x02,
      controlReg:     0x81,
      attackDecay:    0x0a,
      sustainRelease: 0x20,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    { // instrument $15 (21)
      pulseWidthLo:   0x00,
      pulseWidthHi:   0x08,
      controlReg:     0x00,
      attackDecay:    0x00,
      sustainRelease: 0x00,
      vibratoDepth:   0x00,
      pulseSpeed:     0x00,
      fx:             0x00,
    },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { // instrument $1b (27)
      pulseWidthLo:   0x80,
      pulseWidthHi:   0x08,
      controlReg:     0x41,
      attackDecay:    0x0f,
      sustainRelease: 0xff,
      vibratoDepth:   0x18,
      pulseSpeed:     0x20,
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
    0x0700, 0x070e, 0x0101, 0x0001,
    0x0000, 0xff00, 0x9c1f, 0x5f9f,
    0x1500, 0x2f11, 0x1140, 0x1615,
    0xfe17, 0xdc5f, 0x1102, 0x00ff,
    0x766f, 0x8aa7, 0x0101, 0x0000,
    0x0000, 0x0000, 0x0100, 0x0101,
    0x0104, 0x0100, 0x0101, 0x0103,
    0x0101, 0x0001, 0x0100, 0x0101,
  ],
  fx: [
    {"type":"drums","mask":1},
    {"type":"arpeggio","mask":4},
  ],
};

export default song;
