import { type FC } from "react";
import { type PlayerListeners, type RobbSong } from "../robbPlayer";
import { useRobbPlayerContext } from "./RobbPlayerProvider";


export const Instruments: FC<{
  isolatedInstrumentSongs: (RobbSong | undefined)[], 
  makeMakeListeners: () => PlayerListeners,
}> = ({
  isolatedInstrumentSongs,
  makeMakeListeners,
}) => {
  const { play } = useRobbPlayerContext();

  return (
    <div>
      <h4>Instruments</h4>
      {
        isolatedInstrumentSongs.map(
          (song, index) => (
            song
              ? (
                <button
                  key={index}
                  className={`inst${index}`}
                  onClick={() => {
                    play(song, makeMakeListeners());
                  }}
                >
                  {String(index)}
                </button>
              )
              : null
          )
        )
      }
      <p>
        🤓{" "}
        <small>
          If an instrument doesn’t highlight when you play an isolated
          pattern, it’s because the pattern doesn’t start with an instrument
          change. A placeholder instrument will be used.
        </small>
      </p>
    </div>
  );
};