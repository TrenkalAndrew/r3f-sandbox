import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { Object3D, Object3DEventMap } from "three";

type ShardProps = {
  data: Object3D<Object3DEventMap>;
};

export const Shard = ({ data }: ShardProps) => {
  const materialProps = useControls({
    thickness: { value: 0.275, min: 0, max: 1, step: 0.01 },
    ior: { value: 0.4, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.85, min: 0, max: 1 },
    resolution: { value: 300 },
  });

  return (
    <Float>
      <mesh {...data}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </Float>
  );
};
