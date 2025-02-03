import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import CirclePoint from "./CirclePoint";
import YearTitle from "./YearTitle";
import { useTimeline } from "../context/TimelineContext";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: -2.875rem;
  margin-bottom: -3rem;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateY(-50%);
  }
`;

const CircleContainer = styled.div`
  position: relative;
  width: 33.125rem;
  height: 33.125rem;
  margin: auto;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.2);
  z-index: 9;
  rotate: 30deg;
`;

const CenterDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 973px;
  text-align: center;
  z-index: 5;

  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const RotatingCircle = ({
  points,
}: {
  points: {
    category: string;
    events: {
      year: number;
      description: string;
    }[];
  }[];
}) => {
  const [rotation, setRotation] = useState(30);
  const { activeIndex, setActiveIndex } = useTimeline();
  const circleRef = useRef<HTMLDivElement>(null);
  const firstYearRef = useRef<HTMLDivElement>(null);
  const lastYearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anglePerPoint = 360 / points.length;
    const targetRotation = -activeIndex * anglePerPoint + 30;

    let delta = ((targetRotation - rotation + 540) % 360) - 180;
    let finalRotation = rotation + delta;

    setRotation(finalRotation);

    gsap.to(circleRef.current, {
      rotation: finalRotation,
      duration: 1,
      ease: "expo.out",
    });

    if (firstYearRef.current && !firstYearRef.current.textContent) {
      firstYearRef.current.textContent = String(
        points[activeIndex].events[0].year
      );
    }

    if (lastYearRef.current && !lastYearRef.current.textContent) {
      lastYearRef.current.textContent = String(
        points[activeIndex].events[points[activeIndex].events.length - 1].year
      );
    }

    gsap.to(firstYearRef.current, {
      textContent: points[activeIndex].events[0].year,
      duration: 1,
      ease: "power2.out",
      snap: { textContent: 1 },
    });

    gsap.to(lastYearRef.current, {
      textContent:
        points[activeIndex].events[points[activeIndex].events.length - 1].year,
      duration: 1,
      ease: "power2.out",
      snap: { textContent: 1 },
    });
  }, [activeIndex]);

  const handleClick = (index: number) => {
    const anglePerPoint = 360 / points.length;
    const newRotation = -index * anglePerPoint + 30;
    let delta = ((newRotation - rotation + 540) % 360) - 180;
    let finalRotation = rotation + delta;
    setRotation(finalRotation);
    setActiveIndex(index);

    gsap.to(circleRef.current, {
      rotation: finalRotation,
      duration: 1,
      ease: "expo.out",
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

  return (
    <Container>
      <CircleContainer ref={circleRef}>
        {positions.map((position, index) => (
          <CirclePoint
            key={index}
            index={index}
            pos={position}
            $activeIndex={activeIndex}
            rotation={rotation}
            onRotate={handleClick}
          >
            <p>{index + 1}</p>
          </CirclePoint>
        ))}
      </CircleContainer>
      <CenterDisplay>
        {activeIndex !== null && (
          <>
            <YearTitle
              color={"rgba(56, 119, 238, 1)"}
              ref={firstYearRef}
            ></YearTitle>
            <YearTitle
              color={"rgba(239, 93, 168, 1)"}
              ref={lastYearRef}
            ></YearTitle>
          </>
        )}
      </CenterDisplay>
    </Container>
  );
};

const Circle = () => {
  const { timelinePoints } = useTimeline();
  return <RotatingCircle points={timelinePoints} />;
};

export default Circle;
