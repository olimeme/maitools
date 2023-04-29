import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { public_route_group } from "./routes/publicRoutes";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
import Navbar from "./components/Navbar";
import PomodoroTimerProvider, {
  PomodoroTimerContext,
} from "./contexts/PomodoroTimerContext";
import useAudioPlayer from "./hooks/useAudioPlayer";
import breakTimeAudio from "./assets/audio/breakTime.mp3";

function App() {
  const location = useLocation();
  const {
    data: { isActive, isWorking },
  } = useContext(PomodoroTimerContext);

  const { repeatAudio: repeatAudioBreakTime } = useAudioPlayer({
    src: breakTimeAudio,
    loop: false,
  });
  useEffect(() => {
    if (isActive) repeatAudioBreakTime(4);
  }, [isWorking]);

  return (
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
  );
}

export default App;
