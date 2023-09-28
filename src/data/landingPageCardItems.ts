export type TLandingPageCardItems = {
  heading: string;
  desc: string;
  link: string;
};

export const landingPageCardItems: TLandingPageCardItems[] = [
  {
    heading: "Markdown",
    desc: "good for note-taking",
    link: "/markdown",
  },
  {
    heading: "Pomodoro Timer",
    desc: "focus using a tomato method",
    link: "/pomodoro-timer",
  },
  {
    heading: "Whiteboard",
    desc: "work together",
    link: "/whiteboard",
  },
  {
    heading: "To do list",
    desc: "get stuff done",
    link: "/todo-list",
  },
  {
    heading: "Kanban board",
    desc: "plan, start, progress, finish, organize.",
    link: "/kanban",
  },
  {
    heading: "Spaced repetition",
    desc: "remember forever",
    link: "/spaced-repetition",
  },
];
