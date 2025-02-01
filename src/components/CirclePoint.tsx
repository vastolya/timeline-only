import React from "react";
import styled from "styled-components";

interface PointProps {
  $isActive: boolean;
  rotation: number;
}

const Point = styled.div<PointProps>`
  position: absolute;
  width: ${(props) => (props.$isActive ? "3.5rem" : "0.375rem")};
  height: ${(props) => (props.$isActive ? "3.5rem" : "0.375rem")};
  border: 1px solid rgba(48, 62, 88, 0.5);
  background-color: ${(props) => (props.$isActive ? "white" : "#42567A")};
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, background-color 0.1s ease,
    font-size 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$isActive ? " 1.25rem" : "0px")};
  color: black;
  z-index: 10;

  &:hover {
    width: 3.5rem;
    height: 3.5rem;
    background-color: white;
    font-size: 1.25rem;
    transform: translate(-50%, -50%);
  }
  p {
    font-family: PT Sans;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.875rem;
    text-align: center;
    color: rgba(66, 86, 122, 1);
    opacity: ${(props) => (props.$isActive ? "1" : "0")};
    transition: opacity 0.2s ease, transform 0.3s ease, rotate 0.1s ease;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(${(props) => -props.rotation}deg);
  }

  &:hover p {
    opacity: 1;
  }
`;

function cirlcePoint({ index, pos, $activeIndex, rotation, onRotate }: any) {
  return (
    <Point
      key={index}
      style={{
        top: pos.y,
        left: pos.x,
      }}
      $isActive={index === $activeIndex}
      rotation={rotation}
      onClick={() => onRotate(index)}
    >
      <p>{index + 1}</p>
    </Point>
  );
}

export default cirlcePoint;
