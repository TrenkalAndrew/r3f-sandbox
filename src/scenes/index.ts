import { ShardsScene } from "./shards";
import { ImagesTransitionScene } from "./images-transition";
import { RobotAnimationScene } from "./robot-animation";
import { TransmittedTorusScene } from "./transmitted-torus";

export const scenes = [
  {
    name: "shards",
    component: ShardsScene,
  },
  {
    name: "transmitted-torus",
    component: TransmittedTorusScene,
  },
  {
    name: "images-transition",
    component: ImagesTransitionScene,
  },
  {
    name: "robot-animation",
    component: RobotAnimationScene,
  },
];
