import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const points = [
  [
    { year: 1987, description: "Первое событие 1987" },
    { year: 1988, description: "Второе событие 1988" },
    { year: 1989, description: "Третье событие 1989" },
    { year: 1990, description: "Четвёртое событие 1990" },
    { year: 1991, description: "Пятое событие 1991" },
    { year: 1992, description: "Шестое событие 1992" },
  ],
  [
    { year: 1993, description: "Первое событие 1993" },
    { year: 1994, description: "Второе событие 1994" },
    { year: 1995, description: "Третье событие 1995" },
    { year: 1996, description: "Четвёртое событие 1996" },
    { year: 1997, description: "Пятое событие 1997" },
    { year: 1998, description: "Шестое событие 1998" },
  ],
  [
    { year: 1999, description: "Первое событие 1999" },
    { year: 2000, description: "Второе событие 2000" },
    { year: 2001, description: "Третье событие 2001" },
    { year: 2002, description: "Четвёртое событие 2002" },
    { year: 2003, description: "Пятое событие 2003" },
    { year: 2004, description: "Шестое событие 2004" },
  ],
  [
    { year: 1987, description: "Первое событие 1987" },
    { year: 1988, description: "Второе событие 1988" },
    { year: 1989, description: "Третье событие 1989" },
    { year: 1990, description: "Четвёртое событие 1990" },
    { year: 1991, description: "Пятое событие 1991" },
    { year: 1992, description: "Шестое событие 1992" },
  ],
  [
    { year: 1993, description: "Первое событие 1993" },
    { year: 1994, description: "Второе событие 1994" },
    { year: 1995, description: "Третье событие 1995" },
    { year: 1996, description: "Четвёртое событие 1996" },
    { year: 1997, description: "Пятое событие 1997" },
    { year: 1998, description: "Шестое событие 1998" },
  ],
  [
    { year: 1999, description: "Первое событие 1999" },
    { year: 2000, description: "Второе событие 2000" },
    { year: 2001, description: "Третье событие 2001" },
    { year: 2002, description: "Четвёртое событие 2002" },
    { year: 2003, description: "Пятое событие 2003" },
    { year: 2004, description: "Шестое событие 2004" },
  ],
];

interface PointProps {
  isActive: boolean;
  rotation: number;
}

const Container = styled.div`
  position: relative;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 33.125rem;
  height: 33.125rem;
  margin: -2rem auto;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.2);
  z-index: 9;
`;

const Point = styled.div<PointProps>`
  position: absolute;
  width: ${(props) => (props.isActive ? "3.5rem" : "0.375rem")};
  height: ${(props) => (props.isActive ? "3.5rem" : "0.375rem")};
  border: 1px solid rgba(48, 62, 88, 0.5);
  background-color: ${(props) => (props.isActive ? "white" : "#42567A")};
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, background-color 0.1s ease,
    font-size 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.isActive ? " 1.25rem" : "0px")};
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
    opacity: ${(props) => (props.isActive ? "1" : "0")};
    transition: opacity 0.2s ease, transform 1s ease;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(${(props) => -props.rotation}deg);
  }

  &:hover p {
    opacity: 1;
  }
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

const YearText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: PT Sans;
  font-size: 200px;
  font-weight: 700;
  line-height: 160px;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
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
  points: { year: number; description: string }[][];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(30);
  const circleRef = useRef<HTMLDivElement>(null);

  console.log("rotation", rotation); // 15 times ?!?

  const [displayedFirstYear, setDisplayedFirstYear] = useState(
    points[0][0].year
  );
  const [displayedLastYear, setDisplayedLastYear] = useState(
    points[0][points[0].length - 1].year
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

    animateYear(displayedFirstYear, points[0][0].year, setDisplayedFirstYear);
    animateYear(
      displayedLastYear,
      points[0][points[0].length - 1].year,
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
      },
      onComplete: () => {
        setActiveIndex(index);
      },
    });

    if (activeIndex !== index) {
      animateYear(
        displayedFirstYear,
        points[index][0].year,
        setDisplayedFirstYear
      );
      animateYear(
        displayedLastYear,
        points[index][points[index].length - 1].year,
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
        {positions.map((pos, index) => (
          <Point
            key={index}
            style={{
              top: pos.y,
              left: pos.x,
            }}
            isActive={index === activeIndex}
            rotation={rotation} // Передаём угол поворота в пропсы
            onClick={() => handleClick(index)}
          >
            <p>{index + 1}</p>
          </Point>
        ))}
      </CircleContainer>
      <CenterDisplay>
        {activeIndex !== null && (
          <>
            <YearText color="#1E90FF">{displayedFirstYear}</YearText>
            <YearText color="#FF4081">{displayedLastYear}</YearText>
          </>
        )}
      </CenterDisplay>
    </Container>
  );
};

const AnimatedCircle = () => {
  return <RotatingCircle points={points} />;
};

export default AnimatedCircle;
