import * as THREE from "three";

export type ImagePixel = { color: THREE.Color; id: number };

export type ImageInfo = {
  image: HTMLImageElement;
  rgb: ImagePixel[];
  texture: THREE.Texture;
};
