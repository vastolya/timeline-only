import React from "react";
import styled from "styled-components";

const YearText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: PT Sans;
  font-size: 12.5rem;
  font-weight: 700;
  line-height: 10rem;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
`;

interface YearTextProps {
  color: string;
  children: React.ReactNode;
}

function YearTitle({ color, children }: YearTextProps) {
  return <YearText color={color}>{children}</YearText>;
}

export default YearTitle;
