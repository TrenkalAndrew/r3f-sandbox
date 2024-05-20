import { useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { AudioListener, Audio, AudioLoader, AudioAnalyser } from "three";

type UseAudio = {
  url: string;
  onFrequencyChange: (frequency: number) => void;
};

export const useAudio = ({ onFrequencyChange, url }: UseAudio) => {
  const { camera } = useThree();
  const [listener] = useState(() => new AudioListener());
  const [sound] = useState(() => new Audio(listener));
  const buffer = useLoader(AudioLoader, url);
  const [analyzer] = useState(() => new AudioAnalyser(sound, 32));

  useEffect(() => {
    if (sound) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(1);
      sound.play();
      camera.add(listener);
    }
    return () => {
      camera.remove(listener);
    };
  }, [buffer, camera, listener, sound]);

  useFrame(() => {
    const frequency = analyzer.getAverageFrequency();

    onFrequencyChange(frequency);
  });
};
