import React from "react";
import { styled, createGlobalStyle } from "styled-components";
import Slider from "./components/Slider";
import Header from "./components/Header";
import AnimatedCircle from "./components/AnimatedCircle";

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

const CrossedBox = styled.div`
  position: relative;
  width: 90rem;
  height: 67.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: auto;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::before {
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    transform: translateY(-50%);
  }

  &::after {
    top: 0;
    left: 50%;
    height: 100%;
    width: 1px;
    transform: translateX(-50%);
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <CrossedBox>
        <Header />
        <AnimatedCircle />
        <Slider />
      </CrossedBox>
    </>
  );
};

export default App;
