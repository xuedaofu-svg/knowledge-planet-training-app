import { motion, AnimatePresence } from "motion/react";
import { X, RotateCcw, Flame, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/theme-context";

interface LegendarySheetProps {
  open: boolean;
  nodeId: string;
  nodeTitle: string;
  Icon: LucideIcon;
  themeColor?: string;
  onClose: () => void;
}

export function LegendarySheet({
  open,
  nodeId,
  nodeTitle,
  Icon,
  themeColor = "orange",
  onClose,
}: LegendarySheetProps) {
  const navigate = useNavigate();
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(3);
  const { colors } = useTheme();

  const getThemeColors = () => {
    if (themeColor === "blue") {
      return { bg: "#3B82F6", border: "#1E40AF" };
    } else if (themeColor === "green") {
      return { bg: colors.primary, border: colors.primaryDark };
    } else {
      return { bg: colors.primary, border: colors.primaryDark };
    }
  };

  const themeColors = getThemeColors();

  const handleReview = () => {
    onClose();
    navigate(`/quiz/${nodeId}`);
  };

  const handleLegendary = () => {
    setShowCountdown(true);
    setCountdownNumber(3);
  };

  useEffect(() => {
    if (!showCountdown) return;

    if (countdownNumber > 0) {
      const timer = setTimeout(() => {
        setCountdownNumber(countdownNumber - 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setShowCountdown(false);
        onClose();
        navigate(`/quiz/legendary-${nodeId}`);
      }, 600);
      return () => clearTimeout(finalTimer);
    }
  }, [showCountdown, countdownNumber, nodeId, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[300]"
          />

          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="fixed bottom-0 left-0 right-0 z-[310] bg-white rounded-t-[2.5rem] px-6 pt-6 pb-10 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md border-b-4"
                style={{
                  backgroundColor: themeColors.bg,
                  borderColor: themeColors.border
                }}
              >
                <Icon size={30} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-black text-gray-800" style={{ fontSize: 20 }}>
                  {nodeTitle}
                </p>
                <p className="font-bold text-gray-400" style={{ fontSize: 12 }}>
                  关卡已通关 · 继续提升
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-100 mb-6" />

            <button
              onClick={handleReview}
              className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-b-6 border-gray-200 mb-4 active:translate-y-1 active:border-b-2 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm">
                <RotateCcw size={22} strokeWidth={2.5} className="text-gray-500" />
              </div>
              <div>
                <p className="font-black text-gray-700" style={{ fontSize: 16 }}>
                  复习
                </p>
                <p className="font-bold text-gray-400" style={{ fontSize: 12 }}>
                  重新练习这个关卡
                </p>
              </div>
            </button>

            <button
              onClick={handleLegendary}
              className="w-full flex items-center gap-4 p-4 bg-yellow-50 rounded-2xl border-2 border-b-6 border-yellow-400 active:translate-y-1 active:border-b-2 transition-all text-left relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent pointer-events-none"
              />
              <div className="w-12 h-12 rounded-xl bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center shadow-md shrink-0 relative z-10">
                <Flame size={22} strokeWidth={2.5} className="text-white fill-white/30" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <p className="font-black text-yellow-700" style={{ fontSize: 16 }}>
                    挑战传奇
                  </p>
                  <span
                    className="px-2 py-0.5 bg-yellow-400 text-white rounded-full font-black"
                    style={{ fontSize: 10 }}
                  >
                    晋升
                  </span>
                </div>
                <p className="font-bold text-yellow-600/80" style={{ fontSize: 12 }}>
                  完成全部题目，晋升金色传奇等级
                </p>
              </div>
            </button>

            {showCountdown && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white font-black text-4xl rounded-full w-20 h-20 flex items-center justify-center">
                {countdownNumber > 0 ? countdownNumber : "开始!"}
              </div>
            )}
          </motion.div>
        </>
      )}

      {showCountdown && (
        <motion.div
          key="countdown-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 backdrop-blur-sm"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 70%, rgba(255, 223, 186, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(221, 160, 221, 0.3) 0%, transparent 50%)
              `
            }}
          />

          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => {
              const isHeart = i % 2 === 0;
              const randomX = Math.random() * 100;
              const randomY = Math.random() * 100;
              const size = 12 + Math.random() * 12;
              return (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute"
                  style={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                    fontSize: size
                  }}
                >
                  {isHeart ? '💗' : '⭐'}
                </motion.div>
              );
            })}
          </div>

          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => {
              const randomX = Math.random() * 100;
              const size = 20 + Math.random() * 40;
              const duration = 4 + Math.random() * 3;
              return (
                <motion.div
                  key={`bubble-${i}`}
                  initial={{
                    x: `${randomX}vw`,
                    y: '110vh',
                    opacity: 0.6
                  }}
                  animate={{
                    y: '-10vh',
                    x: `${randomX + (Math.random() - 0.5) * 20}vw`
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                  className="absolute rounded-full bg-white/40 border-2 border-white/60"
                  style={{
                    width: size,
                    height: size,
                    boxShadow: 'inset -4px -4px 8px rgba(255, 255, 255, 0.5), 2px 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
              );
            })}
          </div>

          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 150 + i * 20;
            return (
              <motion.div
                key={`char-${i}`}
                animate={{
                  x: [
                    Math.cos(angle) * radius,
                    Math.cos(angle + Math.PI / 3) * radius,
                    Math.cos(angle + Math.PI * 2 / 3) * radius,
                    Math.cos(angle + Math.PI) * radius,
                    Math.cos(angle + Math.PI * 4 / 3) * radius,
                    Math.cos(angle + Math.PI * 5 / 3) * radius,
                    Math.cos(angle) * radius
                  ],
                  y: [
                    Math.sin(angle) * radius,
                    Math.sin(angle + Math.PI / 3) * radius,
                    Math.sin(angle + Math.PI * 2 / 3) * radius,
                    Math.sin(angle + Math.PI) * radius,
                    Math.sin(angle + Math.PI * 4 / 3) * radius,
                    Math.sin(angle + Math.PI * 5 / 3) * radius,
                    Math.sin(angle) * radius
                  ],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3
                }}
                className="absolute text-4xl"
                style={{
                  left: '50%',
                  top: '50%',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}
              >
                {i % 2 === 0 ? '🚀' : '✨'}
              </motion.div>
            );
          })}

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute top-24 left-0 right-0 text-center"
          >
            <motion.p
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500"
              style={{ fontSize: 24, WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
            >
              挑战即将开启！
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {countdownNumber > 0 ? (
              <motion.div
                key={countdownNumber}
                initial={{ scale: 0, rotate: -20 }}
                animate={{
                  scale: [0, 1.3, 1],
                  rotate: [20, -10, 0]
                }}
                exit={{
                  scale: [1, 1.2, 0],
                  rotate: [0, 10, 20],
                  y: [0, -30, -60]
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="relative flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    scaleX: [1, 0.95, 1.05, 1],
                    scaleY: [1, 1.1, 0.9, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity
                  }}
                  className="relative"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity
                    }}
                    className="absolute inset-0 blur-3xl"
                    style={{
                      background: countdownNumber === 3 ? '#ff6b9d' : countdownNumber === 2 ? '#fbbf24' : '#a78bfa',
                      transform: 'scale(1.5)'
                    }}
                  />

                  <div className="relative">
                    <span
                      className="font-black relative z-10"
                      style={{
                        fontSize: 280,
                        lineHeight: 1,
                        background: countdownNumber === 3
                          ? 'linear-gradient(135deg, #ff6b9d 0%, #ffc3d9 50%, #ff8cb4 100%)'
                          : countdownNumber === 2
                          ? 'linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #fcd34d 100%)'
                          : 'linear-gradient(135deg, #a78bfa 0%, #ddd6fe 50%, #c4b5fd 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStroke: '8px rgba(255, 255, 255, 0.6)',
                        textShadow: '0 15px 40px rgba(0,0,0,0.4)'
                      }}
                    >
                      {countdownNumber}
                    </span>

                    <div
                      className="absolute rounded-full bg-white/60 blur-2xl"
                      style={{
                        width: '40%',
                        height: '40%',
                        top: '15%',
                        left: '20%'
                      }}
                    />
                  </div>
                </motion.div>

                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const distance = 180;
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        repeat: Infinity
                      }}
                      className="absolute text-4xl"
                    >
                      ✨
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="start"
                initial={{ scale: 0, rotate: -30 }}
                animate={{
                  scale: 1,
                  rotate: 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                className="relative flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity
                  }}
                  className="absolute w-96 h-96"
                  style={{
                    background: 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(251,191,36,0) 70%)',
                    filter: 'blur(20px)'
                  }}
                />

                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 1.5],
                        opacity: [0, 1, 0],
                        x: Math.cos(angle) * 200,
                        y: Math.sin(angle) * 200
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                      className="absolute w-2 h-16 bg-gradient-to-b from-yellow-300 to-transparent rounded-full"
                      style={{
                        rotate: `${angle * 180 / Math.PI}deg`,
                        transformOrigin: 'center'
                      }}
                    />
                  );
                })}

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity
                  }}
                  className="relative z-10"
                >
                  <span
                    className="font-black"
                    style={{
                      fontSize: 120,
                      background: 'linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #fbbf24 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      WebkitTextStroke: '6px white',
                      textShadow: '0 10px 30px rgba(251,191,36,0.8)',
                      filter: 'drop-shadow(0 0 20px #fbbf24)'
                    }}
                  >
                    冲！
                  </span>
                </motion.div>

                {Array.from({ length: 20 }).map((_, i) => {
                  const angle = (i / 20) * Math.PI * 2;
                  const distance = 150 + Math.random() * 100;
                  const colors = ['bg-pink-400', 'bg-yellow-400', 'bg-purple-400', 'bg-blue-400'];
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{
                        scale: [0, 1.5, 1],
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        opacity: [1, 1, 0],
                        rotate: [0, Math.random() * 720]
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeOut"
                      }}
                      className={`absolute w-4 h-4 rounded-sm ${colors[i % colors.length]}`}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute bottom-32 left-0 right-0 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 rounded-full shadow-2xl border-4 border-white"
            >
              <span className="font-black text-white" style={{ fontSize: 20 }}>
                {countdownNumber > 0 ? `${countdownNumber}...` : '开始挑战！'}
              </span>
              {countdownNumber === 0 && (
                <motion.span
                  animate={{
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity
                  }}
                  className="text-2xl"
                >
                  🚗
                </motion.span>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-16 left-0 right-0 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Flame size={20} className="fill-current" style={{ color: themeColors.bg }} />
              <span className="font-black" style={{ fontSize: 14, color: themeColors.bg }}>
                {nodeTitle} · 传奇挑战
              </span>
              <Flame size={20} className="fill-current" style={{ color: themeColors.bg }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}