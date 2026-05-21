import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Lightbulb, Trophy, ChevronRight, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../contexts/theme-context";

const MASCOT_IMAGE = "";

const TIPS = [
  "记得完成每日一练，保持你的连胜记录！",
  "极氪 001 的风阻系数仅为 0.23Cd，这是它的核心卖点。",
  "看看排行榜，你离第一名张明只差 150 积分了！",
  "新课程《极氪 007 产品设计美学》已经上线，快去看看。",
  "掌握异议处理技巧是成交的关键，推荐去星际课堂进修。"
];

export function MascotGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(TIPS[0]);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const { theme, colors } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="absolute bottom-24 right-6 z-50 pointer-events-none">
        <div className="relative">
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 z-[60] flex items-end justify-center px-6 pb-24 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="w-full max-w-sm bg-white/80 backdrop-blur-2xl rounded-[3rem] p-6 shadow-2xl border-2 pointer-events-auto"
              style={{ borderColor: `${colors.primary}33` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div
                     className="w-12 h-12 rounded-2xl flex items-center justify-center"
                     style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
                   >
                      <Lightbulb size={24} />
                   </div>
                   <div>
                      <h4 className="font-black text-gray-800 text-lg leading-tight uppercase tracking-tight">星际助手 AI</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: colors.primary }}>实时销售顾问指南</p>
                   </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                className="border p-5 rounded-[2rem] mb-6"
                style={{
                  backgroundColor: `${colors.primaryLight}80`,
                  borderColor: colors.primaryLight
                }}
              >
                <p className="text-sm font-bold text-gray-700 leading-relaxed italic">
                  "{currentTip}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col gap-2 p-4 bg-white border-b-4 border-gray-100 rounded-2xl items-center text-center group active:border-b-0 active:translate-y-1 transition-all">
                   <Trophy size={20} className="group-hover:scale-110 transition-transform" style={{ color: colors.primary }} />
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">查看挑战</span>
                </button>
                <button className="flex flex-col gap-2 p-4 bg-white border-b-4 border-gray-100 rounded-2xl items-center text-center group active:border-b-0 active:translate-y-1 transition-all">
                   <MessageCircle size={20} className="group-hover:scale-110 transition-transform" style={{ color: colors.primary }} />
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">询问助手</span>
                </button>
              </div>

              <button
                className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-br border-b-4 shadow-xl flex items-center justify-center gap-2 text-white font-black uppercase tracking-widest text-xs active:border-b-0 active:translate-y-1 transition-all"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryDark})`,
                  borderColor: colors.primaryDark
                }}
                onClick={() => setIsOpen(false)}
              >
                我知道了 <ChevronRight size={14} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}