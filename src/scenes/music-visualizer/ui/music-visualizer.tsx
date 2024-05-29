import { createRef, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { LineSegments, ShaderMaterial, SphereGeometry, Vector2 } from "three";
import TWEEN from "@tweenjs/tween.js";
import {
  EffectComposer,
  ChromaticAberration,
} from "@react-three/postprocessing";

import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";

import { useAudio } from "../lib/hooks";

import { SPHERE_SEGMENTS_AMOUNT, WIREFRAME_SCALE_DELTA } from "./constants";

import song from "/sounds/Sum-41_-_Pieces.mp3";

const materialRef = createRef<ShaderMaterial>();
const geometryRef = createRef<SphereGeometry>();
const linesSegmentsRef = createRef<LineSegments>();
const chromaticEffectRef = createRef<typeof ChromaticAberration>();

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

    const newFrequency = Math.max(frequency - 100, 0) / 100;

    new TWEEN.Tween(materialRef.current.uniforms.uAudioFrequency)
      .to({ value: newFrequency }, 150)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    const offset = newFrequency > 0.4 ? 0.003 : 0.005;

    if (chromaticEffectRef.current) {
      // @ts-expect-error prevent problems with typization with ref of ChromaticAberration
      chromaticEffectRef.current.offset = new Vector2(offset);
    }
  }, []);

  useEffect(() => {
    if (
      materialRef.current &&
      geometryRef.current &&
      linesSegmentsRef.current
    ) {
      linesSegmentsRef.current.geometry = geometryRef.current;
      linesSegmentsRef.current.material = materialRef.current;
      linesSegmentsRef.current.scale.setScalar(1 + WIREFRAME_SCALE_DELTA);
    }
  }, []);

  useAudio({ onFrequencyChange, url: song });

  return (
    <EffectComposer>
      <ChromaticAberration
        modulationOffset={0}
        offset={new Vector2(0.003)}
        radialModulation={false}
        // @ts-expect-error prevent problems with typization with ref of ChromaticAberration
        ref={chromaticEffectRef}
      />
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
      <lineSegments ref={linesSegmentsRef} />
    </EffectComposer>
  );
};
