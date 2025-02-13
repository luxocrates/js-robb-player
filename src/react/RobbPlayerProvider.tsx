import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { playerInit, type PlayerListeners, playerTick } from "../robbPlayer";
import { type RobbSong } from "../robbPlayer";
import { useSidContext } from "./SidProvider";

type RobbPlayerContextType = {
  play: (song: RobbSong, listeners: PlayerListeners) => void,
  stop: () => void,
};

const RobbPlayerContext = createContext<RobbPlayerContextType | null>(null);

export const RobbPlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [, setIsReady] = useState(false);
  const contextRef = useRef<RobbPlayerContextType | null>(null);

  const sidContext = useSidContext();

  useEffect(() => {
    if (!contextRef.current) {

      let playerInterval: ReturnType<typeof setInterval> | null = null;

      const removeInterval = () => {
        if (playerInterval) {
          clearInterval(playerInterval);
        }
      };

      contextRef.current = {
        play: (song: RobbSong, listeners: PlayerListeners) => {
          removeInterval();

          sidContext.start();
          playerInit(song);

          playerInterval = setInterval(
            () => {
              playerTick(sidContext.sid.write_d400_d7ff, listeners);
            },
            20
          );
        },
        stop: () => {          
          removeInterval();
          sidContext.stop();
        },
      };

      setIsReady(true);
    }
  });

  return contextRef.current
    ? (
      <RobbPlayerContext.Provider value={contextRef.current}>
        {children}
      </RobbPlayerContext.Provider>
    )
    : null; 
};

export const useRobbPlayerContext: () => RobbPlayerContextType = () => {
  const robbPlayerContext = useContext(RobbPlayerContext);
  if (!robbPlayerContext) throw new Error("useHubbardContext used but provider not ready");
  return robbPlayerContext;
};
