import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import {
  public_route_group,
  public_route_group_without_navbar,
} from "./routes/publicRoutes";
import WithoutNavbarRoutes from "./routes/withoutNavbarRoutes";
import WithNavbarRoutes from "./routes/withNavbarRoutes";

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
