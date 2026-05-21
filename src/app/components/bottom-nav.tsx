import { Link, useLocation } from "react-router";
import { Orbit, ClipboardCheck, User } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { useTheme } from "../contexts/theme-context";

const tabs = [
  { path: "/", icon: Orbit, label: "知识星球" },
  { path: "/daily", icon: ClipboardCheck, label: "每日一练" },
  { path: "/profile", icon: User, label: "我的" },
];

export function BottomNav() {
  const location = useLocation();
  const { theme, colors } = useTheme();

  return (
    <nav
      className={clsx(
        "h-20 bg-white border-t-2 flex items-center justify-around px-2 z-50 shrink-0",
        theme === "orange" ? "border-orange-100" : "border-teal-100"
      )}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className="flex flex-col items-center justify-center gap-1 w-full h-full transition-all relative overflow-hidden"
            style={{ color: isActive ? colors.primary : "#9CA3AF" }}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute top-0 w-12 h-1 rounded-b-full"
                style={{ backgroundColor: colors.primary }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div
              className={clsx(
                "p-2 rounded-2xl transition-all duration-300",
                isActive ? "scale-110" : "bg-transparent"
              )}
              style={{ backgroundColor: isActive ? colors.primaryLight : "transparent" }}
            >
              <tab.icon size={26} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={clsx(
              "text-xs font-bold tracking-wider uppercase",
              isActive ? "opacity-100" : "opacity-70"
            )}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}