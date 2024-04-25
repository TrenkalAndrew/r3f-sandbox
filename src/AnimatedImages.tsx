import { useMemo } from "react";
import * as THREE from "three";
import { imageUris } from "./constants";
import { useGeometryAttributes, useLoadImages } from "./hooks";
import { getImagesInfo } from "./utils";
import { shader } from "./shader";

export const AnimatedImages = () => {
  const images = useLoadImages(imageUris);
  const [sourceImageInfo, destinationImageInfo] = useMemo(
    () => getImagesInfo(images),
    [images]
  );

  const { positions, destination, source } = useGeometryAttributes(
    sourceImageInfo,
    destinationImageInfo
  );

  console.log({
    positions: positions.length,
    destination: destination.length,
    source: source.length,
  });

  if (!positions.length || !destination.length || !source.length) {
    return null;
  }

  return (
    <points>
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
