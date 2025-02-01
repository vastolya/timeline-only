import React, { createContext, useContext, useState, ReactNode } from "react";
import points from "../../public/data";

interface TimelineContextType {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  timelinePoints: {
    year: number;
    description: string;
  }[][];
  setTimelinePoint: React.Dispatch<
    React.SetStateAction<
      {
        year: number;
        description: string;
      }[][]
    >
  >;
}

const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined
);

export const useTimeline = (): TimelineContextType => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("no context");
  }
  return context;
};

interface TimelineProviderProps {
  children: ReactNode;
}

export const TimelineProvider: React.FC<TimelineProviderProps> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timelinePoints, setTimelinePoint] = useState(points);

  return (
    <TimelineContext.Provider
      value={{ activeIndex, setActiveIndex, timelinePoints, setTimelinePoint }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export default TimelineProvider;
