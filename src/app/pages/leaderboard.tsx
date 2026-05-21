import { motion } from "motion/react";
import { Trophy, Medal, Crown, Star, ArrowUpRight, ArrowDownRight, Minus, User } from "lucide-react";
import { clsx } from "clsx";

const MOCK_LEADERBOARD = [
  { id: 1, name: "张明", score: 12450, rank: 1, avatar: null, change: "up" },
  { id: 2, name: "李华", score: 11820, rank: 2, avatar: null, change: "up" },
  { id: 3, name: "王伟", score: 11200, rank: 3, avatar: null, change: "down" },
  { id: 4, name: "赵雷", score: 9800, rank: 4, avatar: null, change: "same" },
  { id: 5, name: "陈静", score: 9540, rank: 5, avatar: null, change: "up" },
  { id: 6, name: "刘洋", score: 8900, rank: 6, avatar: null, change: "down" },
  { id: 7, name: "孙悦", score: 8700, rank: 7, avatar: null, change: "same" },
];

export function Leaderboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="relative h-64 w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-b-[3rem] shadow-[0_15px_40px_rgba(255,140,0,0.3)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
            <Trophy size={40} className="text-white drop-shadow-md" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-black text-white tracking-tight">星际排行榜</h1>
            <p className="text-orange-100 font-bold text-xs">全服实时销售菁英排名</p>
          </div>
        </motion.div>
      </div>

      {/* Top 3 Podiums */}
      <div className="flex justify-center items-end gap-4 -mt-10 px-4 relative z-20 mb-12">
        {/* 2nd Place */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-3 w-1/3"
        >
          <div className="relative group">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl border-4 border-gray-100 flex items-center justify-center overflow-hidden">
               <User className="text-gray-300" size={32} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center shadow-md">
              <Medal size={14} className="text-gray-600" />
            </div>
          </div>
          <div className="text-center">
             <div className="text-xs font-black text-gray-800">李华</div>
             <div className="text-xs font-bold text-orange-500 uppercase">11,820 pt</div>
          </div>
          <div className="w-full h-16 bg-white border-b-4 border-gray-100 rounded-t-2xl shadow-lg flex items-center justify-center">
             <span className="text-xl font-black text-gray-300">2</span>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ scale: 0.9, y: 0, opacity: 0 }}
          animate={{ scale: 1.1, y: -20, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center gap-3 w-1/3"
        >
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
               <motion.div
                 animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 4 }}
               >
                 <Crown className="text-yellow-400 fill-yellow-400 drop-shadow-lg" size={32} />
               </motion.div>
            </div>
            <div className="w-20 h-20 rounded-[2rem] bg-white shadow-[0_15px_30px_rgba(255,140,0,0.2)] border-4 border-orange-400 flex items-center justify-center overflow-hidden ring-4 ring-orange-50 ring-offset-2">
               <User className="text-orange-200" size={40} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-orange-500 border-4 border-white flex items-center justify-center shadow-md">
              <Star size={18} className="text-white fill-white" />
            </div>
          </div>
          <div className="text-center pt-2">
             <div className="text-base font-black text-gray-800">张明</div>
             <div className="text-xs font-black text-orange-500 uppercase tracking-wider">12,450 pt</div>
          </div>
          <div className="w-full h-24 bg-gradient-to-t from-orange-50 to-white border-b-4 border-orange-200 rounded-t-3xl shadow-2xl flex items-center justify-center">
             <span className="text-xl font-black text-orange-500">1</span>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-3 w-1/3"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl border-4 border-gray-100 flex items-center justify-center overflow-hidden">
               <User className="text-gray-300" size={32} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-orange-100 border-4 border-white flex items-center justify-center shadow-md">
              <Medal size={14} className="text-orange-400" />
            </div>
          </div>
          <div className="text-center">
             <div className="text-xs font-black text-gray-800">王伟</div>
             <div className="text-xs font-bold text-orange-500 uppercase">11,200 pt</div>
          </div>
          <div className="w-full h-12 bg-white border-b-4 border-gray-100 rounded-t-2xl shadow-lg flex items-center justify-center">
             <span className="text-xl font-black text-gray-300">3</span>
          </div>
        </motion.div>
      </div>

      {/* List */}
      <div className="px-6 flex flex-col gap-3">
        {MOCK_LEADERBOARD.slice(3).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (idx + 1) }}
            className="group flex items-center gap-4 p-4 bg-white rounded-3xl border-b-4 border-gray-100 shadow-sm active:border-b-0 active:translate-y-1 transition-all"
          >
            <div className="w-8 flex justify-center font-black text-gray-400 group-hover:text-orange-500 transition-colors">
              {item.rank}
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-300">
               <User size={24} />
            </div>
            <div className="flex-1">
               <div className="font-black text-[16px] text-gray-800">{item.name}</div>
               <div className="text-[12px] font-bold text-gray-400 uppercase tracking-tighter">
                 {item.score.toLocaleString()} 积分
               </div>
            </div>
            <div className="flex flex-col items-end gap-1">
               {item.change === "up" && <ArrowUpRight size={18} className="text-green-500" />}
               {item.change === "down" && <ArrowDownRight size={18} className="text-red-500" />}
               {item.change === "same" && <Minus size={18} className="text-gray-300" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* My Rank Card (Sticky) */}
      <div className="fixed bottom-24 left-6 right-6 z-40">
         <motion.div
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="bg-white/70 backdrop-blur-2xl border-2 border-orange-200/50 p-5 rounded-[2.5rem] shadow-2xl flex items-center gap-5"
         >
            <div className="relative">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg">
                  <User size={32} />
               </div>
               <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-white border-4 border-orange-100 flex items-center justify-center font-black text-orange-500 text-xs shadow-md">
                  42
               </div>
            </div>
            <div className="flex-1">
               <div className="font-black text-gray-800 text-base leading-tight">我 (你)</div>
               <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-orange-500">前 5% 销售菁英</span>
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-xs font-bold text-gray-400">差 150 pt 升至下一名</span>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xl font-black text-orange-500 tracking-tighter">4,280</div>
               <div className="text-xs font-black text-gray-400 uppercase">当前得分</div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}