import { Flame, Trophy, Calendar, Zap, Play, CheckCircle2, Star, Sparkles, Gem, ArrowRight, ShieldCheck, Timer, Gift } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";

// Using Gift icon directly from lucide-react
const GiftIcon = Gift;

const DAILY_CHALLENGES = [
  { id: 1, title: "快速记忆：星越 L 参数", reward: "20", xp: "50", completed: true, Icon: Timer },
  { id: 2, title: "话术纠错：拒绝降价套路", reward: "15", xp: "40", completed: false, Icon: Sparkles },
  { id: 3, title: "听力训练：客户真实意图", reward: "25", xp: "60", completed: false, Icon: ShieldCheck },
];

export function Practice() {
  return (
    <div className="flex flex-col gap-8 p-6 pb-24 bg-white min-h-full">
      {/* Header Card */}
      <section className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-[3rem] p-10 text-white shadow-[0_25px_50px_rgba(30,144,255,0.3)] relative overflow-hidden border-b-[10px] border-blue-800">
        <div className="absolute top-[-30%] right-[-20%] w-72 h-72 bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-black/5 rounded-full blur-[80px]" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-3 bg-white/20 w-fit px-5 py-2 rounded-full border border-white/30 backdrop-blur-xl shadow-lg">
            <Flame size={22} className="fill-blue-300 text-blue-200" strokeWidth={2.5} />
            <span className="font-black text-[12px] uppercase tracking-[0.2em]">连胜挑战中 · 第 7 天</span>
          </div>
          <h1 className="text-[20px] font-black leading-tight tracking-tighter">
            今日实战 <br /> <span className="text-blue-100 opacity-90">目标进度 40%</span>
          </h1>
          <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden border-2 border-white/30 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              className="h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-1000"
            />
          </div>
        </div>
        <div className="absolute bottom-6 right-6 opacity-10">
           <Zap size={140} strokeWidth={3} />
        </div>
      </section>

      {/* Daily Challenges */}
      <section className="flex flex-col gap-6 px-2">
        <h3 className="text-[20px] font-black text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-600"><Calendar size={28} strokeWidth={2.5} /></div>
          每日实战任务
        </h3>

        <div className="flex flex-col gap-5">
          {DAILY_CHALLENGES.map((challenge) => (
            <motion.div
              key={challenge.id}
              whileHover={{ y: -6, scale: 1.02 }}
              className={clsx(
                "p-6 rounded-[2.5rem] border-2 border-b-[8px] transition-all flex items-center gap-5 relative overflow-hidden group",
                challenge.completed
                  ? "bg-gray-50 border-gray-100 opacity-60"
                  : "bg-white border-blue-100 shadow-xl"
              )}
            >
              <div className={clsx(
                "w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-lg border-4 transition-all duration-500",
                challenge.completed
                  ? "bg-gray-100 border-gray-200 text-gray-300"
                  : "bg-gradient-to-br from-blue-400 to-blue-600 border-white/30 text-white group-hover:rotate-12"
              )}>
                {challenge.completed ? <CheckCircle2 size={32} /> : <challenge.Icon size={32} strokeWidth={2.5} />}
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <span className={clsx(
                  "font-black text-[16px] tracking-tight",
                  challenge.completed ? "text-gray-400 line-through" : "text-gray-800"
                )}>
                  {challenge.title}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
                    <Gem size={12} className="text-blue-500 fill-blue-500" />
                    <span className="text-[12px] font-black text-blue-600 uppercase tracking-widest">
                       +{challenge.reward} 宝石
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 shadow-sm">
                    <Zap size={12} className="text-orange-500 fill-orange-500" />
                    <span className="text-[12px] font-black text-orange-600 uppercase tracking-widest">
                       +{challenge.xp} XP
                    </span>
                  </div>
                </div>
              </div>

              {!challenge.completed && (
                <div className="text-blue-300 group-hover:text-blue-500 transition-colors pr-2">
                  <ArrowRight size={24} strokeWidth={3} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rewards / Chests */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-[3rem] p-8 border-2 border-b-[10px] border-blue-200 flex items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-[50px] rotate-45" />
        <div className="flex flex-col gap-2 relative z-10">
          <span className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] bg-white/50 w-fit px-3 py-1 rounded-full border border-blue-200 shadow-sm">下个奖励阶段</span>
          <h4 className="text-base font-black text-blue-900 tracking-tight">青铜传说宝箱</h4>
          <p className="text-xs font-bold text-blue-700/60 flex items-center gap-2">
            <ShieldCheck size={14} strokeWidth={2.5} />
            再完成 2 个挑战即可一键开启
          </p>
        </div>
        <div className="w-20 h-20 bg-white rounded-[1.8rem] flex items-center justify-center shadow-2xl border-4 border-blue-100 text-blue-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
           <GiftIcon size={44} strokeWidth={2.5} />
        </div>
      </section>
    </div>
  );
}