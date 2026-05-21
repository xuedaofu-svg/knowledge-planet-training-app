import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { X, Heart, Check, ChevronRight, Volume2, Shield, Info, Rocket, Crown, Flame, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { StatusBar } from "../components/status-bar";
import { useLegendaryStatus } from "../hooks/useLegendaryStatus";
import { useTheme } from "../contexts/theme-context";

const MOCK_QUIZ = {
  title: "全能星球挑战",
  isBonus: false,
  questions: [
    {
      id: 1,
      type: "select",
      question: "星瑞L的轴距是多少？",
      options: [
        { id: "A", text: "2700mm", correct: false },
        { id: "B", text: "2750mm", correct: false },
        { id: "C", text: "2800mm", correct: true },
        { id: "D", text: "2850mm", correct: false },
      ],
      explanation: "星瑞L轴距为2800mm，属于A+级轿车标准轴距，提供宽敞的乘坐空间。",
    },
    {
      id: 2,
      type: "multi-select",
      question: "银河L7的核心卖点包括哪些？",
      options: [
        { id: "A", text: "雷神混动系统", correct: true },
        { id: "B", text: "7座布局", correct: false },
        { id: "C", text: "神盾电池安��", correct: true },
        { id: "D", text: "智能座舱", correct: true },
      ],
      explanation: "银河L7核心卖点包括雷神混动、神盾电池安全以及智能座舱。它采用5座布局，非7座。",
    },
    {
      id: 3,
      type: "fill-blank",
      question: "请填写正确答案",
      content: "CMA架构是由吉利与 [blank1] 联合开发，星瑞L搭载的发动机最大功率为 [blank2] kW。",
      blanks: {
        blank1: { answer: "沃尔沃", placeholder: "请输入" },
        blank2: { answer: "140", placeholder: "请输入" }
      },
      explanation: "CMA架构由吉利与沃尔沃联合开发。星瑞L搭载2.0TD发动机，最大功率140kW。",
    },
    {
      id: 4,
      type: "match",
      question: "将车型与对应的发动机匹配",
      left: [
        { id: "L1", text: "星瑞L" },
        { id: "L2", text: "星越L" },
        { id: "L3", text: "银河L7" },
      ],
      right: [
        { id: "R1", text: "1.5TD" },
        { id: "R2", text: "2.0TD" },
        { id: "R3", text: "雷神混动" },
      ],
      pairs: { "L1": "R2", "L2": "R2", "L3": "R3" }, // Simplified for mock
      explanation: "星瑞L和星越L通常搭载2.0TD引擎，银河L7搭载雷神电混系统。",
    },
    {
      id: 5,
      type: "sort",
      question: "将正确的销售流程排序",
      items: [
        { id: "S1", text: "接待客户，了解需求" },
        { id: "S2", text: "介绍产品亮点" },
        { id: "S3", text: "安排试驾体验" },
        { id: "S4", text: "处理异议，促成交易" },
      ],
      correctOrder: ["S1", "S2", "S3", "S4"],
      explanation: "标准销售流程：接待 -> 介绍 -> 试驾 -> 成交。",
    },
    {
      id: 6,
      type: "scenario",
      question: "选择最佳回应",
      scenario: {
        label: "客户说：",
        text: "\"你们这个价格太贵了，别的品牌便宜好几万呢。\""
      },
      options: [
        { id: "A", text: "\"我们的价格是官方统一价，不能便宜。\"", correct: false },
        { id: "B", text: "\"我理解您的顾虑，确实价格是购车的重要因素。不过吉利星瑞L在同级中配置更丰富，比如...\"", correct: true },
        { id: "C", text: "\"那您可以去看看别的品牌，我们不强求。\"", correct: false },
      ],
      explanation: "应对价格异议应先表示理解，再通过强调产品价值（如配置、安全、空间）来化解。",
    },
  ],
};

// Bonus quiz mock (time-limited)
const MOCK_BONUS_QUIZ = {
  title: "限时挑战",
  isBonus: true,
  totalSeconds: 60,
  questions: [
    {
      id: 1,
      type: "select",
      question: "星瑞L的轴距是多少？",
      options: [
        { id: "A", text: "2700mm", correct: false },
        { id: "B", text: "2750mm", correct: false },
        { id: "C", text: "2800mm", correct: true },
        { id: "D", text: "2850mm", correct: false },
      ],
      explanation: "星瑞L轴距为2800mm，属于A+级轿车标准轴距，提供宽敞的乘坐空间。",
    },
    {
      id: 2,
      type: "select",
      question: "银河L7的混动系统名称是？",
      options: [
        { id: "A", text: "超级电混", correct: false },
        { id: "B", text: "雷神混动", correct: true },
        { id: "C", text: "鲲鹏动力", correct: false },
        { id: "D", text: "智擎混动", correct: false },
      ],
      explanation: "银河L7搭载吉利雷神电混系统，具备高效节能优势。",
    },
    {
      id: 3,
      type: "select",
      question: "CMA架构由哪两个品牌联合开发？",
      options: [
        { id: "A", text: "吉利 & 宝马", correct: false },
        { id: "B", text: "吉利 & 沃尔沃", correct: true },
        { id: "C", text: "吉利 & 奔驰", correct: false },
        { id: "D", text: "吉利 & 路特斯", correct: false },
      ],
      explanation: "CMA架构由吉利与沃尔沃联合开发，确保欧洲标准的安全与工程品质。",
    },
  ],
};

export function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markAsLegendary } = useLegendaryStatus();
  const { theme, colors } = useTheme();

  // Determine quiz type from route id
  const isBonus = id?.startsWith("bonus");
  const isLegendary = id?.startsWith("legendary");
  const QUIZ = isBonus ? MOCK_BONUS_QUIZ : MOCK_QUIZ;

  // Theme-based color classes
  const themeColors = {
    primary: theme === "orange" ? "#FF7A00" : "#339586",
    primaryLight: theme === "orange" ? "#FFF4E6" : "#E6F7F4",
    primaryDark: theme === "orange" ? "#E66D00" : "#2A7A6E",
    ring: theme === "orange" ? "ring-orange-100/50" : "ring-teal-100/50",
    border: theme === "orange" ? "border-orange-500" : "border-teal-500",
    borderLight: theme === "orange" ? "border-orange-200" : "border-teal-200",
    bg: theme === "orange" ? "bg-orange-500" : "bg-teal-600",
    bgLight: theme === "orange" ? "bg-orange-50" : "bg-teal-50",
    bgMedium: theme === "orange" ? "bg-orange-100" : "bg-teal-100",
    text: theme === "orange" ? "text-orange-500" : "text-teal-600",
    textDark: theme === "orange" ? "text-orange-900" : "text-teal-900",
    textMedium: theme === "orange" ? "text-orange-600" : "text-teal-600",
    hover: theme === "orange" ? "hover:bg-orange-600" : "hover:bg-teal-700",
    hoverText: theme === "orange" ? "hover:text-orange-500" : "hover:text-teal-500",
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [isChecked, setIsChecked] = useState(false);
  
  // Wrong answers tracking for "消灭错题" feature
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [showWrongAnswersSheet, setShowWrongAnswersSheet] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false); // Track if we're in review mode
  
  // Streak tracking
  const [streak, setStreak] = useState(0);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneNumber, setMilestoneNumber] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Countdown for bonus quizzes only (legendary no longer time-limited)
  const TOTAL_SECONDS = isBonus
    ? (QUIZ as typeof MOCK_BONUS_QUIZ).totalSeconds
    : 0;
  const [countdown, setCountdown] = useState(TOTAL_SECONDS);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isBonus) return;
    setCountdown(TOTAL_SECONDS);
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [isBonus]);

  const countdownPct = TOTAL_SECONDS > 0 ? countdown / TOTAL_SECONDS : 1;
  const countdownColor = countdown > 30 ? "text-gray-500" : countdown > 10 ? themeColors.text : "text-red-500";
  const countdownStroke = countdown > 30 ? "#9CA3AF" : countdown > 10 ? colors.primary : "#EF4444";

  // State for different answer types
  const [selectedId, setSelectedId] = useState<string | null>(null); // For select & scenario
  const [multiSelected, setMultiSelected] = useState<string[]>([]); // For multi-select
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({}); // For fill-blank
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({}); // For matching
  const [matchSelection, setMatchSelection] = useState<string | null>(null); // Temp selection for matching
  const [sortedItems, setSortedItems] = useState<string[]>([]); // For sorting
  
  const currentQuestion = QUIZ.questions[currentIdx];

  // Initialize sort items when question changes
  useEffect(() => {
    if (currentQuestion.type === "sort") {
      setSortedItems([...(currentQuestion as typeof QUIZ.questions[4]).items].map(i => i.id).sort(() => Math.random() - 0.5));
    }
  }, [currentIdx]);

  const checkIsCorrect = () => {
    switch (currentQuestion.type) {
      case "select":
      case "scenario":
        return selectedId === currentQuestion.options.find(o => o.correct)?.id;
      case "multi-select":
        const correctIds = currentQuestion.options.filter(o => o.correct).map(o => o.id);
        return multiSelected.length === correctIds.length && multiSelected.every(id => correctIds.includes(id));
      case "fill-blank":
        return Object.keys(currentQuestion.blanks).every(key => 
          fillAnswers[key]?.trim() === currentQuestion.blanks[key].answer
        );
      case "match":
        return Object.keys(currentQuestion.pairs).every(key => matchPairs[key] === currentQuestion.pairs[key]);
      case "sort":
        return sortedItems.join(",") === currentQuestion.correctOrder.join(",");
      default:
        return false;
    }
  };

  const isCorrect = checkIsCorrect();

  const handleCheck = () => {
    if (isChecked) {
      if (currentIdx < QUIZ.questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
        resetState();
      } else {
        // Last question done
        if (isReviewMode) {
          // If in review mode, always go back home regardless of results
          navigate("/");
        } else {
          // First time through - show wrong answers sheet
          setShowWrongAnswersSheet(true);
        }
      }
    } else {
      setIsChecked(true);
      if (isCorrect) {
        // Correct answer - increase streak
        const newStreak = streak + 1;
        setStreak(newStreak);

        // Show celebration for every streak >= 2
        if (newStreak >= 2) {
          console.log('🎉 Celebration triggered! Streak:', newStreak);
          setMilestoneNumber(newStreak);
          setShowMilestone(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowMilestone(false);
            setShowConfetti(false);
          }, 2000);
        }
      } else {
        // Wrong answer - reset streak
        setStreak(0);
        setHearts(Math.max(0, hearts - 1));
        // Only track errors if NOT in review mode
        if (!isReviewMode && !wrongAnswers.includes(currentIdx)) {
          setWrongAnswers(prev => [...prev, currentIdx]);
        }
      }
    }
  };

  const resetState = () => {
    setSelectedId(null);
    setMultiSelected([]);
    setFillAnswers({});
    setMatchPairs({});
    setMatchSelection(null);
    setIsChecked(false);
    
    const nextQuestion = QUIZ.questions[currentIdx + 1];
    if (nextQuestion?.type === "sort") {
      setSortedItems([...nextQuestion.items].map(i => i.id).sort(() => Math.random() - 0.5));
    }
  };

  const isAnswered = () => {
    switch (currentQuestion.type) {
      case "select":
      case "scenario":
        return selectedId !== null;
      case "multi-select":
        return multiSelected.length > 0;
      case "fill-blank":
        return Object.keys(currentQuestion.blanks).every(key => fillAnswers[key]?.trim());
      case "match":
        return Object.keys(matchPairs).length === currentQuestion.left.length;
      case "sort":
        return true; // Always has an order
      default:
        return false;
    }
  };

  // UI rendering helpers
  const renderQuestionUI = () => {
    switch (currentQuestion.type) {
      case "select":
      case "scenario":
        return (
          <div className="grid gap-4 mt-2 pb-6">
            {currentQuestion.type === "scenario" && (
              <div className="bg-yellow-50 border-2 border-yellow-100 p-5 rounded-[1.5rem] mb-4 flex flex-col gap-1 shadow-sm relative">
                <div className="absolute top-6 -left-[9px] w-4 h-4 bg-yellow-50 border-l-4 border-b-4 border-yellow-100 rotate-45" />
                <span className="text-[12px] font-black text-yellow-600/60 uppercase tracking-widest">{currentQuestion.scenario.label}</span>
                <p className="text-[14px] font-black text-yellow-900/80 leading-relaxed italic">{currentQuestion.scenario.text}</p>
              </div>
            )}
            {currentQuestion.options.map((option) => {
              const isSelected = selectedId === option.id;
              const isOptionCorrect = option.correct;
              const showCorrect = isChecked && isOptionCorrect;
              const showWrong = isChecked && isSelected && !isOptionCorrect;

              return (
                <button
                  key={option.id}
                  disabled={isChecked}
                  onClick={() => setSelectedId(option.id)}
                  className={clsx(
                    "group relative flex items-center gap-4 p-4 rounded-[1.5rem] border-b-6 transition-all text-left",
                    isSelected
                      ? clsx("ring-4", themeColors.ring, themeColors.bgLight)
                      : "border-gray-100 hover:bg-gray-50 bg-white",
                    showCorrect && "bg-green-50/50 border-green-500 ring-4 ring-green-100/50",
                    showWrong && "bg-red-50/50 border-red-500 ring-4 ring-red-100/50"
                  )}
                >
                  <div
                    className={clsx(
                      "w-10 h-10 rounded-xl border-4 flex items-center justify-center font-black text-sm transition-all shadow-sm shrink-0",
                      isSelected ? clsx(themeColors.bg, themeColors.borderLight, "text-white scale-105") : "bg-gray-50 border-gray-200 text-gray-400",
                      showCorrect && "bg-green-500 border-green-200 text-white",
                      showWrong && "bg-red-500 border-red-200 text-white"
                    )}
                  >
                    {option.id}
                  </div>
                  <span
                    className={clsx(
                      "flex-1 font-black text-sm tracking-tight",
                      isSelected ? themeColors.textDark : "text-gray-700",
                      showCorrect && "text-green-900",
                      showWrong && "text-red-900"
                    )}
                  >
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        );
      case "multi-select":
        return (
          <div className="grid gap-4 mt-2 pb-6">
            {currentQuestion.options.map((option) => {
              const isSelected = multiSelected.includes(option.id);
              const isOptionCorrect = option.correct;
              const showCorrect = isChecked && isOptionCorrect;
              const showWrong = isChecked && isSelected && !isOptionCorrect;
              const shouldBeChecked = isChecked && isOptionCorrect && !isSelected;

              return (
                <button
                  key={option.id}
                  disabled={isChecked}
                  onClick={() => {
                    setMultiSelected(prev => 
                      prev.includes(option.id) ? prev.filter(id => id !== option.id) : [...prev, option.id]
                    );
                  }}
                  className={clsx(
                    "group relative flex items-center gap-4 p-4 rounded-[1.5rem] border-b-6 transition-all text-left",
                    isSelected
                      ? clsx(themeColors.border, "ring-4", themeColors.ring, themeColors.bgLight)
                      : "border-gray-100 hover:bg-gray-50 bg-white",
                    showCorrect && "bg-green-50/50 border-green-500 ring-4 ring-green-100/50",
                    showWrong && "bg-red-50/50 border-red-500 ring-4 ring-red-100/50",
                    shouldBeChecked && "bg-yellow-50/50 border-yellow-400 ring-4 ring-yellow-100/50"
                  )}
                >
                  <div
                    className={clsx(
                      "w-8 h-8 rounded-lg border-4 flex items-center justify-center font-black text-[12px] transition-all shadow-sm shrink-0",
                      isSelected ? clsx(themeColors.bg, themeColors.borderLight, "text-white") : "bg-gray-50 border-gray-200 text-gray-400",
                      showCorrect && "bg-green-500 border-green-200 text-white",
                      showWrong && "bg-red-500 border-red-200 text-white"
                    )}
                  >
                    {isSelected && <Check size={16} strokeWidth={4} />}
                  </div>
                  <span
                    className={clsx(
                      "flex-1 font-black text-sm tracking-tight",
                      isSelected ? themeColors.textDark : "text-gray-700",
                      showCorrect && "text-green-900",
                      showWrong && "text-red-900"
                    )}
                  >
                    {option.text}
                  </span>
                </button>
              );
            })}
            <p className="text-[12px] font-black text-gray-300 uppercase tracking-widest text-center">多选题：已选择 {multiSelected.length} 项</p>
          </div>
        );
      case "fill-blank":
        const parts = currentQuestion.content.split(/(\[blank\d+\])/);
        return (
          <div className="bg-white border-4 border-gray-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-6">
            <div className="text-[16px] font-black text-gray-800 leading-[2.5] text-left">
              {parts.map((part, i) => {
                const match = part.match(/\[(blank\d+)\]/);
                if (match) {
                  const key = match[1];
                  const isAnswerCorrect = fillAnswers[key]?.trim() === currentQuestion.blanks[key].answer;
                  return (
                    <input
                      key={key}
                      type="text"
                      disabled={isChecked}
                      placeholder={currentQuestion.blanks[key].placeholder}
                      value={fillAnswers[key] || ""}
                      onChange={(e) => setFillAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                      className={clsx(
                        "inline-block w-28 h-10 mx-2 border-b-4 text-center text-[16px] font-black transition-all outline-none",
                        isChecked
                          ? (isAnswerCorrect ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700")
                          : clsx(themeColors.border, themeColors.bgLight, themeColors.textDark, "focus:scale-105")
                      )}
                      style={
                        !isChecked
                          ? { backgroundColor: colors.primaryLight }
                          : {}
                      }
                    />
                  );
                }
                return <span className="text-[16px] tracking-tight text-left" key={i}>{part}</span>;
              })}
            </div>
          </div>
        );
      case "match":
        return (
          <div className="flex flex-col gap-8 pb-6">
            <div className="flex justify-between gap-6 relative">
              {/* Left Column */}
              <div className="flex flex-col gap-4 flex-1">
                {currentQuestion.left.map((item) => {
                  const isSelected = matchSelection === item.id;
                  const isMatched = !!matchPairs[item.id];
                  return (
                    <button
                      key={item.id}
                      disabled={isChecked || isMatched}
                      onClick={() => setMatchSelection(item.id)}
                      className={clsx(
                        "p-4 h-16 rounded-2xl border-b-4 font-black text-[16px] flex items-center justify-center transition-all",
                        isSelected ? clsx(themeColors.bg, "text-white scale-105 shadow-lg") :
                        isMatched ? "bg-green-500 border-green-700 text-white opacity-80" :
                        "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
                      )}
                      style={
                        isSelected
                          ? { backgroundColor: colors.primary, borderColor: colors.primaryDark }
                          : {}
                      }
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4 flex-1">
                {currentQuestion.right.map((item) => {
                  const isMatched = Object.values(matchPairs).includes(item.id);
                  const canMatch = matchSelection !== null && !isMatched;
                  return (
                    <button
                      key={item.id}
                      disabled={isChecked || isMatched || !matchSelection}
                      onClick={() => {
                        if (matchSelection) {
                          setMatchPairs(prev => ({ ...prev, [matchSelection]: item.id }));
                          setMatchSelection(null);
                        }
                      }}
                      className={clsx(
                        "p-4 h-16 rounded-2xl border-b-4 font-black text-[16px] flex items-center justify-center transition-all",
                        isMatched ? "bg-green-500 border-green-700 text-white opacity-80" :
                        canMatch ? clsx(themeColors.bgLight, themeColors.borderLight, themeColors.textMedium) :
                        "bg-white border-gray-100 text-gray-300"
                      )}
                      style={
                        canMatch
                          ? { backgroundColor: colors.primaryLight, borderColor: colors.primaryLight }
                          : {}
                      }
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
               {Object.entries(matchPairs).map(([leftId, rightId]) => (
                 <div key={leftId} className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100 text-[10px] font-black text-gray-400 flex items-center gap-2">
                    <span>{currentQuestion.left.find(l => l.id === leftId)?.text}</span>
                    <ChevronRight size={10} />
                    <span>{currentQuestion.right.find(r => r.id === rightId)?.text}</span>
                    {!isChecked && (
                      <button onClick={() => setMatchPairs(prev => {
                        const next = { ...prev };
                        delete next[leftId];
                        return next;
                      })} className="hover:text-red-500">×</button>
                    )}
                 </div>
               ))}
            </div>
            <p className="text-[12px] font-black text-gray-300 uppercase tracking-widest text-center">连线：点击左侧项后再点击右侧项匹配</p>
          </div>
        );
      case "sort":
        return (
          <div className="flex flex-col gap-4 pb-6">
            {sortedItems.map((itemId, idx) => {
              const item = currentQuestion.items.find(i => i.id === itemId);
              return (
                <div
                  key={itemId}
                  className="flex items-center gap-3 py-2 px-4 bg-white rounded-2xl border-2 border-b-6 border-gray-100 shadow-sm relative group"
                >
                  <div
                    className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-black text-[12px] shadow-md shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {idx + 1}
                  </div>
                  <span className="flex-1 font-black text-[16px] text-gray-700 tracking-tight">{item?.text}</span>
                  {!isChecked && (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => {
                          const next = [...sortedItems];
                          if (idx > 0) {
                            [next[idx], next[idx-1]] = [next[idx-1], next[idx]];
                            setSortedItems(next);
                          }
                        }}
                        className="p-1 text-gray-300 transition-colors"
                        style={{
                          ['--hover-color' as any]: colors.primary
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = ''}
                      >
                        ▲
                      </button>
                      <button
                         onClick={() => {
                          const next = [...sortedItems];
                          if (idx < sortedItems.length - 1) {
                            [next[idx], next[idx+1]] = [next[idx+1], next[idx]];
                            setSortedItems(next);
                          }
                        }}
                        className="p-1 text-gray-300 transition-colors"
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = ''}
                      >
                        ▼
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <p className="text-[12px] font-black text-gray-300 uppercase tracking-widest text-center">排序：使用箭头调整步骤顺序</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      <StatusBar theme="dark" />
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="px-5 pt-12 pb-4 flex items-center gap-4 relative">
            <button onClick={() => navigate("/")} className="text-gray-300 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-50 rounded-xl">
              <X size={28} strokeWidth={3} />
            </button>
            
            {/* Progress Bar with Streak Badge */}
            <div className="flex-1 flex items-center gap-2">
              {/* Streak Badge */}
              <AnimatePresence>
                {isChecked && isCorrect && streak >= 2 && (
                  <motion.div
                    initial={{ scale: 0, y: -10, opacity: 0 }}
                    animate={{
                      scale: 1,
                      y: 0,
                      opacity: 1,
                    }}
                    exit={{ scale: 0, y: -10, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25
                    }}
                    className="relative"
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="font-black tracking-tight px-3 py-1.5 rounded-full"
                      style={{
                        fontSize: 14,
                        color: theme === "orange" ? '#FF7A00' : '#339585',
                        backgroundColor: theme === "orange" ? '#FFF4E6' : '#E6F7F4',
                      }}
                    >
                      连击 x {streak}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Progress Bar */}
              <div
                className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden border-2 shadow-inner transition-all duration-300"
                style={
                  streak >= 3
                    ? theme === "orange"
                      ? { borderColor: '#FF7A00', boxShadow: '0 0 0 2px #FFF4E6' }
                      : { borderColor: '#339586', boxShadow: '0 0 0 2px #E6F7F4' }
                    : { borderColor: '#E5E7EB' }
                }
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentIdx + 1) / QUIZ.questions.length) * 100}%`,
                  }}
                  className="h-full rounded-full relative bg-gradient-to-r"
                  style={
                    isLegendary
                      ? theme === "orange"
                        ? { backgroundImage: 'linear-gradient(to right, #FACC15, #CA8A04)' }
                        : { backgroundImage: 'linear-gradient(to right, #339586, #5ACAB9)' }
                      : streak >= 5
                      ? theme === "orange"
                        ? { backgroundImage: 'linear-gradient(to right, #FF7A00, #EF4444, #DC2626)' }
                        : { backgroundImage: 'linear-gradient(to right, #339586, #5ACAB9, #7DD3C0)' }
                      : theme === "orange"
                      ? { backgroundImage: 'linear-gradient(to right, #FF7A00, #E66D00)' }
                      : { backgroundImage: 'linear-gradient(to right, #339586, #5ACAB9)' }
                  }
                >
                  {/* Shine effect when on a streak */}
                  {streak >= 3 && (
                    <motion.div
                      animate={{
                        x: ["-100%", "200%"]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  )}
                </motion.div>
              </div>
            </div>
            
            {/* Fixed-width right slot keeps bar length identical for both quiz types */}
            <div className="w-20 flex items-center justify-center shrink-0">
              {isBonus ? (
                <div className="relative w-11 h-11">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#F3F4F6" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15" fill="none"
                      stroke={countdownStroke}
                      strokeWidth="3"
                      strokeDasharray="94.2"
                      strokeDashoffset={94.2 * (1 - countdownPct)}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <span className={clsx("absolute inset-0 flex items-center justify-center font-black text-[14px]", countdownColor)}>
                    {countdown}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-0.5 whitespace-nowrap">
                  <span className="font-black text-gray-500" style={{fontSize: 16}}>{currentIdx + 1}</span>
                  <span className="font-black text-gray-300" style={{fontSize: 16}}>/</span>
                  <span className="font-black text-gray-400" style={{fontSize: 16}}>{QUIZ.questions.length}</span>
                </div>
              )}
            </div>
          </header>

          {/* Legendary mode banner */}
          {isLegendary && (
            <div className="mx-5 mb-2 px-4 py-2 bg-yellow-50 border-2 border-yellow-300 rounded-2xl flex items-center gap-2">
              <Crown size={16} className="text-yellow-600 fill-yellow-400 shrink-0" />
              <span className="font-black text-yellow-700" style={{ fontSize: 12 }}>
                传奇挑战 · 完成所有题目即可晋升
              </span>
            </div>
          )}

          {/* Question Content */}
          <main className="flex-1 px-6 pt-6 pb-[240px] overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br flex items-center justify-center shadow-lg border-4 border-white/30 text-white flex-shrink-0"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryDark})`
                  }}
                >
                  <Shield size={32} strokeWidth={2.5} />
                </div>
                <div className="flex-1 bg-white border-4 border-gray-100 p-5 rounded-[1.5rem] rounded-tl-none relative shadow-md">
                   <div className="absolute top-6 -left-[9px] w-4 h-4 bg-white border-l-4 border-b-4 border-gray-100 rotate-45" />
                   <h2 className="text-base font-black text-gray-800 leading-snug">
                     {currentQuestion.question}
                   </h2>
                   <button
                     className="absolute bottom-2 right-2 transition-all p-1"
                     style={{ color: colors.primary }}
                     onMouseEnter={(e) => e.currentTarget.style.color = colors.primaryDark}
                     onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
                   >
                     <Volume2 size={20} strokeWidth={2.5} />
                   </button>
                </div>
              </div>

              {renderQuestionUI()}
            </div>
          </main>

          {/* Footer / Feedback */}
          <footer className={clsx(
            "fixed bottom-0 left-0 right-0 px-6 pt-5 pb-8 transition-all duration-500 h-[240px] flex flex-col items-center z-40",
            isChecked 
              ? (isCorrect 
                  ? "bg-green-50 border-green-200 border-t-6 rounded-t-[2.5rem]" 
                  : "bg-red-50 border-red-200 border-t-6 rounded-t-[2.5rem]") 
              : "bg-transparent border-t-0"
          )}>
            <div className="w-full h-full flex flex-col justify-between z-10">
              <div className="min-h-[80px] flex items-center">
                <AnimatePresence mode="wait">
                  {isChecked && (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-start gap-4"
                    >
                      <div className={clsx(
                        "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border-4 shrink-0",
                        isCorrect ? "bg-green-500 border-green-200 text-white" : "bg-red-500 border-red-200 text-white"
                      )}>
                        {isCorrect ? <Check size={32} strokeWidth={4} /> : <Info size={32} strokeWidth={3} />}
                      </div>
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <span className={clsx("font-black text-[18px] tracking-tight", isCorrect ? "text-green-700" : "text-red-700")}>
                          {isCorrect ? "回答正确！太棒了" : "回答有误继续努力"}
                        </span>
                        <p className={clsx("text-[12px] font-bold leading-relaxed mt-1 line-clamp-2", isCorrect ? "text-green-600/80" : "text-red-600/80")}>
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={handleCheck}
                disabled={!isAnswered() && !isChecked}
                className={clsx(
                  "w-full h-16 rounded-[1.5rem] font-black text-[18px] tracking-[0.1em] border-b-8 transition-all active:translate-y-1 active:border-b-2 disabled:translate-y-0 shadow-xl shrink-0",
                  !isAnswered() && !isChecked
                    ? "bg-gray-100 text-gray-300 border-gray-200 shadow-none"
                    : isChecked
                      ? (isCorrect
                          ? (isLegendary && currentIdx === QUIZ.questions.length - 1
                              ? "bg-yellow-400 text-white border-yellow-600 hover:bg-yellow-500"
                              : "bg-green-500 text-white border-green-700 hover:bg-green-600")
                          : "bg-red-500 text-white border-red-700 hover:bg-red-600")
                      : "text-white"
                )}
                style={
                  !isAnswered() && !isChecked
                    ? {}
                    : isChecked
                    ? {}
                    : theme === "orange"
                    ? { backgroundColor: '#FF7A00', borderColor: '#E66D00' }
                    : { backgroundColor: '#339585', borderColor: '#005C4E' }
                }
              >
                {isChecked
                  ? currentIdx < QUIZ.questions.length - 1
                    ? "继续挑战"
                    : isLegendary
                    ? "晋升传奇"
                    : "返回星球"
                  : "确认答案"}
              </button>
            </div>
            {isChecked && isCorrect && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-300 via-transparent to-transparent" />
            )}
          </footer>

          {/* Wrong Answers Modal/Sheet */}
          <AnimatePresence>
            {showWrongAnswersSheet && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-[300]"
                />

                {/* Sheet */}
                <motion.div
                  key="sheet"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  className="fixed bottom-0 left-0 right-0 z-[310] bg-white rounded-t-[2.5rem] px-6 pt-6 pb-10 shadow-2xl"
                >
                  {/* Handle */}
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

                  {/* Content */}
                  <div className="flex flex-col items-center gap-6">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: [0, -5, 5, -5, 5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 1.5
                      }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl border-4 border-white"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryDark})`
                      }}
                    >
                      <Rocket size={40} className="text-white" strokeWidth={2.5} />
                    </motion.div>

                    {/* Title */}
                    <div className="text-center">
                      <h3 className="font-black text-gray-800" style={{ fontSize: 24 }}>
                        {wrongAnswers.length > 0 ? `还有${wrongAnswers.length}道题等你攻克` : '挑战完成！'}
                      </h3>
                      <p className="font-bold text-gray-500 mt-2" style={{ fontSize: 14 }}>
                        {wrongAnswers.length > 0 
                          ? '哪怕错了，也在进步中！这次一定能全部拿下！'
                          : '全部正确！真是太棒了'
                        }
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 w-full" />

                    {/* Button */}
                    <button
                      onClick={() => {
                        if (wrongAnswers.length > 0) {
                          // Enter review mode and jump to first wrong answer
                          setIsReviewMode(true);
                          const firstWrongIdx = wrongAnswers.sort((a, b) => a - b)[0];
                          setCurrentIdx(firstWrongIdx);
                          setShowWrongAnswersSheet(false);
                          setWrongAnswers([]); // Clear for next round
                          resetState();
                        } else {
                          // All done, always go back to home
                          navigate("/");
                        }
                      }}
                      className={clsx(
                        "w-full h-16 rounded-[1.5rem] font-black tracking-[0.1em] border-b-8 transition-all active:translate-y-1 active:border-b-2 shadow-xl relative overflow-hidden",
                        wrongAnswers.length > 0
                          ? "text-white"
                          : isLegendary
                          ? "bg-yellow-400 text-white border-yellow-600 hover:bg-yellow-500"
                          : "bg-green-500 text-white border-green-700 hover:bg-green-600"
                      )}
                      style={
                        wrongAnswers.length > 0
                          ? theme === "orange"
                            ? { backgroundColor: '#FF7A00', borderColor: '#E66D00', fontSize: 18 }
                            : { backgroundColor: '#339585', borderColor: '#005C4E', fontSize: 18 }
                          : { fontSize: 18 }
                      }
                    >
                      {wrongAnswers.length > 0 ? (
                        <>
                          {/* Shimmer effect for wrong answers button */}
                          <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                          />
                          <span className="relative z-10">消灭错题</span>
                        </>
                      ) : isLegendary ? (
                        "晋升传奇"
                      ) : (
                        "返回星球"
                      )}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Milestone Toast - Moved outside header for proper rendering */}
        <AnimatePresence>
        {showMilestone && (
          <>
            {console.log('🎨 Rendering milestone popup, milestoneNumber:', milestoneNumber)}
            {/* Confetti Particles */}
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-[9998]">
                {Array.from({ length: 30 }).map((_, i) => {
                  const angle = (i / 30) * Math.PI * 2;
                  const distance = 150 + Math.random() * 100;
                  const xOffset = Math.cos(angle) * distance;
                  const yOffset = Math.sin(angle) * distance - 50;
                  const confettiColors = theme === "orange"
                    ? ['bg-orange-400', 'bg-red-400', 'bg-yellow-400', 'bg-orange-300', 'bg-red-500']
                    : ['bg-teal-400', 'bg-emerald-400', 'bg-cyan-400', 'bg-teal-300', 'bg-emerald-500'];
                  const shapes = ['w-3 h-3 rounded-full', 'w-4 h-2 rounded-sm', 'w-2 h-4 rounded-sm'];
                  const randomRotation = Math.random() * 360 * 4;
                  const randomDuration = 1.2 + Math.random() * 0.5;

                  return (
                    <motion.div
                      key={i}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        rotate: 0,
                        opacity: 1
                      }}
                      animate={{
                        x: xOffset,
                        y: yOffset,
                        scale: 1.5,
                        rotate: randomRotation,
                        opacity: 0
                      }}
                      transition={{
                        duration: randomDuration,
                        ease: "easeOut"
                      }}
                      className={clsx(
                        'absolute top-[100px] left-[50vw]',
                        confettiColors[Math.floor(Math.random() * confettiColors.length)],
                        shapes[Math.floor(Math.random() * shapes.length)],
                        'shadow-lg'
                      )}
                      style={{
                        transformOrigin: 'center'
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Milestone Card */}
            <motion.div
              initial={{ scale: 0, y: -20, opacity: 0 }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1
              }}
              exit={{ scale: 0, y: 20, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="fixed top-32 left-1/2 -translate-x-1/2 z-[9999]"
            >
              <motion.div
                animate={{
                  boxShadow: theme === "orange"
                    ? [
                        '0 20px 50px rgba(249, 115, 22, 0.4)',
                        '0 20px 70px rgba(249, 115, 22, 0.6)',
                        '0 20px 50px rgba(249, 115, 22, 0.4)'
                      ]
                    : [
                        '0 20px 50px rgba(20, 184, 166, 0.4)',
                        '0 20px 70px rgba(20, 184, 166, 0.6)',
                        '0 20px 50px rgba(20, 184, 166, 0.4)'
                      ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
                className={clsx(
                  "rounded-[2rem] px-8 py-5 border-6 border-white flex items-center gap-4 relative overflow-hidden",
                  theme === "orange"
                    ? "bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
                    : "bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500"
                )}
              >
                {/* Glow ring effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className={clsx(
                    "absolute inset-0 rounded-[2rem] blur-xl",
                    theme === "orange"
                      ? "bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400"
                      : "bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400"
                  )}
                />

                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 15, -15, 0],
                    scale: [1, 1.2, 1, 1.2, 1]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                  className="relative z-10"
                >
                  <Zap
                    size={40}
                    className={clsx(
                      "drop-shadow-2xl",
                      theme === "orange"
                        ? "text-yellow-300 fill-yellow-300"
                        : "text-cyan-200 fill-cyan-200"
                    )}
                    strokeWidth={3}
                  />
                </motion.div>

                <div className="flex flex-col relative z-10">
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                    className="font-black text-white text-[24px] tracking-tight leading-none drop-shadow-lg"
                  >
                    {milestoneNumber} 连胜！
                  </motion.span>
                  <span className="font-black text-white/90 text-[12px] uppercase tracking-[0.2em] mt-1 drop-shadow">
                    {milestoneNumber === 2 && "连击开始"}
                    {milestoneNumber === 3 && "火力全开"}
                    {milestoneNumber === 4 && "越战越勇"}
                    {milestoneNumber === 5 && "势如破竹"}
                    {milestoneNumber === 6 && "势不可挡"}
                    {milestoneNumber >= 7 && milestoneNumber < 10 && "无人能敌"}
                    {milestoneNumber >= 10 && "传奇表现"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}