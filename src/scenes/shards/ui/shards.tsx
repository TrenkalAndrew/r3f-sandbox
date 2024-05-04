import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Shard } from "./shard";
import { PageNotFoundInfo } from "./page-not-found-info";

export const Shards = () => {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/models/shards.glb");

  return (
    <group scale={Math.max(viewport.width, viewport.height) / 3.5}>
      <PageNotFoundInfo />
      {nodes.Scene.children.map((mesh, i) => (
        <Shard key={i} data={mesh} />
      ))}
    </group>
  );
};
