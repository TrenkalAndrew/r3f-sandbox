import { Canvas } from "@react-three/fiber";
import { Shards } from "./shards";
import { Environment } from "@react-three/drei";
import styled from "styled-components";

const StyledCanvas = styled(Canvas)`
  background-color: #000000;
`;

export const Scene = () => {
  return (
    <StyledCanvas orthographic camera={{ position: [0, 0, 1], zoom: 800 }}>
      <Shards />
      <directionalLight intensity={3} position={[0, 0.1, 1]} />
      <Environment preset="city" />
    </StyledCanvas>
  );
};
