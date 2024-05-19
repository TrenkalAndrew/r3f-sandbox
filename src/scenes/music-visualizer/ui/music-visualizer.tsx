import { useFrame } from "@react-three/fiber";
import { createRef, useEffect } from "react";
import { LineSegments, ShaderMaterial, SphereGeometry } from "three";

import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";

import { SPHERE_SEGMENTS_AMOUNT, WIREFRAME_SCALE_DELTA } from "./constants";

const materialRef = createRef<ShaderMaterial>();
const geometryRef = createRef<SphereGeometry>();
const linesSegments = createRef<LineSegments>();

export const MusicVisualizer = () => {
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    if (materialRef.current && geometryRef.current && linesSegments.current) {
      linesSegments.current.geometry = geometryRef.current;
      linesSegments.current.material = materialRef.current;
      linesSegments.current.scale.setScalar(1 + WIREFRAME_SCALE_DELTA);
    }
  }, []);

  return (
    <>
      <mesh>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{
            uTime: { value: 100 },
            // iResolution: { value: 100 },
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
