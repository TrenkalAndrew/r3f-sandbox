import { styled } from "styled-components";

import { Scene } from "./Scene";

const Wrapper = styled.div({
  width: "100vw",
  height: "100vh",
});

function App() {
  return (
    <Wrapper>
      <Scene />
    </Wrapper>
  );
}

export default App;
