export type TLandingPageCardItems = {
  id: number;
  heading: string;
  desc: string;
  link: string;
};

export const landingPageCardItems: TLandingPageCardItems[] = [
  {
    id: 1,
    heading: "Markdown",
    desc: "good for note-taking",
    link: "/markdown",
  },
  {
    id: 2,
    heading: "Pomodoro Timer",
    desc: "focus using a tomato method",
    link: "/pomodoro-timer",
  },
  // {
  //   id: 3,
  //   heading: "Whiteboard",
  //   desc: "work together",
  //   link: "/whiteboard",
  // },
  {
    id: 3,
    heading: "To do list",
    desc: "get stuff done",
    link: "/todo-list",
  },
  {
    id: 4,
    heading: "Kanban board",
    desc: "plan, start, progress, finish, organize.",
    link: "/kanban",
  },
  {
    id: 5,
    heading: "Spaced repetition",
    desc: "remember forever",
    link: "/spaced-repetition",
  },
];
