import { createRef, useCallback, useMemo } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

import { ANIMATION_DURATION_MS, IMAGE_URIS } from "../constants";
import { useGeometryAttributes, useLoadImages } from "../lib/hooks";
import { getImagesInfo } from "../lib/utils";
import { shader } from "./shader";

const ref = createRef<THREE.ShaderMaterial>();

export const AnimatedImages = () => {
  useFrame(() => {
    TWEEN.update();
  });

  const images = useLoadImages(IMAGE_URIS);
  const [sourceImageInfo, destinationImageInfo] = useMemo(
    () => getImagesInfo(images),
    [images]
  );

  const { positions, destination, source } = useGeometryAttributes(
    sourceImageInfo,
    destinationImageInfo
  );

  const handleDoubleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    const { current } = ref;

    if (!current) {
      return;
    }

    e.stopPropagation();

    new TWEEN.Tween(current.uniforms.progress)
      .to(
        { value: current.uniforms.progress.value ? 0 : 1 },
        ANIMATION_DURATION_MS
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }, []);

  if (!positions.length || !destination.length || !source.length) {
    return null;
  }

  return (
    <points onDoubleClick={handleDoubleClick}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-source"
          count={source.length / 2}
          array={source}
          itemSize={2}
        />
        <bufferAttribute
          attach="attributes-destination"
          count={destination.length / 2}
          array={destination}
          itemSize={2}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={ref}
        attach="material"
        uniforms={{
          sourceTexture: {
            value: sourceImageInfo?.texture ?? new THREE.Texture(),
          },
          destinationTexture: {
            value: destinationImageInfo?.texture ?? new THREE.Texture(),
          },
          progress: { value: 0 },
          resolution: {
            value: new THREE.Vector2(
              sourceImageInfo?.image.width ?? 0,
              sourceImageInfo?.image.height ?? 0
            ),
          },
          devicePixelRatio: {
            value: window.devicePixelRatio,
          },
        }}
        {...shader}
      />
    </points>
  );
};
