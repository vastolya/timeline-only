import React from "react";
import { styled, createGlobalStyle } from "styled-components";
import Slider from "../components/Slider";
import Header from "../components/Header";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
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
    transform: translateY(-50%); /* выравнивание по вертикали */
  }

  &::after {
    top: 0;
    left: 50%;
    height: 100%;
    width: 1px;
    transform: translateX(-50%); /* выравнивание по горизонтали */
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <CrossedBox>
        <Header />
        <Slider />
      </CrossedBox>
    </>
  );
};

export default App;
