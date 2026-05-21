import { Signal, Wifi, BatteryMedium } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";

interface StatusBarProps {
  theme?: "light" | "dark";
}

export function StatusBar({ theme = "dark" }: StatusBarProps) {
  const isLight = theme === "light";

  return (
    <div className={clsx(
      "fixed top-0 left-0 right-0 z-[200] h-10 px-6 flex items-center justify-between pointer-events-none select-none",
      isLight ? "text-white" : "text-gray-900"
    )}>
      <div className="text-[12px] font-black tracking-tight">
        9:41
      </div>
      <div className="flex items-center gap-2">
        <Signal size={14} strokeWidth={3} />
        <Wifi size={14} strokeWidth={3} />
        <div className="flex items-center gap-1">
          <BatteryMedium size={18} strokeWidth={2.5} className="rotate-0" />
        </div>
      </div>
    </div>
  );
}