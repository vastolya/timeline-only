import React from "react";
import { styled, createGlobalStyle } from "styled-components";

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
    background: linear-gradient(to top, #f6a6b1, #4a69bd);
  }
`;

export default function Header() {
  return (
    <TitleWrapper>
      <Title>Исторические даты</Title>
    </TitleWrapper>
  );
}
