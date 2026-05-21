import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Practice } from "./pages/practice";
import { Streak } from "./pages/streak";
import { Profile } from "./pages/profile";
import { Quiz } from "./pages/quiz";
import { Leaderboard } from "./pages/leaderboard";
import { Courses } from "./pages/courses";
import { DailyPractice } from "./pages/daily-practice";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "daily", Component: DailyPractice },
      { path: "practice", Component: Practice },
      { path: "leaderboard", Component: Leaderboard },
      { path: "courses", Component: Courses },
      { path: "streak", Component: Streak },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/quiz/:id",
    Component: Quiz,
  },
]);