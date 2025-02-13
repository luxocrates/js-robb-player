# JavaScript player of Rob Hubbard sound modules

Back in the mid-eighties, musician/programmer Rob Hubbard wrote some iconic game
music for the Commodore 64 computer.

The original music playback routines were written in 6502 assembly. This project
is a reimplementation of those routines in TypeScript, suitable for playback
on a web browser, following Anthony McSweeney’s disassembly of Rob’s original
code, [as published here](https://codebase64.org/doku.php?id=magazines:chacking5#rob_hubbard_s_musicdisassembled_commented_and_explained).
The playback uses a variation of the SID emulator I created for the
[Viciious C64 emulator](https://github.com/luxocrates/viciious) for sound
playback, though it’s not the most accurate.

Why? For fun. If you’ve ever wanted to see how comparatively humble hardware
could generate such sophisticated chipmusic, and how such
epic songs could be encoded in a just few hundred bytes of data, this project
should give some insight into what was going on under the hood.

## Inside this project

### src

The main code is in the `src` directory, written as a Vite app. To run locally,
`npm i` then `npm run dev` and follow on-screen instructions for where to
point your browser to.

### tools

The `songExtract` folder contains a commandline tool which analyzes SID files
for music. If they’re found to have data that closely matches the Rob Hubbard
music player, it creates a TypeScript file with the extracted tracks, patterns,
instruments and frequencies table, suitable for playback by the main player
(with caveats).

## Licensing

I can’t speak to the current licensing status of Rob’s original code and data
(can anyone?), but the original work by me, @luxocrates, in rewriting the
routines and a SID emulator in TypeScript, is in the public domain.
