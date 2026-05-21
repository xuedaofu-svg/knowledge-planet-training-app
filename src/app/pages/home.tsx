import { SkillNode } from "../components/skill-node";
import { LegendarySheet } from "../components/legendary-sheet";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { useSearchParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useLegendaryStatus } from "../hooks/useLegendaryStatus";
import { useTheme } from "../contexts/theme-context";
import {
  Star,
  Trophy,
  Sparkles,
  Maximize,
  Palette,
  Wrench,
  Settings,
  Fuel,
  Layers,
  Car,
  Swords,
  PenLine,
  Target,
  Zap,
  HelpCircle,
  MessageCircle,
  ShieldQuestion,
  UserCheck,
  Handshake,
  TrendingUp,
  FileCheck
} from "lucide-react";

const bonusGifOrange = "";
const bonusGifPurple = "";

const mascotKnight = "";
const mascotDriver = "";
const mascotEngineer = "";
const mascotJudge = "";
const mascotRunner = "";
const bonusStage1 = "";

const PRODUCT_STAGES = [
  {
    title: "第一阶段：外观设计",
    desc: "掌握车型比例与美学卖点",
    color: "from-yellow-400 to-orange-500",
    nodes: [
      { id: "1-1", title: "车身尺寸", Icon: Maximize, status: "completed", level: 5, maxLevel: 5 },
      { id: "1-2", title: "外观亮点", Icon: Sparkles, status: "completed", level: 5, maxLevel: 5 },
      { id: "1-3", title: "颜色配置", Icon: Palette, status: "completed", level: 5, maxLevel: 5 },
      {
        id: "1-bonus",
        title: "外观巅峰赛",
        Icon: Trophy,
        status: "completed",
        illustration: bonusGifOrange,
        stars: 3,
        isBonus: true
      },
    ]
  },
  {
    title: "第二阶段：动力系统",
    desc: "深入了解核心驱动与性能表现",
    color: "from-orange-400 to-orange-600",
    nodes: [
      { id: "2-1", title: "发动机", Icon: Wrench, status: "current", level: 2, maxLevel: 5 },
      { id: "2-2", title: "变速箱", Icon: Settings, status: "locked" },
      { id: "2-3", title: "油耗性能", Icon: Fuel, status: "locked" },
      {
        id: "2-bonus",
        title: "动力竞速",
        Icon: Swords,
        status: "locked",
        illustration: bonusGifPurple,
        isBonus: true
      },
    ]
  },
  {
    title: "第三阶段：智能科技",
    desc: "探索前瞻架构与自动驾驶",
    color: "from-blue-400 to-blue-600",
    nodes: [
      { id: "3-1", title: "架构优势", Icon: Layers, status: "locked" },
      { id: "3-2", title: "智能驾驶", Icon: Car, status: "locked" },
      { id: "3-3", title: "主动安全", Icon: PenLine, status: "locked" },
      {
        id: "3-bonus",
        title: "未来科技奖",
        Icon: Target,
        status: "locked",
        illustration: bonusGifOrange,
        isBonus: true
      },
    ]
  }
];

const PRACTICE_STAGES = [
  {
    title: "第一阶段：异议处理",
    desc: "化解客户疑虑的黄金法则",
    color: "from-blue-400 to-indigo-600",
    nodes: [
      { id: "p1-1", title: "价格异议", Icon: HelpCircle, status: "completed", level: 5, maxLevel: 5 },
      { id: "p1-2", title: "品质疑虑", Icon: ShieldQuestion, status: "completed", level: 5, maxLevel: 5 },
      { id: "p1-3", title: "服务对比", Icon: MessageCircle, status: "current", level: 3, maxLevel: 5 },
      {
        id: "p1-bonus",
        title: "话术巅峰赛",
        Icon: Trophy,
        status: "current",
        illustration: bonusGifOrange,
        stars: 1,
        isBonus: true
      },
    ]
  },
  {
    title: "第二阶段：竞品应对",
    desc: "知己知彼，百战不殆",
    color: "from-red-400 to-red-600",
    nodes: [
      { id: "p2-1", title: "对标分析", Icon: Target, status: "locked" },
      { id: "p2-2", title: "优势萃取", Icon: Zap, status: "locked" },
      { id: "p2-3", title: "价值转化", Icon: TrendingUp, status: "locked" },
      {
        id: "p2-bonus",
        title: "实战对抗",
        Icon: Swords,
        status: "locked",
        illustration: bonusGifPurple,
        isBonus: true
      },
    ]
  },
  {
    title: "第三阶段：逼单技巧",
    desc: "临门一脚，强势成交",
    color: "from-green-400 to-green-600",
    nodes: [
      { id: "p3-1", title: "心理锚点", Icon: UserCheck, status: "locked" },
      { id: "p3-2", title: "成交信号", Icon: FileCheck, status: "locked" },
      { id: "p3-3", title: "最后通牒", Icon: Handshake, status: "locked" },
      {
        id: "p3-bonus",
        title: "金牌销售奖",
        Icon: Star,
        status: "locked",
        illustration: bonusGifOrange,
        isBonus: true
      },
    ]
  }
];

