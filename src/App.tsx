import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import {
  public_route_group,
  public_route_group_without_navbar,
} from "./routes/publicRoutes";
import WithNavbarRoutes from "./routes/WithNavbarRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
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
    </div>
  );
}

export default App;
