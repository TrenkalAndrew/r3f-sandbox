import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import styled from "styled-components";

import { TransmittedTorus } from "./transmitted-torus";

const StyledCanvas = styled(Canvas)`
  background-color: #000000;
`;

export const Scene = () => {
  return (
    <StyledCanvas>
      <directionalLight intensity={3} position={[0, 3, 8]} />
      <Environment preset="city" />
      <TransmittedTorus />
    </StyledCanvas>
  );
};
