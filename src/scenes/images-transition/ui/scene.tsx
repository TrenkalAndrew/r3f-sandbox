import { extend, Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { AnimatedImages } from "./images-transition";
import { Suspense } from "react";

export const Scene = () => {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
      <PerspectiveCamera
        fov={75}
        near={0.1}
        far={100}
        aspect={window.innerWidth / window.innerHeight}
        position={[0, 0, 1]}
        makeDefault
      />
      <OrbitControls maxDistance={100} />
      <Suspense fallback="...loading">
        <AnimatedImages />
      </Suspense>
    </Canvas>
  );
};

extend({ Scene });
