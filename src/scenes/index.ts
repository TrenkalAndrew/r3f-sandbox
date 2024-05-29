import { ShardsScene } from "./shards";
import { ImagesTransitionScene } from "./images-transition";
import { TransmittedTorusScene } from "./transmitted-torus";
import { MusicVisualizerScene } from "./music-visualizer";
import { ShoeScene } from "./shoes";
export const scenes = [
  {
    name: "shoes",
    component: ShoeScene,
  },
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
];
