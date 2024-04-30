import { Suspense, createRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";
import { Group, MathUtils } from "three";

import { SPRING_ANIMATION_CONFIG } from "./constants";

const ref = createRef<Group>();

type TRobotProps = {
  position?: [number, number, number];
};

export const Robot = ({ position }: TRobotProps) => {
  const { animations, scene } = useGLTF("/models/robot.glb");
  const { actions } = useAnimations(animations, scene);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, SPRING_ANIMATION_CONFIG);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotateY(MathUtils.degToRad(0.02));
    }

    Object.values(actions).forEach((action) => {
      if (!action) {
        return;
      }

      action.play().paused = true;
      action.time = springValue.get();
    });
  });

  return (
    <Suspense fallback="...loading">
      <group
        ref={ref}
        position={position}
        onPointerDown={() => springValue.set(1)}
        onPointerUp={() => springValue.set(0)}
      >
        <primitive object={scene} />
      </group>
    </Suspense>
  );
};
