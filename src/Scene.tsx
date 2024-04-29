import { extend, Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { AnimatedImages } from "./AnimatedImages";

export const Scene = () => {
  return (
    <Canvas>
      <PerspectiveCamera
        fov={75}
        near={0.1}
        far={100}
        aspect={window.innerWidth / window.innerHeight}
        position={[0, 0, 1]}
        makeDefault
      />
      <OrbitControls maxDistance={100} />
      <AnimatedImages />
    </Canvas>
  );
};

extend({ Scene });
