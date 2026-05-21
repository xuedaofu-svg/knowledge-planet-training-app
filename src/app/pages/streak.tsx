import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTheme } from "../contexts/theme-context";

const STREAK_IMAGE = "https://images.unsplash.com/photo-1644261766628-3af7203be678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMG9yYW5nZSUyMGZsYW1lJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3MzY1Njc5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const CALENDAR_DAYS = [
  { day: 23, month: "prev" }, { day: 24, month: "prev" }, { day: 25, month: "prev" }, { day: 26, month: "prev" }, { day: 27, month: "prev" }, { day: 28, month: "prev" }, { day: 1, month: "current" },
  { day: 2, month: "current" }, { day: 3, month: "current" }, { day: 4, month: "current" }, { day: 5, month: "current" }, { day: 6, month: "current" }, { day: 7, month: "current" }, { day: 8, month: "current" },
  { day: 9, month: "current" },
  { day: 10, month: "current", completed: true },
  { day: 11, month: "current", completed: true },
  { day: 12, month: "current", completed: true },
  { day: 13, month: "current", completed: true },
  { day: 14, month: "current", completed: true },
  { day: 15, month: "current", completed: true },
  { day: 16, month: "current", completed: true, today: true },
  { day: 17, month: "current" }, { day: 18, month: "current" }, { day: 19, month: "current" }, { day: 20, month: "current" }, { day: 21, month: "current" }, { day: 22, month: "current" },
  { day: 23, month: "current" }, { day: 24, month: "current" }, { day: 25, month: "current" }, { day: 26, month: "current" }, { day: 27, month: "current" }, { day: 28, month: "current" }, { day: 29, month: "current" },
  { day: 30, month: "current" }, { day: 31, month: "current" },
];

export function Streak() {
  const { theme, colors } = useTheme();

  const headerGradient = theme === "orange"
    ? "bg-gradient-to-b from-[#FF8C66] to-[#FF5E3A]"
    : "bg-gradient-to-b from-[#5EEAD4] to-[#14B8A6]";

  return (
    <div className="flex flex-col min-h-full bg-white pb-24">
      {/* Hero Streak Header - Restored Glowing Flame Effect */}
      <section
        className={clsx(
          "pt-24 pb-20 flex flex-col items-center justify-center gap-6 text-center relative overflow-hidden",
          headerGradient
        )}
      >
        {/* Glowing White Flame Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-32 h-32 flex items-center justify-center pointer-events-none z-10"
        >
          {/* Intense Glow Background */}
          <div className="absolute inset-0 bg-white/30 blur-[60px] rounded-full scale-150 animate-pulse" />
          <div
            className="absolute inset-0 blur-[40px] rounded-full scale-[2]"
            style={{
              backgroundColor: theme === "orange" ? "rgba(253, 186, 116, 0.2)" : "rgba(153, 246, 228, 0.2)"
            }}
          />

          <Flame size={96} className="text-white fill-white drop-shadow-[0_8px_30px_rgba(255,255,255,0.6)]" strokeWidth={1.5} />
        </motion.div>

        <div className="flex flex-col items-center leading-none z-10">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[100px] font-[1000] text-white tracking-tighter drop-shadow-lg"
          >
            7
          </motion.span>
          <span className="text-[20px] font-black text-white tracking-[0.25em] -mt-2 drop-shadow-md">天连胜</span>
        </div>

        {/* Decorative Floating Orbs */}
        <div className="absolute top-[-5%] left-[-10%] w-56 h-56 bg-white/10 rounded-full blur-[50px] pointer-events-none" />
        <div
          className="absolute bottom-[-15%] right-[-15%] w-72 h-72 rounded-full blur-[70px] pointer-events-none"
          style={{
            backgroundColor: theme === "orange" ? "rgba(254, 215, 170, 0.2)" : "rgba(204, 251, 241, 0.2)"
          }}
        />
      </section>

      {/* Spacing Adjustment after card removal */}
      <div className="h-4" />

      {/* Calendar View */}
      <section className="flex flex-col gap-6 px-6 pt-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[20px] font-black text-gray-800 tracking-tight">
             2026年3月
          </h3>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border-2 border-b-4 border-gray-100 text-gray-400 active:translate-y-0.5 active:border-b-2 transition-all">
               <ChevronLeft size={18} strokeWidth={3} />
            </button>
            <button className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border-2 border-b-4 border-gray-100 text-gray-400 active:translate-y-0.5 active:border-b-2 transition-all">
               <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-b-6 border-gray-100 grid grid-cols-7 gap-y-2 shadow-sm">
          {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
            <div key={day} className="text-center text-[10px] font-black text-gray-300 uppercase py-1">
              {day}
            </div>
          ))}
          {CALENDAR_DAYS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center relative py-0.5">
              <div
                className={clsx(
                  "w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-black transition-all relative",
                  item.month === "prev" ? "text-gray-100" : "text-gray-300",
                  item.completed && "text-white border-b-4 shadow-sm",
                  item.today && !item.completed && "border-2 ring-2",
                  item.today && item.completed && "ring-2 ring-blue-100 border-2 border-blue-500"
                )}
                style={
                  item.completed
                    ? {
                        backgroundColor: colors.primary,
                        borderColor: colors.primaryDark
                      }
                    : item.today
                    ? {
                        borderColor: colors.primary,
                        boxShadow: `0 0 0 2px ${colors.primaryLight}`
                      }
                    : {}
                }
              >
                {item.day}
                {item.completed && (
                  <div
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded flex items-center justify-center shadow-sm border"
                    style={{ borderColor: colors.primaryLight }}
                  >
                    <Flame size={8} style={{ color: colors.primary }} className="fill-current" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}