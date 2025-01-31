import React, { useState, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

interface PointProps {
  isActive: boolean;
}

const Container = styled.div`
  position: relative;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  margin: -2rem auto;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.2);
`;

const Point = styled.div<PointProps>`
  position: absolute;
  width: ${(props) => (props.isActive ? "56px" : "6px")};
  height: ${(props) => (props.isActive ? "56px" : "6px")};
  border: 1px solid rgba(48, 62, 88, 0.5);
  background-color: ${(props) => (props.isActive ? "white" : "#42567A")};
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%)
    rotate(${(props) => (props.isActive ? "-CURRENT_ROTATION_DEG" : "0deg")});
  transition: width 0.4s ease, height 0.4s ease, background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.isActive ? "14px" : "0px")};
  color: black;
`;

const Title = styled.h2`
  position: absolute;
  font-size: 16px;
  transform: translate(20px, -50%);
  opacity: 1;
  transition: opacity 0.4s ease;
`;

const RotatingCircle = ({ points }: { points: string[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    const anglePerPoint = 360 / points.length;
    const targetAngle = index * anglePerPoint;
    const newRotation = -targetAngle + 30; // Поворот на 2 часа

    gsap.to(circleRef.current, {
      rotation: newRotation,
      duration: 1,
      ease: "power3.out",
      onUpdate: function () {
        setRotation(newRotation);
      },
      onComplete: () => {
        setActiveIndex(index);
      },
    });
  };

  const calculatePositions = (count: number, radius = 265) => {
    const angleStep = (2 * Math.PI) / count;
    return Array.from({ length: count }).map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      return {
        x: Math.cos(angle) * radius + 265,
        y: Math.sin(angle) * radius + 265,
      };
    });
  };

  const positions = calculatePositions(points.length);

  const twoOClockPosition = {
    x: Math.cos(Math.PI / 3) * 265 + 265, // 30 градусов от вертикали
    y: Math.sin(Math.PI / 3) * 265 + 265,
  };

  return (
    <Container>
      <CircleContainer ref={circleRef}>
        {positions.map((pos, index) => (
          <Point
            key={index}
            style={{
              top: pos.y,
              left: pos.x,
              transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
            }}
            isActive={index === activeIndex}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </Point>
        ))}
      </CircleContainer>
    </Container>
  );
};

const AnimatedCircle = () => {
  const points = [
    "Наука",
    "Искусство",
    "Технологии",
    "История",
    "Музыка",
    "Видеоигры",
    "История",
    "Музыка",
  ];
  return <RotatingCircle points={points} />;
};

export default AnimatedCircle;
