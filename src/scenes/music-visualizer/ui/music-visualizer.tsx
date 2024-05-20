import { createRef, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { LineSegments, ShaderMaterial, SphereGeometry } from "three";
import TWEEN from "@tweenjs/tween.js";

import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";

import { useAudio } from "../lib/hooks";

import { SPHERE_SEGMENTS_AMOUNT, WIREFRAME_SCALE_DELTA } from "./constants";

import song from "/Sum-41_-_Pieces.mp3";

const materialRef = createRef<ShaderMaterial>();
const geometryRef = createRef<SphereGeometry>();
const linesSegments = createRef<LineSegments>();

export const MusicVisualizer = () => {
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }

    TWEEN.update();
  });

  const onFrequencyChange = useCallback((frequency: number) => {
    if (!materialRef.current) {
      return;
    }

    new TWEEN.Tween(materialRef.current.uniforms.uAudioFrequency)
      .to({ value: Math.max(frequency - 100, 0) / 100 }, 150)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }, []);

  useEffect(() => {
    if (materialRef.current && geometryRef.current && linesSegments.current) {
      linesSegments.current.geometry = geometryRef.current;
      linesSegments.current.material = materialRef.current;
      linesSegments.current.scale.setScalar(1 + WIREFRAME_SCALE_DELTA);
    }
  }, []);

  useAudio({ onFrequencyChange, url: song });

  return (
    <>
      <mesh>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{
            uTime: { value: 100 },
            uAudioFrequency: { value: 0 },
          }}
        />
        <sphereGeometry
          args={[1, SPHERE_SEGMENTS_AMOUNT, SPHERE_SEGMENTS_AMOUNT]}
          ref={geometryRef}
        />
      </mesh>
      <lineSegments ref={linesSegments} />
    </>
  );
};
