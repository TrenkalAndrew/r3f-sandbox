import { useSnapshot } from "valtio";

import { styled } from "styled-components";
import { HexColorPicker } from "react-colorful";

import { State } from "../../types";

const Wrapper = styled.div`
  position: absolute;
  top: 50;
  right: 50;
  z-index: 1000;
`;

type PickerProps = {
  state: State;
};

export const Picker = ({ state }: PickerProps) => {
  const snap = useSnapshot(state);

  return (
    <Wrapper style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker
        className="picker"
        color={snap.items[snap.current]}
        onChange={(color) => {
          state.items[snap.current] = color;
        }}
      />
      <h1>{snap.current}</h1>
    </Wrapper>
  );
};
