import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { createRef } from "react";
import { Mesh } from "three";

const ref = createRef<Mesh>();

export const TransmittedTorus = () => {
  const { viewport } = useThree();

  const materialProps = useControls({
    thickness: { value: 0.85, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 0.9, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.3, min: 0, max: 1 },
    backside: { value: true },
  });

  useFrame(() => {
    const { current } = ref;
    if (!current) {
      return;
    }
    current.rotation.x += 0.02;
  });

  return (
    <group scale={Math.max(viewport.width, viewport.height) / 3.5}>
      <Text position={[0, 0, -0.75]} fontSize={0.375}>
        HELLO WORLD!
      </Text>
      <mesh ref={ref} position={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.14, 32, 64]} />
        <MeshTransmissionMaterial {...materialProps} color="#ffffff" />
      </mesh>
    </group>
  );
};
