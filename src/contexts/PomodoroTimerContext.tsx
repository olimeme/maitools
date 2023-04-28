import React from "react";
import { createContext } from "react";
import { PomodoroTimerHookType } from "../types/PomodoroTimerHookType";
import { useTimer } from "../hooks/useTimer";

type Props = { children: React.ReactNode[] | React.ReactNode };

export const PomodoroTimerContext = createContext<PomodoroTimerHookType>(
  {} as PomodoroTimerHookType
);
const PomodoroTimerProvider = ({ children }: Props) => {
  const pomodoroTimerHook = useTimer();

  return (
    <PomodoroTimerContext.Provider value={pomodoroTimerHook}>
      {children}
    </PomodoroTimerContext.Provider>
  );
};

export default PomodoroTimerProvider;
