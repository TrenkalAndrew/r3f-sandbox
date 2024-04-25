import * as THREE from "three";

import { ImagePixel } from "./three";
import { ImageInfo } from "./types";

export const loadImages = async (uris: string[]) => {
  return Promise.all(
    uris.map(
      (uri) =>
        new Promise<HTMLImageElement>((resolve) => {
          const image = new Image();
          image.src = uri;

          image.onload = () => {
            resolve(image);
          };
        })
    )
  );
};

export const getPositionsForImage = ({
  pixels,
  verticesAmount,
  imageHeight,
  imageWidth,
}: {
  pixels: ImagePixel[];
  verticesAmount: 3 | 2;
  imageWidth: number;
  imageHeight: number;
}) => {
  const positions = new Float32Array(imageWidth * imageHeight * verticesAmount);

  for (let i = 0; i < pixels.length; i++) {
    const xIndex = i * verticesAmount;
    const yIndex = i * verticesAmount + 1;
    const zIndex = i * verticesAmount + 2;

    const { id } = pixels[i];

    positions[xIndex] = id % imageWidth;
    positions[yIndex] = Math.floor(id / imageHeight);
    positions[zIndex] = 0;
  }

  return positions;
};

export const getImagePixelsInfo = (imageData: Uint8ClampedArray) => {
  const imagePixelsInfo: ImagePixel[] = [];

  const colorsVectorSize = 4;

  for (let i = 0; i < imageData.length; i += colorsVectorSize) {
    const color = new THREE.Color(
      imageData[i],
      imageData[i + 1],
      imageData[i + 2]
    );

    imagePixelsInfo.push({ color, id: i / colorsVectorSize });
  }

  return imagePixelsInfo;
};

export const getTextureFromImage = (image: HTMLImageElement) => {
  const texture = new THREE.Texture(image);
  texture.needsUpdate = true;

  return texture;
};

export const randomSortPixels = (pixels: ImagePixel[]) => {
  const hsl = { h: 0, l: 0, s: 0 };

  return [...pixels].sort(
    (a, b) => a.color.getHSL(hsl).s - b.color.getHSL(hsl).s
  );
};

export const getImagesInfo = (images: HTMLImageElement[]) => {
  const imagesInfo: ImageInfo[] = [];

  const canvas = document.createElement("canvas");

  images.forEach((image) => {
    const { width, height } = image;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(image, 0, 0, width, height);

    const { data } = context.getImageData(0, 0, width, height);

    const rgb = getImagePixelsInfo(data);

    const texture = getTextureFromImage(image);

    const sortedRgb = randomSortPixels(rgb);

    imagesInfo.push({
      image,
      rgb: sortedRgb,
      texture,
    });
  });

  return imagesInfo;
};
