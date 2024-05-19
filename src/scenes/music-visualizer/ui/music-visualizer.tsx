import { useFrame } from "@react-three/fiber";
import { createRef } from "react";
import { ShaderMaterial } from "three";

import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";

const ref = createRef<ShaderMaterial>();

export const MusicVisualizer = () => {
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <shaderMaterial
        ref={ref}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTime: { value: 100 },
          // iResolution: { value: 100 },
        }}
      />
      <sphereGeometry />
    </mesh>
  );
};
