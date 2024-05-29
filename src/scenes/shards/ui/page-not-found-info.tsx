import { Text } from "@react-three/drei";
import { ComponentProps } from "react";

import font from '@assets/fonts/PPNeueMontreal-Regular.ttf?url';

type TextProps = ComponentProps<typeof Text>;

const defaultTextProps: Partial<TextProps> = {
  color: "white",
  anchorX: "center",
  anchorY: "middle",
};

export const PageNotFoundInfo = () => {
  return (
    <group>
      <Text
        font={font}
        position={[0, 0, -0.1]}
        fontSize={0.4}
        {...defaultTextProps}
      >
        404
      </Text>
      <Text
        font={font}
        position={[0, -0.25, -0.1]}
        fontSize={0.05}
        {...defaultTextProps}
      >
        Page not found
      </Text>
    </group>
  );
};
