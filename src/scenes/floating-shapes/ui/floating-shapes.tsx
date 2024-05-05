import { FC } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { Object3D, Object3DEventMap } from "three";
import { motion } from "framer-motion-3d";

import { MotionValue, useTransform } from "framer-motion";

const modelPath = "/models/floating-shapes.glb";

useGLTF.preload(modelPath);

type MouseCoordinates = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

type FloatingShapesProps = {
  mouseCoordinates: MouseCoordinates;
};

export const FloatingShapes: FC<FloatingShapesProps> = ({
  mouseCoordinates,
}) => {
  const { nodes } = useGLTF(modelPath);

  return (
    <group>
      <Shape
        data={nodes.Sphere001}
        multiplier={2.4}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Sphere002}
        multiplier={2.4}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Cylinder002}
        multiplier={1.2}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Sphere003}
        multiplier={1}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Cylinder003}
        multiplier={1.8}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Cylinder005}
        multiplier={1.8}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Cube002}
        multiplier={2}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Cylinder006}
        multiplier={1.2}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Cylinder007}
        multiplier={1.6}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Cylinder009}
        multiplier={1.8}
        mouseCoordinates={mouseCoordinates}
      />
      <Shape
        data={nodes.Sphere}
        multiplier={1.5}
        mouseCoordinates={mouseCoordinates}
      />
    </group>
  );
};

type ShapeProps = {
  data: Object3D<Object3DEventMap>;
  mouseCoordinates: MouseCoordinates;
  multiplier: number;
};

const Shape = ({ data, mouseCoordinates, multiplier }: ShapeProps) => {
  const { position, rotation } = data;

  const multiplierHalf = multiplier / 2;

  const rotationX = useTransform(
    mouseCoordinates.x,
    [0, 1],
    [rotation.x - multiplierHalf, rotation.x + multiplierHalf]
  );
  const rotationY = useTransform(
    mouseCoordinates.y,
    [0, 1],
    [rotation.y - multiplierHalf, rotation.y + multiplierHalf]
  );
  const positionX = useTransform(
    mouseCoordinates.x,
    [0, 1],
    [position.x - multiplier * 2, position.x + multiplier * 2]
  );
  const positionY = useTransform(
    mouseCoordinates.y,
    [0, 1],
    [position.y + multiplier * 2, position.y - multiplier * 2]
  );

  return (
    <Float>
      {/* @ts-expect-error prevent incompatible with framer-motion */}
      <motion.mesh
        {...data}
        rotation-x={rotationX}
        rotation-y={rotationY}
        position-x={positionX}
        position-y={positionY}
      />
    </Float>
  );
};
