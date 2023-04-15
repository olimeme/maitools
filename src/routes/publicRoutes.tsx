import LandingPage from "../pages/LandingPage";
import MarkdownPage from "../pages/MarkdownPage";
import PomodoroTimerPage from "../pages/PomodoroTimerPage";
import WhiteboardPage from "../pages/WhiteboardPage";

export const public_route_group = [
  { path: "/markdown", element: <MarkdownPage /> },
  { path: "/pomodoro-timer", element: <PomodoroTimerPage /> },
  { path: "/whiteboard", element: <WhiteboardPage /> },
  { path: "/todo-list", element: <WhiteboardPage /> },
  { path: "/", element: <LandingPage /> },
];

export const public_route_group_without_navbar = [];

export const routes = [
  ...public_route_group,
  ...public_route_group_without_navbar,
];
