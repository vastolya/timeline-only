import React from "react";
import { styled, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  },
  h1 {
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

const Title = styled.h1`
  font-size: 3.625rem;
  line-height: 4.25rem;
  font-family: "PT Sans", serif, bold;
   font-weight: bold;
  color: #42567a;
  width: 23rem;
  height 7.5rem: 
`;

const TitleWrapper = styled.div`
  position: relative;
  font-size: 3.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-left: 4.875rem;
  margin-top: 10.625rem;

  &::before {
    content: "";
    position: absolute;
    left: -4.875rem;
    height: 100%;
    width: 10px;
    background: linear-gradient(to top, #4a69bd, #f6a6b1);
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <CrossedBox>
        <TitleWrapper>
          <Title>Исторические даты</Title>
        </TitleWrapper>

        <div>Circle</div>
        <div>Slider</div>
      </CrossedBox>
    </>
  );
};

export default App;
