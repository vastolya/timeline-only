import React from "react";
import { styled, createGlobalStyle } from "styled-components";
import Slider from "./components/Slider";
import Header from "./components/Header";
import Circle from "./components/Circle";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: rgba(244, 245, 249, 1);

  },
  h1 {
    margin: 0;
    padding: 0;
  }
  h2 {
    margin: 0;
    padding: 0;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const Box = styled.div`
  width: 90rem;
  min-height: 100vh;
  max-height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  margin: auto;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 100%;
    transform: translateX(-50%);
  }
`;

const EmptyDiv = styled.div`
  height: 10.625rem;
`;

const App: React.FC = () => {
  return (
    <Box>
      <GlobalStyle />
      <EmptyDiv />
      <Header />
      <Circle />
      <Slider />
    </Box>
  );
};

export default App;
