import { useEffect, useRef, useState } from "react";

interface AudioProps {
  src: string;
  loop?: boolean;
}

const useAudioPlayer = ({ src, loop = true }: AudioProps) => {
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  const repeatAudio = (repetitions: number) => {
    setPlaying(true);
    audio.loop = true;
    setTimeout(() => {
      audio.loop = false;
      audio.currentTime = 0;
      setPlaying(false);
    }, repetitions * audio.duration * 1000);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    audio.volume = 0.3;
  }, [playing]);

  useEffect(() => {
    audio.loop = loop;
  }, []);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, toggle, repeatAudio };
};

export default useAudioPlayer;
