import { useEffect, useMemo, useState } from "react";
import { getPositionsForImage, loadImages } from "./utils";
import { ImageInfo } from "./types";

export const useLoadImages = (uris: string[]) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const loadedImages = await loadImages(uris);

      setImages(loadedImages);
    };

    fetchImages();
  }, [uris]);

  return images;
};

export const useGeometryAttributes = (
  sourceImageInfo: ImageInfo,
  destinationImageInfo: ImageInfo
) => {
  return useMemo(() => {
    if (!sourceImageInfo || !destinationImageInfo) {
      return {
        positions: new Float32Array(),
        source: new Float32Array(),
        destination: new Float32Array(),
      };
    }
    const { image, rgb } = sourceImageInfo;
    const { image: destinationImage, rgb: destinationRgb } =
      destinationImageInfo;
    const { width, height } = image;

    const positions = new Float32Array(width * height * 3);

    let indexPositions = 0;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        positions[indexPositions * 3] = j;
        positions[indexPositions * 3 + 1] = i;
        positions[indexPositions * 3 + 2] = 0;
        indexPositions++;
      }
    }

    const source = getPositionsForImage({
      imageWidth: width,
      imageHeight: height,
      pixels: rgb,
      verticesAmount: 2,
    });

    const destination = getPositionsForImage({
      imageWidth: destinationImage.width,
      imageHeight: destinationImage.height,
      pixels: destinationRgb,
      verticesAmount: 2,
    });

    return { positions, source, destination };
  }, [sourceImageInfo, destinationImageInfo]);
};
