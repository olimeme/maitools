import KanbanBoardPage from "../pages/KanbanBoardPage";
import LandingPage from "../pages/LandingPage";
import MarkdownPage from "../pages/MarkdownPage";
import PomodoroTimerPage from "../pages/PomodoroTimerPage";
import WhiteboardPage from "../pages/WhiteboardPage";
import ComingSoonPage from "../pages/ComingSoonPage";
import TodoListPage from "../pages/TodoListPage";
import SpacedRepPage from "../pages/SpacedRepPage";
import DeckPage from "../components/SpacedRep/DeckPage";

export const public_route_group = [
  { path: "/markdown", element: <MarkdownPage /> },
  { path: "/pomodoro-timer", element: <PomodoroTimerPage /> },
  { path: "/whiteboard", element: <ComingSoonPage /> },
  { path: "/todo-list", element: <TodoListPage /> },
  { path: "/kanban", element: <KanbanBoardPage /> },
  { path: "/spaced-repetition", element: <SpacedRepPage /> },
  { path: "/spaced-repetition/:id", element: <DeckPage /> },
  { path: "/", element: <LandingPage /> },
];

export const public_route_group_without_navbar = [];

export const routes = [
  ...public_route_group,
  ...public_route_group_without_navbar,
];
