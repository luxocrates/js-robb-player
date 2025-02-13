import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { createAudioHost } from "../emulation/audio-OscillatorNode";
import { createSid, type Sid } from "../emulation/sid";

const SidContext = createContext<SidContextType | null>(null);

type SidContextType = {
  sid: Sid;
  start: () => void;
  stop: () => void;
};

export const SidProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [, setIsReady] = useState(false);
  const contextRef = useRef<SidContextType | null>(null);

  useEffect(() => {
    if (!contextRef.current) {
      const audioHost = createAudioHost();
      const sid = createSid(audioHost);

      let sidInterval: ReturnType<typeof setInterval> | null = null;

      const removeInterval = () => {
        if (sidInterval) {
          clearInterval(sidInterval);
        }
      };

      contextRef.current = {
        sid,
        start: () => {
          removeInterval();
          sidInterval = setInterval(
            () => {
              // An interval should be 1/50s = 2ms
          
              // TODO: we're calling something 1000 times/sec which internally
              // is counting to 100. Don't do that.
              for (let i = 0; i < 1000; i++) {
                sid.tick();
              }
            },
            1
          );
        
        },
        stop: () => {
          removeInterval();
          sid.reset();
        },
      };

      setIsReady(true);
    }
  });

  return contextRef.current
    ? (
      <SidContext.Provider value={contextRef.current}>
        {children}
      </SidContext.Provider>
    )
    : null; 
};

export const useSidContext: () => SidContextType = () => {
  const sid = useContext(SidContext);
  if (!sid) throw new Error("useSidContext used but provider not ready");
  return sid;
};
