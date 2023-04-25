import { Routes, Route } from "react-router-dom";
import {
  public_route_group,
  public_route_group_without_navbar,
} from "./routes/publicRoutes";
import WithNavbarRoutes from "./routes/WithNavbarRoutes";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
import Navbar from "./components/Navbar";
import { useTimer } from "./hooks/useTimer";
import { createContext } from "react";

export type PomodoroTimerHook = ReturnType<typeof useTimer>;

export const PomodoroTimerContext = createContext<PomodoroTimerHook>(
  {} as PomodoroTimerHook
);

function App() {
  const location = useLocation();
  const pomodoroTimerHook = useTimer();
  return (
    <PomodoroTimerContext.Provider value={pomodoroTimerHook}>
      <div className="App">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route>
              {public_route_group.map((route, idx) => (
                <Route key={idx} {...route} />
              ))}
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </PomodoroTimerContext.Provider>
  );
}

export default App;
