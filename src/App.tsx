import { Routes, Route } from "react-router-dom";
import {
  public_route_group,
  public_route_group_without_navbar,
} from "./routes/publicRoutes";
import WithNavbarRoutes from "./routes/WithNavbarRoutes";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* <Route element={<WithoutNavbarRoutes />}>
          {public_route_group_without_navbar.map((route, idx) => (
            <Route key={idx} {...route} />
          ))}
        </Route> */}
          <Route element={<WithNavbarRoutes />}>
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
