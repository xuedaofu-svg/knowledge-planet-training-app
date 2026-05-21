import { PencilLine, BookText, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/theme-context";

export function DailyPractice() {
  const navigate = useNavigate();
  const { theme, colors } = useTheme();

  return (
    <div className="flex flex-col min-h-full bg-white pb-24">
      <header
        className={clsx(
          "px-6 pt-12 pb-6 bg-white border-b-4",
          theme === "orange" ? "border-orange-50" : "border-teal-50"
        )}
      >
        <h1 className="text-[20px] font-black text-gray-800 tracking-tight">每日一练</h1>
      </header>

      <main className="px-5 pt-8 flex flex-col gap-8">
        {/* Daily Practice Card */}
        <section className="flex flex-col gap-5">
          <div className="bg-white rounded-[2rem] p-6 border-2 border-dashed border-gray-200 shadow-sm flex flex-col items-center text-center gap-3 relative overflow-hidden group">
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: colors.primaryLight }}
            />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500"
              style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
            >
              <PencilLine size={28} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[16px] font-black text-gray-800">
                每日一练
              </h2>
              <p className="text-[16px] font-black text-gray-800 tracking-tight">5道题目 · 约5分钟</p>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">从已解锁关卡随机抽取</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/quiz/daily")}
            className="w-full h-14 rounded-2xl border-b-[6px] text-white font-black text-[16px] shadow-lg active:translate-y-1 active:border-b-2 transition-all"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.primaryDark
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            开始练习
          </button>
        </section>

        {/* Wrong Questions Section */}
        <section className="flex flex-col gap-5">
          <h3 className="text-[12px] font-black text-gray-400 px-2 tracking-tight uppercase">错题本</h3>

          <div
            onClick={() => navigate("/quiz/errors")}
            className="bg-white rounded-[2rem] p-6 border-2 border-dashed border-gray-200 shadow-sm flex items-center gap-4 group relative cursor-pointer hover:bg-gray-50/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">
              <BookText size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="text-[16px] font-black text-gray-800 flex items-center gap-2 mb-0.5">
                错题本
              </h4>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">共12题待复习</p>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
              <ArrowRight size={18} strokeWidth={3} />
            </div>
          </div>

          <button
            onClick={() => navigate("/quiz/errors")}
            className="w-full h-14 bg-white rounded-2xl border-2 border-b-[6px] font-black text-[16px] shadow-lg active:translate-y-1 active:border-b-2 transition-all"
            style={{
              borderColor: colors.primary,
              color: colors.primary
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryLight}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            开始错题练习
          </button>
        </section>
      </main>
    </div>
  );
}