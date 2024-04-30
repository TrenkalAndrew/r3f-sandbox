import { extend, Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Robot } from "./ui";

export const Scene = () => {
  return (
    <Canvas>
      <PerspectiveCamera
        fov={75}
        near={0.1}
        far={100}
        aspect={window.innerWidth / window.innerHeight}
        position={[-0.5, 1.5, 3]}
        makeDefault
      />
      <directionalLight position={[-5, -5, -5]} intensity={2} />
      <OrbitControls maxDistance={100} />
      <Robot position={[0, -0.5, 0]} />
    </Canvas>
  );
};

extend({ Scene });
