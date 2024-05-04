import { Text } from "@react-three/drei";
import { ComponentProps } from "react";

type TextProps = ComponentProps<typeof Text>;

const defaultTextProps: Partial<TextProps> = {
  color: "white",
  anchorX: "center",
  anchorY: "middle",
};

export const PageNotFoundInfo = () => {
  const src = "/fonts/PPNeueMontreal-Regular.ttf";

  return (
    <group>
      <Text
        font={src}
        position={[0, 0, -0.1]}
        fontSize={0.4}
        {...defaultTextProps}
      >
        404
      </Text>
      <Text
        font={src}
        position={[0, -0.25, -0.1]}
        fontSize={0.05}
        {...defaultTextProps}
      >
        Page not found
      </Text>
    </group>
  );
};
