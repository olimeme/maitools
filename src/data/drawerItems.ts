export type TDrawerItemType = {
  link: string;
  name: string;
};

export const drawerItems: TDrawerItemType[] = [
  {
    link: "/markdown",
    name: "Markdown",
  },
  {
    link: "/pomodoro-timer",
    name: "Pomodoro timer",
  },
  {
    link: "/whiteboard",
    name: "Whiteboard",
  },
  {
    link: "/todo-list",
    name: "To do list",
  },
  {
    link: "/kanban",
    name: "Kanban board",
  },
];
