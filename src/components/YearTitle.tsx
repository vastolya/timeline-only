import { forwardRef } from "react";
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
}

const YearTitle = forwardRef<HTMLDivElement, YearTextProps>(
  ({ color }, ref) => {
    return <YearText color={color} ref={ref}></YearText>;
  }
);

export default YearTitle;
