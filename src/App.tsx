import { Routes, Route } from "react-router-dom";
import { public_route_group } from "./routes/publicRoutes";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
import Navbar from "./components/Navbar";
import PomodoroTimerProvider from "./contexts/PomodoroTimerContext";

function App() {
  const location = useLocation();
  return (
    <PomodoroTimerProvider>
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
    </PomodoroTimerProvider>
  );
}

export default App;
