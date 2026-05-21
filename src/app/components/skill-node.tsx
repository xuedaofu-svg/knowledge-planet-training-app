import { Lock, Check, LucideIcon, Star, Crown } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SkillNodeProps {
  id: string;
  title: string;
  Icon: LucideIcon;
  status: "locked" | "current" | "completed";
  level?: number;
  maxLevel?: number;
  side: "left" | "center" | "right";
  illustration?: string;
  illustrationSide?: "left" | "right";
  stars?: number;
  maxStars?: number;
  isBonus?: boolean;
  isLegendary?: boolean;
  themeColor?: string;
  onShowOptions?: () => void;
}

export function SkillNode({
  id,
  title,
  Icon,
  status,
  level = 0,
  maxLevel = 5,
  side,
  illustration,
  illustrationSide,
  stars,
  maxStars = 3,
  isBonus = false,
  isLegendary = false,
  themeColor = "orange",
  onShowOptions,
}: SkillNodeProps) {
  const navigate = useNavigate();
  const isLocked = status === "locked";
  const isCurrent = status === "current";
  const isCompleted = status === "completed";

  const sideClasses = {
    left: "-translate-x-16",
    center: "",
    right: "translate-x-16",
  };

  const colors = {
    orange: {
      bg: "bg-orange-500",
      border: "border-orange-700",
      ring: "ring-orange-100/50",
      strokeCurrent: "#FF8C00",
      strokeCompleted: "#FFFFFF",
      strokeBgCurrent: "#FED7AA",
      strokeBgCompleted: "#FDBA74",
      text: "text-orange-500",
      badgeBg: "bg-orange-100",
      badgeBorder: "border-orange-400",
      badgeText: "text-orange-600",
      labelBg: "bg-orange-50",
      labelBorder: "border-orange-200",
      labelText: "text-orange-700"
    },
    green: {
      bg: "bg-teal-600",
      border: "border-teal-800",
      ring: "ring-teal-100/50",
      strokeCurrent: "#0D9488",
      strokeCompleted: "#FFFFFF",
      strokeBgCurrent: "#CCFBF1",
      strokeBgCompleted: "#99F6E4",
      text: "text-teal-600",
      badgeBg: "bg-teal-100",
      badgeBorder: "border-teal-500",
      badgeText: "text-teal-700",
      labelBg: "bg-teal-50",
      labelBorder: "border-teal-200",
      labelText: "text-teal-700"
    },
    blue: {
      bg: "bg-blue-500",
      border: "border-blue-700",
      ring: "ring-blue-100/50",
      strokeCurrent: "#2563EB",
      strokeCompleted: "#FFFFFF",
      strokeBgCurrent: "#DBEAFE",
      strokeBgCompleted: "#BFDBFE",
      text: "text-blue-500",
      badgeBg: "bg-blue-100",
      badgeBorder: "border-blue-400",
      badgeText: "text-blue-600",
      labelBg: "bg-blue-50",
      labelBorder: "border-blue-200",
      labelText: "text-blue-700"
    }
  };

  // Gold theme for legendary nodes
  const goldTheme = {
    bg: "bg-yellow-400",
    border: "border-yellow-600",
    ring: "ring-yellow-100/50",
    strokeCurrent: "#CA8A04",
    strokeCompleted: "#FFFFFF",
    strokeBgCurrent: "#FEF08A",
    strokeBgCompleted: "#FDE047",
    text: "text-yellow-500",
    badgeBg: "bg-yellow-100",
    badgeBorder: "border-yellow-500",
    badgeText: "text-yellow-700",
    labelBg: "bg-yellow-50",
    labelBorder: "border-yellow-300",
    labelText: "text-yellow-700"
  };

  const theme = isLegendary ? goldTheme : (colors[themeColor as keyof typeof colors] || colors.orange);

  const bonusClass = isBonus ? "scale-110" : sideClasses[side];

  const handleClick = () => {
    if (isLocked) return;
    // Completed non-legendary nodes open the options sheet
    if (isCompleted && !isLegendary && !isBonus && onShowOptions) {
      onShowOptions();
      return;
    }
    navigate(`/quiz/${isBonus ? `bonus-${id}` : id}`);
  };

  return (
    <div className={clsx(
      "flex flex-col items-center gap-2 relative z-10 transition-all",
      !isBonus && "my-10",
      bonusClass
    )}>
      {isBonus ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={clsx(
            "cursor-pointer relative",
            isLocked && !isBonus && "grayscale opacity-60",
            isLocked && "cursor-not-allowed"
          )}
        >
          <div className="w-44 h-44 md:w-56 md:h-56 relative">
            <ImageWithFallback
              src={illustration || ""}
              alt={title}
              className="w-[70%] h-[70%] object-contain mx-auto my-auto"
            />
            {stars !== undefined && (
              <div className={clsx(
                "absolute bottom-[32px] left-1/2 -translate-x-1/2 flex gap-0.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full border-2 shadow-lg",
                themeColor === "orange" ? "border-orange-100" :
                themeColor === "green" ? "border-teal-100" :
                "border-blue-100"
              )}>
                {[...Array(maxStars)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={clsx(
                      "stroke-[3px]",
                      i < stars
                        ? (themeColor === "orange" ? "fill-yellow-400 text-yellow-400" :
                           themeColor === "green" ? "fill-emerald-400 text-emerald-400" :
                           "fill-blue-400 text-blue-400")
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={clsx(
            "text-center relative z-10",
            title === "动力竞速" || title === "未来科技奖" ? "-mt-[52px]" : "-mt-[32px]"
          )}>
            <span className={clsx(
              "text-xs font-black px-2 py-0.5 rounded-full border uppercase tracking-tighter",
              theme.badgeText, theme.badgeBg, theme.badgeBorder
            )}>
              {title}
            </span>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.button
            whileTap={{ scale: 0.9, y: 4 }}
            onClick={handleClick}
            className={clsx(
              "relative w-24 h-24 rounded-full flex items-center justify-center transition-all group",
              "border-b-8 active:border-b-0 active:translate-y-1 z-10 p-2",
              isLocked
                ? "bg-gray-200 border-gray-400 cursor-not-allowed opacity-100"
                : isCurrent
                ? clsx("bg-white border-gray-300 shadow-lg ring-8", theme.ring)
                : isLegendary
                ? clsx(theme.bg, theme.border, "shadow-lg shadow-yellow-200/60")
                : clsx(theme.bg, theme.border, "shadow-md")
            )}
          >
            {/* Progress Ring removed */}

            <div className={clsx(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95",
              isLocked ? "text-gray-400" : isCurrent ? theme.text : "text-white"
            )}>
              {isLocked ? <Lock size={34} strokeWidth={2.5} /> : <Icon size={34} strokeWidth={2.5} />}
            </div>

            {/* Level / Status Badge */}
            {!isLocked && (
              <div className={clsx(
                "absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm z-20",
                theme.badgeBg, theme.badgeBorder
              )}>
                {isLegendary ? (
                  <Crown size={14} className={clsx("fill-current", theme.badgeText)} />
                ) : isCompleted ? (
                  <Check size={14} className={clsx("font-bold", theme.badgeText)} />
                ) : (
                  <span className={clsx("text-xs font-black", theme.badgeText)}>{level}/{maxLevel}</span>
                )}
              </div>
            )}
          </motion.button>

          <div className="flex flex-col items-center max-w-[100px] text-center">
            <span className={clsx(
              "text-xs font-black tracking-wide leading-tight px-3 py-1 rounded-xl shadow-sm border-2 transition-all",
              isLocked ? "bg-gray-100 text-gray-400 border-gray-200" :
              isCurrent ? clsx("bg-white text-gray-800 ring-4", theme.ring, theme.badgeBorder) :
              clsx(theme.labelBg, theme.labelText, theme.labelBorder)
            )}>
              {title}
            </span>
          </div>
        </>
      )}
    </div>
  );
}