export function Home() {
  const [searchParams] = useSearchParams();
  const currentPlanet = searchParams.get("planet") || "产品星球";
  const stages = currentPlanet === "实战星球" ? PRACTICE_STAGES : PRODUCT_STAGES;
  const { isLegendary } = useLegendaryStatus();
  const { theme, colors } = useTheme();

  // Sheet state: which completed node was clicked
  const [activeSheet, setActiveSheet] = useState<{
    id: string;
    title: string;
    Icon: any;
  } | null>(null);

  // Active stage tracking for scroll animation
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate progress for the S-curve path (only up to completed nodes)
  const allMandatoryNodes = stages.flatMap(s => s.nodes.filter(n => !n.isBonus));
  const lastCompletedIdx = allMandatoryNodes.findLastIndex(n => n.status === "completed");
  const progressPercentage = ((lastCompletedIdx + 1) / allMandatoryNodes.length) * 100;

  // Scroll handler to detect when next stage header reaches the sticky position
  useEffect(() => {
    const handleScroll = () => {
      const stickyTop = 112; // top-[112px]

      for (let i = 0; i < headerRefs.current.length; i++) {
        const header = headerRefs.current[i];
        if (!header) continue;

        const rect = header.getBoundingClientRect();

        // When this header reaches the sticky position, activate it
        if (rect.top <= stickyTop + 10) {
          setActiveStageIdx(i);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stages]);

  const activeStage = stages[activeStageIdx];

  // Determine theme color based on planet and global theme
  const getThemeColor = () => {
    if (currentPlanet === "实战星球") return "blue";
    return theme;
  };

  // Get stage gradient based on theme and stage index
  const getStageGradient = (stageIdx: number) => {
    if (currentPlanet === "实战星球") {
      // 实战星球使用蓝色系
      const blueGradients = [
        "from-blue-400 to-indigo-600",
        "from-red-400 to-red-600",
        "from-green-400 to-green-600"
      ];
      return blueGradients[stageIdx] || blueGradients[0];
    }

    // 产品星球根据主题使用橙色系或绿色系
    if (theme === "orange") {
      const orangeGradients = [
        "from-yellow-400 to-orange-500",
        "from-orange-400 to-orange-600",
        "from-blue-400 to-blue-600"
      ];
      return orangeGradients[stageIdx] || orangeGradients[0];
    } else {
      const greenGradients = [
        "from-teal-400 to-emerald-500",
        "from-emerald-400 to-teal-600",
        "from-cyan-400 to-teal-600"
      ];
      return greenGradients[stageIdx] || greenGradients[0];
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen pb-40 pt-[112px]">

      {/* Fixed Active Stage Header */}
      <div
        className={clsx(
          "fixed top-[112px] left-1/2 -translate-x-1/2 w-full max-w-md px-6 py-4 flex items-center justify-between shadow-xl border-b-4 backdrop-blur-md bg-white rounded-b-[2.5rem] transition-all duration-500 z-[140]",
          theme === "orange" ? "border-orange-50" : "border-teal-50"
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
             <div
               className="w-2 h-2 rounded-full animate-pulse"
               style={{ backgroundColor: currentPlanet === "实战星球" ? "#3B82F6" : colors.primary }}
             />
             <span
               className="text-xs font-black uppercase tracking-[0.2em]"
               style={{ color: currentPlanet === "实战星球" ? "#3B82F6" : colors.primary }}
             >
               第 {activeStageIdx + 1} 阶段
             </span>
          </div>
          <h2 className="text-xl font-black text-gray-800 tracking-tight leading-none">
            {activeStage.title.split('：')[1] || activeStage.title}
          </h2>
        </div>
        <div
          className={clsx(
            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br transition-transform active:scale-95",
            getStageGradient(activeStageIdx)
          )}
          style={{
            borderBottom: `4px solid ${theme === "orange" ? "rgba(251, 146, 60, 0.3)" : "rgba(45, 212, 191, 0.3)"}`
          }}
        >
          <Zap size={28} className="text-white drop-shadow-sm fill-white/20" />
        </div>
      </div>

      {stages.map((stage, sIdx) => {
        const isOddStage = (sIdx + 1) % 2 !== 0;

        return (
          <section
            key={sIdx}
            className="w-full flex flex-col items-center"
          >
            {/* Stage Header */}
            <div
              ref={(el) => (headerRefs.current[sIdx] = el)}
              className={clsx(
                "relative w-full max-w-md px-6 py-3 flex items-center justify-center mb-6 opacity-40 transition-all duration-500",
                sIdx === 0 ? "-mt-28" : "-mt-16"
              )}
            >
              <span className="text-xl font-black text-gray-500">
                第 {sIdx + 1} 阶段
              </span>
            </div>

            {/* Stage Path Nodes */}
            <div className="flex flex-col items-center w-full max-w-md relative gap-8 pb-12">
              {(() => {
                const mandatoryNodes = stage.nodes.filter(n => !n.isBonus);
                const bonusNode = stage.nodes.find(n => n.isBonus);

                return (
                  <>
                    {mandatoryNodes.map((node, mIdx) => {
                      let currentSide: "left" | "center" | "right" = "center";
                      if (mIdx === 1) {
                        currentSide = isOddStage ? "right" : "left";
                      }

                      if (mIdx === 1 && bonusNode) {
                        return (
                          <div key={node.id} className="w-full flex items-center">
                            <div className="flex-1 flex justify-center">
                              {isOddStage ? (
                                <SkillNode
                                  id={bonusNode.id}
                                  title={bonusNode.title}
                                  Icon={bonusNode.Icon}
                                  status={bonusNode.status as any}
                                  illustration={bonusNode.illustration}
                                  stars={bonusNode.stars}
                                  isBonus={true}
                                  side="center"
                                  themeColor={currentPlanet === "实战星球" ? "blue" : theme}
                                />
                              ) : (
                                <SkillNode
                                  id={node.id}
                                  title={node.title}
                                  Icon={node.Icon}
                                  status={node.status as any}
                                  level={node.level}
                                  maxLevel={node.maxLevel}
                                  isLegendary={isLegendary(node.id)}
                                  side="center"
                                  themeColor={currentPlanet === "实战星球" ? "blue" : theme}
                                  onShowOptions={node.status === "completed" ? () => setActiveSheet({ id: node.id, title: node.title, Icon: node.Icon }) : undefined}
                                />
                              )}
                            </div>
                            <div className="flex-1 flex justify-center">
                              {isOddStage ? (
                                <SkillNode
                                  id={node.id}
                                  title={node.title}
                                  Icon={node.Icon}
                                  status={node.status as any}
                                  level={node.level}
                                  maxLevel={node.maxLevel}
                                  isLegendary={isLegendary(node.id)}
                                  side="center"
                                  themeColor={currentPlanet === "实战星球" ? "blue" : theme}
                                  onShowOptions={node.status === "completed" ? () => setActiveSheet({ id: node.id, title: node.title, Icon: node.Icon }) : undefined}
                                />
                              ) : (
                                <SkillNode
                                  id={bonusNode.id}
                                  title={bonusNode.title}
                                  Icon={bonusNode.Icon}
                                  status={bonusNode.status as any}
                                  illustration={bonusNode.illustration}
                                  stars={bonusNode.stars}
                                  isBonus={true}
                                  side="center"
                                  themeColor={currentPlanet === "实战星球" ? "blue" : theme}
                                />
                              )}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={node.id} className="relative w-full flex flex-col items-center">
                          <SkillNode
                            id={node.id}
                            title={node.title}
                            Icon={node.Icon}
                            status={node.status as any}
                            level={node.level}
                            maxLevel={node.maxLevel}
                            isLegendary={isLegendary(node.id)}
                            side={currentSide}
                            themeColor={currentPlanet === "实战星球" ? "blue" : theme}
                            onShowOptions={node.status === "completed" ? () => setActiveSheet({ id: node.id, title: node.title, Icon: node.Icon }) : undefined}
                          />
                        </div>
                      );
                    })}
                  </>
                );
              })()}
            </div>
          </section>
        );
      })}

      {/* Legend / Footer without emojis */}
      <div className="w-full max-w-md px-6 py-12">
        <motion.div
          whileHover={{ y: -5 }}
          className={clsx(
            "bg-white border-2 rounded-[3rem] p-8 text-center shadow-2xl relative overflow-hidden group",
            theme === "orange" ? "border-orange-100" : "border-teal-100"
          )}
        >
          <div
            className={clsx(
              "absolute -top-10 -right-10 w-32 h-32 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10",
              theme === "orange" ? "bg-orange-50" : "bg-teal-50"
            )}
          />
          <div className="flex justify-center gap-1 mb-4">
             <Star size={24} style={{ color: theme === "orange" ? "#FB923C" : "#5EEAD4" }} className="fill-current" />
             <Star size={24} style={{ color: theme === "orange" ? "#FB923C" : "#5EEAD4" }} className="fill-current" />
             <Star size={24} style={{ color: theme === "orange" ? "#FB923C" : "#5EEAD4" }} className="fill-current" />
          </div>
          <h4 className="font-black text-gray-800 text-xl mb-2 tracking-tight">传奇挑战正在解锁</h4>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
            完成所有阶段以开启<span style={{ color: colors.primary }}>知识巅峰对决</span>
          </p>
        </motion.div>
      </div>

      {/* Legendary Options Sheet */}
      {activeSheet && (
        <LegendarySheet
          open={!!activeSheet}
          nodeId={activeSheet.id}
          nodeTitle={activeSheet.title}
          Icon={activeSheet.Icon}
          themeColor={currentPlanet === "实战星球" ? "blue" : theme}
          onClose={() => setActiveSheet(null)}
        />
      )}
    </div>
  );
}