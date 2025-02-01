import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import CirclePoint from "./CirclePoint";
import YearTitle from "./YearTitle";
import { useTimeline } from "./TimelineContext";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: -2.875rem;

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

const animateYear = (
  from: number,
  to: number,
  setter: React.Dispatch<React.SetStateAction<number>>
) => {
  gsap.to(
    { value: from },
    {
      value: to,
      duration: 1, // Время анимации
      roundProps: "value", // Округление значений (чтобы не было дробных чисел)
      ease: "power2.out",
      onUpdate: function () {
        setter(Math.round(this.targets()[0].value)); // Обновляем состояние числа
      },
    }
  );
};

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
  const { activeIndex, setActiveIndex } = useTimeline();
  const [rotation, setRotation] = useState(30);
  const circleRef = useRef<HTMLDivElement>(null);

  const [displayedFirstYear, setDisplayedFirstYear] = useState(
    points[activeIndex].events[0].year
  );
  const [displayedLastYear, setDisplayedLastYear] = useState(
    points[activeIndex].events[points[activeIndex].events.length - 1].year
  );

  useEffect(() => {
    const initialRotation = 30;

    gsap.to(circleRef.current, {
      rotation: initialRotation,
      duration: 1,
      ease: "expo.out",
      onUpdate: () => {
        setRotation(initialRotation);
      },
    });

    animateYear(
      displayedFirstYear,
      points[activeIndex].events[0].year,
      setDisplayedFirstYear
    );
    animateYear(
      displayedLastYear,
      points[activeIndex].events[points[activeIndex].events.length - 1].year,
      setDisplayedLastYear
    );
  }, []);

  const handleClick = (index: number) => {
    const anglePerPoint = 360 / points.length;
    const newRotation = -index * anglePerPoint + 30;

    let delta = ((newRotation - rotation + 540) % 360) - 180;
    let shortestRotation = rotation + delta;

    gsap.to(circleRef.current, {
      rotation: shortestRotation,
      duration: 1,
      ease: "expo.out",
      onUpdate: function () {
        setRotation(shortestRotation);
        setActiveIndex(index);
      },
      onComplete: () => {},
    });

    if (activeIndex !== index) {
      animateYear(
        displayedFirstYear,
        points[index].events[0].year,
        setDisplayedFirstYear
      );
      animateYear(
        displayedLastYear,
        points[index].events[points[index].events.length - 1].year,
        setDisplayedLastYear
      );
    }
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
            <YearTitle color={"#1E90FF"}>{displayedFirstYear}</YearTitle>
            <YearTitle color={"#FF4081"}>{displayedLastYear}</YearTitle>
          </>
        )}
      </CenterDisplay>
    </Container>
  );
};

const Circle = () => {
  const { timelinePoints, setTimelinePoint } = useTimeline();
  return <RotatingCircle points={timelinePoints} />;
};

export default Circle;
