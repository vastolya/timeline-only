import React, { createContext, useContext, useState, ReactNode } from "react";
import data from "../../public/data";

interface TimelineContextType {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  timelinePoints: {
    category: string;
    events: {
      year: number;
      description: string;
    }[];
  }[];
  setTimelinePoint: React.Dispatch<
    React.SetStateAction<
      {
        category: string;
        events: {
          year: number;
          description: string;
        }[];
      }[]
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
  const [timelinePoints, setTimelinePoint] = useState(data);

  return (
    <TimelineContext.Provider
      value={{ activeIndex, setActiveIndex, timelinePoints, setTimelinePoint }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export default TimelineProvider;
