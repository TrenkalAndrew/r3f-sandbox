import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { MusicVisualizer } from "./music-visualizer";
import { OrbitControls } from "@react-three/drei";

const StyledCanvas = styled(Canvas)`
  background-color: #ffffff;
`;

export const Scene = () => (
  <StyledCanvas camera={{ position: [0, 0, 2] }}>
    <directionalLight intensity={3} position={[0, 3, 8]} />
    <MusicVisualizer />
    <OrbitControls maxDistance={100} />
  </StyledCanvas>
);
