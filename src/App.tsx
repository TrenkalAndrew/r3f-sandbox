import React, { useCallback, useState } from "react";
import { styled } from "styled-components";

import { scenes } from "./scenes";

const Wrapper = styled.div({
  width: "100vw",
  height: "100vh",
});

const SceneSwitcher = styled.select({
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 10,
});

function App() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const Scene = scenes[activeSceneIndex].component;

  const handleSceneChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveSceneIndex(Number(e.target.value));
    },
    []
  );

  return (
    <Wrapper>
      <SceneSwitcher onChange={handleSceneChange}>
        {scenes.map(({ name }, index) => (
          <option key={name} value={index}>
            {name}
          </option>
        ))}
      </SceneSwitcher>
      <Scene />
    </Wrapper>
  );
}

export default App;
