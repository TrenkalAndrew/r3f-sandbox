import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { proxy } from "valtio";

import { Shoes } from "./shoes";
import { Picker } from "./picker";
import { DEFAULT_COLOR } from "./constants";

const state = proxy({
  current: "",
  items: {
    laces: DEFAULT_COLOR,
    mesh: DEFAULT_COLOR,
    caps: DEFAULT_COLOR,
    inner: DEFAULT_COLOR,
    sole: DEFAULT_COLOR,
    stripes: DEFAULT_COLOR,
    band: DEFAULT_COLOR,
    patch: DEFAULT_COLOR,
  },
});

export const Scene = () => {
  return (
    <>
      <Picker state={state} />
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Shoes state={state} />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.25}
          scale={10}
          blur={1.5}
          far={0.8}
        />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </>
  );
};
