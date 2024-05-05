import { useEffect, useCallback } from "react";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { useMotionValue, useSpring } from "framer-motion";

import { FloatingShapes } from "./floating-shapes";
import { CANVAS_BACKGROUND_COLOR, SPRING_ANIMATION_CONFIG } from "./constants";

const StyledCanvas = styled(Canvas)`
  background-color: ${CANVAS_BACKGROUND_COLOR};
`;

export const Scene = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, SPRING_ANIMATION_CONFIG);
  const smoothY = useSpring(y, SPRING_ANIMATION_CONFIG);

  const mouseCoordinates = {
    x: smoothX,
    y: smoothY,
  };

  const handleMouseMove = useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      mouseCoordinates.x.set(clientX / window.innerWidth);
      mouseCoordinates.y.set(clientY / window.innerHeight);
    },
    [mouseCoordinates.x, mouseCoordinates.y]
  );

  console.log({ mouseCoordinates: mouseCoordinates.x });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <StyledCanvas orthographic camera={{ position: [0, 0, 200], zoom: 8 }}>
      <FloatingShapes mouseCoordinates={mouseCoordinates} />
      <Environment preset="studio" />
    </StyledCanvas>
  );
};
