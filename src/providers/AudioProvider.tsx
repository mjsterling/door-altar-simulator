import { createContext, useContext, useEffect, useRef } from "react";
import { audGunshot, audMetronome, audPunch } from "../assets/audio";

const AudioContext = createContext<{
  metronomeRef: React.RefObject<HTMLAudioElement> | null;
  shootSoundRef: React.RefObject<HTMLAudioElement> | null;
  punchSoundRef: React.RefObject<HTMLAudioElement> | null;
}>({
  metronomeRef: null,
  shootSoundRef: null,
  punchSoundRef: null,
});

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const metronomeRef = useRef<HTMLAudioElement>(null);
  const shootSoundRef = useRef<HTMLAudioElement>(null);
  const punchSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (
      metronomeRef.current &&
      shootSoundRef.current &&
      punchSoundRef.current
    ) {
      metronomeRef.current.volume = 0.3;
      shootSoundRef.current.volume = 0.6;
      punchSoundRef.current.volume = 0.9;
    }
  }, [metronomeRef.current, shootSoundRef.current, punchSoundRef.current]);

  return (
    <AudioContext.Provider
      value={{ metronomeRef, shootSoundRef, punchSoundRef }}
    >
      <audio ref={metronomeRef} src={audMetronome} />
      <audio ref={shootSoundRef} src={audGunshot} />
      <audio ref={punchSoundRef} src={audMetronome} />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
