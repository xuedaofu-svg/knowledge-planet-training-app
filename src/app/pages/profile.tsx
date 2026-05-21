import { User, Settings, ShieldCheck, Flame, Trophy, Gem, BarChart3, ChevronDown, Globe, Bell, Wallet, Heart, Zap, Sparkles, Car, MessageSquare, Check, Radio, Target, Swords } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
const avatarImage = "";
import { ThemeSwitcher } from "../components/theme-switcher";
import { useTheme } from "../contexts/theme-context";

const STATS = [
  { value: "8", label: "已完成章节", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
  { value: "15", label: "已完成关卡", icon: BarChart3, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
  { value: "7", label: "连胜天数", clickable: true, icon: Flame, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
];

const PROGRESS_DATA = [
  { name: "产品星球", icon: Globe, progress: 62, color: "bg-blue-500 shadow-blue-500/40", bg: "bg-blue-50" },
  { name: "实战星球", icon: Swords, progress: 25, color: "bg-green-500 shadow-green-500/40", bg: "bg-green-50" },
];

export function Profile() {
  const navigate = useNavigate();
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);
  const { theme, colors } = useTheme();

  return (
    <div className="flex flex-col gap-6 pb-24 bg-white min-h-full">
      {/* Profile Header */}
      <header
        className={clsx(
          "bg-white px-6 pt-12 pb-8 flex flex-col items-center border-b-8 rounded-b-[3rem] shadow-xl relative overflow-hidden group",
          theme === "orange" ? "border-orange-50" : "border-teal-50"
        )}
      >
        <div
          className={clsx(
            "absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full blur-[80px]",
            theme === "orange" ? "bg-orange-100/30" : "bg-teal-100/30"
          )}
        />

        <div className="absolute top-10 right-6">
           <button
             onClick={() => setIsThemeSwitcherOpen(true)}
             className={clsx(
               "w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-b-4 border-gray-100 text-gray-400 transition-all active:translate-y-1 active:border-b-2 shadow-sm hover:bg-white group",
               theme === "orange" ? "hover:text-orange-500 hover:border-orange-200" : "hover:text-teal-500 hover:border-teal-200"
             )}
           >
             <Settings size={20} className="group-hover:rotate-90 transition-transform duration-700" strokeWidth={2.5} />
           </button>
        </div>

        <div className="relative mb-6 pt-2">
          <div
            className={clsx(
              "w-32 h-32 rounded-[2.5rem] p-1.5 shadow-xl bg-gradient-to-tr",
              theme === "orange" ? "from-orange-400 to-orange-600" : "from-teal-400 to-emerald-600"
            )}
          >
             <div className="w-full h-full rounded-[2rem] bg-white flex items-center justify-center shadow-inner border-4 border-white/30 overflow-hidden">
                <img
                  src={avatarImage}
                  alt="用户头像"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, ${theme === "orange" ? "rgba(255, 122, 0, 0.1)" : "rgba(51, 149, 134, 0.1)"})`
                  }}
                />
             </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 border-4 border-white flex items-center justify-center text-white shadow-lg z-10">
             <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
           <h1 className="text-[18px] font-black text-gray-800 tracking-tighter">张三</h1>
           <div className="flex gap-2">
             <p className="text-[12px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
               积分：8
             </p>
             <p className="text-[12px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
               经验：200
             </p>
           </div>
        </div>

        {/* Refined Stats Grid - 4 Fields, No Icons, Strict Names */}
        <div className="grid grid-cols-2 gap-3 w-full mt-8 px-1">
          {[
            { value: "7", label: "连胜天数" },
            { value: "7", label: "当前连胜" },
            { value: "15", label: "最长连胜" },
            { value: "28", label: "本月打卡" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl border-2 border-b-6 shadow-sm transition-transform active:translate-y-1 active:border-b-2",
                theme === "orange" ? "bg-orange-50 border-orange-100" : "bg-teal-50 border-teal-100"
              )}
            >
              <span className="text-[18px] font-black text-gray-800 leading-none">{stat.value}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight text-center whitespace-nowrap">{stat.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content - Entry Area */}
      <main className="px-6 flex flex-col gap-8">
         <div className="grid grid-cols-3 gap-3">
             {[
               { value: "8", label: "已完成章节", type: "chapters" },
               { value: "15", label: "已完成关卡", type: "levels" },
               { value: "7", label: "连胜天数", type: "streak", clickable: true },
             ].map((stat, idx) => {
               const bgColor = stat.type === "chapters" ? (theme === "orange" ? "bg-orange-50" : "bg-teal-50") : stat.type === "levels" ? "bg-blue-50" : "bg-red-50";
               const borderColor = stat.type === "chapters" ? (theme === "orange" ? "border-orange-100" : "border-teal-100") : stat.type === "levels" ? "border-blue-100" : "border-red-100";

               return (
                 <div
                   key={idx}
                   onClick={() => stat.clickable && navigate("/streak")}
                   className={clsx(
                     "flex flex-col items-center justify-center gap-2 py-4 px-1 rounded-2xl border-2 border-b-6 shadow-md transition-all",
                     bgColor,
                     borderColor,
                     stat.clickable && "cursor-pointer active:translate-y-1 active:border-b-2"
                   )}
                 >
                  <div className="flex flex-col items-center">
                     <span className="text-[18px] font-black text-gray-800 leading-none">{stat.value}</span>
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight text-center whitespace-nowrap">{stat.label}</span>
                  </div>
                 </div>
               );
             })}
         </div>

         <section className="flex flex-col gap-6">
            <h3 className="text-[18px] font-black text-gray-800 flex items-center gap-3 px-1 tracking-tight">
               <div className="p-2 bg-yellow-100 rounded-xl text-yellow-600 border-2 border-white shadow-sm"><Sparkles size={24} strokeWidth={2.5} /></div>
               学习进度
            </h3>

            <div className="flex flex-col gap-4">
               {PROGRESS_DATA.map((item) => (
                 <div key={item.name} className="bg-white p-4 rounded-2xl border-2 border-b-6 border-gray-100 shadow-sm flex items-center gap-4 hover:translate-y-[-4px] transition-all group cursor-pointer active:scale-[0.98]">
                    <div className={clsx("w-14 h-14 rounded-xl flex items-center justify-center shadow-md border-2 border-white group-hover:rotate-3 transition-transform", item.bg)}>
                       <item.icon size={24} strokeWidth={2.5} className="text-gray-700" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                       <div className="flex items-center justify-between">
                          <span className="font-black text-[14px] text-gray-800 tracking-tight">{item.name}</span>
                          <span className="text-[14px] font-black text-gray-400 tracking-widest">{item.progress}%</span>
                       </div>
                       <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            className={clsx("h-full rounded-full transition-all duration-1000", item.color)}
                          />
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </section>
      </main>

      <ThemeSwitcher isOpen={isThemeSwitcherOpen} onClose={() => setIsThemeSwitcherOpen(false)} />
    </div>
  );
}