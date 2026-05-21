import { ChevronDown, Flame, Sparkles, Car, Zap, Check, Swords, X, ChevronRight, Globe, Star, HelpCircle, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
const avatarImage = "";
import { useTheme } from "../contexts/theme-context";

export function PlanetSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const planetFromUrl = searchParams.get("planet") || "产品星球";
  const [currentPlanet, setCurrentPlanet] = useState(planetFromUrl);
  const { theme, colors } = useTheme();

  useEffect(() => {
    if (planetFromUrl !== currentPlanet) {
      setCurrentPlanet(planetFromUrl);
    }
  }, [planetFromUrl]);

  const handlePlanetChange = (name: string) => {
    setCurrentPlanet(name);
    setSearchParams({ planet: name });
  };

  const planets = [
    { name: "产品星球", desc: "产品知识、配置参数", Icon: Car, color: "text-orange-500" },
    { name: "实战星球", desc: "销售技巧、异议处理", Icon: Swords, color: "text-blue-500" },
  ];

  const activePlanet = planets.find(p => p.name === currentPlanet) || planets[0];
  const navigate = useNavigate();

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-[150] bg-white/95 backdrop-blur-xl border-b-4 px-5 pt-[52px] pb-4 flex items-center justify-between shadow-sm",
          theme === "orange" ? "border-orange-50" : "border-teal-50"
        )}
      >
        <div
          className={clsx(
            "flex items-center gap-3 cursor-pointer group p-1.5 px-4 rounded-3xl transition-all duration-300 active:scale-95",
            theme === "orange" ? "hover:bg-orange-50" : "hover:bg-teal-50"
          )}
          onClick={() => setIsOpen(true)}
        >
          <div
            className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border-2 border-white transition-all group-hover:scale-105"
            style={{ backgroundColor: activePlanet.name === "实战星球" ? "#3B82F6" : colors.primary }}
          >
             <img
               src={avatarImage}
               alt="用户头像"
               className="w-full h-full object-cover"
             />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-gray-800 text-base tracking-tight whitespace-nowrap truncate max-w-[5.8rem]">{activePlanet.name}</span>
              <ChevronDown
                size={20}
                className="group-hover:rotate-180 transition-transform duration-500"
                style={{ color: theme === "orange" ? "#FB923C" : "#5EEAD4" }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatItem
            icon={<Flame size={18} style={{ color: colors.primary }} className="fill-current" />}
            value="7"
            color={colors.primary}
            onClick={() => navigate("/streak")}
          />
          <StatItem
            icon={<Sparkles size={18} className="text-blue-500 fill-blue-500" />}
            value="124"
            color="#3B82F6"
          />
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-black/30 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-800 tracking-tight">选择学习内容</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 active:scale-95 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto pr-1 custom-scrollbar pb-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">选择星球</p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {planets.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => handlePlanetChange(p.name)}
                      className={clsx(
                        "flex flex-col gap-3 p-5 rounded-[2.5rem] border-2 transition-all text-left group",
                        currentPlanet === p.name
                          ? clsx(
                              "shadow-sm ring-4",
                              theme === "orange" ? "bg-orange-50/50 border-orange-500 ring-orange-50" : "bg-teal-50/50 border-teal-500 ring-teal-50"
                            )
                          : "bg-white border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <div className={clsx(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-1 transition-colors",
                        currentPlanet === p.name ? "bg-white shadow-sm" : "bg-gray-50"
                      )}>
                        <p.Icon
                          size={24}
                          style={{
                            color: currentPlanet === p.name
                              ? (p.name === "实战星球" ? "#3B82F6" : colors.primary)
                              : "#9CA3AF"
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-black text-gray-800 text-[16px] leading-none mb-1.5">{p.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold leading-relaxed">{p.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 border-t border-gray-50 pt-8">选择章节</p>
                <div className="grid gap-3">
                  {(currentPlanet === "实战星球"
                    ? [
                        { name: "异议处理", progressText: "已完成 2/3 关卡", progress: 66, Icon: HelpCircle, iconColor: "text-white", bgColor: "bg-blue-600" },
                        { name: "竞品应对", progressText: "已完成 0/3 关卡", progress: 0, Icon: Target, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
                        { name: "逼单技巧", progressText: "已完成 0/2 关卡", progress: 0, Icon: Flame, iconColor: "text-orange-500", bgColor: "bg-orange-50" },
                      ]
                    : [
                        { name: "星瑞L", progressText: "已完成 5/8 关卡", progress: 62, Icon: Car, iconColor: "text-red-500", bgColor: "bg-red-50" },
                        { name: "极氪8X", progressText: "已完成 0/5 关卡", progress: 0, Icon: Zap, iconColor: "text-yellow-500", bgColor: "bg-yellow-50" },
                        { name: "银河M9", progressText: "已完成 0/4 关卡", progress: 0, Icon: Star, iconColor: "text-orange-400", bgColor: "bg-orange-50" },
                      ]
                  ).map((ch) => (
                    <button
                      key={ch.name}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-5 p-5 rounded-[2.5rem] bg-gray-50/50 border border-transparent hover:border-gray-200 hover:bg-white transition-all group text-left active:scale-[0.98]"
                    >
                      <div className={clsx("w-14 h-14 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-sm", ch.bgColor)}>
                        <ch.Icon size={28} className={ch.iconColor} />
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-gray-800 text-[20px] mb-1 leading-none">{ch.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider">{ch.progressText}</div>
                        <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ch.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full shadow-sm"
                            style={{
                              backgroundColor: currentPlanet === "实战星球" ? "#3B82F6" : colors.primary
                            }}
                          />
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function StatItem({ icon, value, color, onClick }: { icon: React.ReactNode; value: string; color: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl border-2 border-gray-100 hover:scale-105 transition-all shadow-sm active:scale-95",
        onClick && "cursor-pointer"
      )}
    >
      {icon}
      <span className="font-black text-base" style={{ color }}>{value}</span>
    </div>
  );
}