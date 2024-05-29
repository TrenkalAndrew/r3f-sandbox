import { ShardsScene } from "./shards";
import { ImagesTransitionScene } from "./images-transition";
import { TransmittedTorusScene } from "./transmitted-torus";
import { FloatingShapesScene } from "./floating-shapes";
import { MusicVisualizerScene } from "./music-visualizer";

export const scenes = [
  { name: "music-visualizer", component: MusicVisualizerScene },
  {
    name: "images-transition",
    component: ImagesTransitionScene,
  },
  {
    name: "shards",
    component: ShardsScene,
  },
  {
    name: "transmitted-torus",
    component: TransmittedTorusScene,
  },
  {
    name: "floating-shapes",
    component: FloatingShapesScene,
  },
];
