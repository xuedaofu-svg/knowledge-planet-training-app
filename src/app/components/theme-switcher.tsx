import { motion, AnimatePresence } from "motion/react";
import { X, Palette, Check } from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import { clsx } from "clsx";

interface ThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSwitcher({ isOpen, onClose }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: "orange" as const,
      name: "活力橙",
      primary: "#FF7A00",
      secondary: "#FFF4E6",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      id: "green" as const,
      name: "清新绿",
      primary: "#339586",
      secondary: "#E6F7F4",
      gradient: "from-teal-400 to-emerald-600",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[170] bg-black/30 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                  <Palette size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-800 tracking-tight">主题切换</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 active:scale-95 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-xs text-gray-500 font-bold mb-6 uppercase tracking-wider">选择你喜欢的主题风格</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setTimeout(onClose, 300);
                  }}
                  className={clsx(
                    "relative flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 transition-all",
                    theme === t.id
                      ? "border-gray-800 ring-4 ring-gray-100 shadow-lg"
                      : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  {theme === t.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                  )}

                  <div className={clsx("w-20 h-20 rounded-3xl bg-gradient-to-br shadow-xl border-b-4", t.gradient)}
                    style={{ borderColor: t.primary }}
                  />

                  <div className="text-center">
                    <div className="font-black text-gray-800 text-base mb-1">{t.name}</div>
                    <div className="text-xs text-gray-400 font-bold">
                      {t.id === "orange" ? "经典配色" : "清新风格"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}