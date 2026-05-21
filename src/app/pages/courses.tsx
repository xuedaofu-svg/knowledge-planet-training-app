import { motion } from "motion/react";
import { Play, Headset, Clock, BookOpen, Star, Filter, Search, ChevronRight, PlayCircle, Video, Music } from "lucide-react";
import { clsx } from "clsx";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const COURSES = [
  {
    id: 1,
    title: "极氪 001 产品设计美学",
    type: "video",
    duration: "15:20",
    instructor: "陈大为",
    xp: 250,
    image: "https://images.unsplash.com/photo-1729123447154-d432f4397a82",
    tag: "旗舰车型",
    progress: 45
  },
  {
    id: 2,
    title: "高阶自动驾驶系统讲解",
    type: "audio",
    duration: "08:45",
    instructor: "林晓雪",
    xp: 150,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    tag: "科技前沿",
    progress: 0
  },
  {
    id: 3,
    title: "成交攻坚：异议处理实战",
    type: "video",
    duration: "22:10",
    instructor: "王军",
    xp: 400,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    tag: "进阶销售",
    progress: 80
  },
  {
    id: 4,
    title: "豪华电动车市场趋势分析",
    type: "audio",
    duration: "12:30",
    instructor: "苏珊",
    xp: 200,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tag: "行业视野",
    progress: 15
  }
];

export function Courses() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-32">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b-2 border-orange-50 px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-800 tracking-tight">星际课堂</h1>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm">
              <Filter size={20} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
          {["全部课程", "视频教程", "音频课堂", "产品知识", "销售技巧"].map((tab, i) => (
            <button
              key={tab}
              className={clsx(
                "whitespace-nowrap px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm border-2",
                i === 0 ? "bg-orange-500 border-orange-600 text-white shadow-orange-200" : "bg-white border-gray-100 text-gray-400"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lesson */}
      <div className="px-6 py-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="relative h-60 rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1729123447154-d432f4397a82"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

          <div className="absolute top-6 left-6">
            <div className="px-4 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-black uppercase tracking-[0.2em] shadow-lg">
               今日力荐
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                <Video size={20} />
              </div>
              <span className="text-xs font-bold text-orange-300">极氪 007 全智能座舱深度演示</span>
            </div>
            <h2 className="text-xl font-black tracking-tight leading-tight mb-4">掌握次世代交互体验</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-orange-400" />
                    <span className="text-xs font-bold">18:45</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold">4.9/5.0</span>
                 </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-orange-500 shadow-xl border-b-4 border-orange-200">
                 <Play size={24} className="ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lesson List */}
      <div className="px-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
           <h3 className="text-base font-black text-gray-800 uppercase tracking-tighter">精品课程</h3>
           <button className="text-xs font-bold text-orange-500 flex items-center gap-1">
             查看全部 <ChevronRight size={14} />
           </button>
        </div>

        <div className="grid gap-5">
           {COURSES.map((course) => (
             <motion.div
               key={course.id}
               whileTap={{ scale: 0.98 }}
               className="flex gap-5 p-4 bg-white rounded-[2.5rem] border-b-4 border-gray-100 shadow-sm items-center active:border-b-0 active:translate-y-1 transition-all"
             >
                <div className="relative w-28 h-28 shrink-0 rounded-[2rem] overflow-hidden shadow-inner group">
                   <ImageWithFallback src={course.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {course.type === "video" ? <PlayCircle className="text-white" size={32} /> : <Music className="text-white" size={32} />}
                   </div>
                   <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-black text-white">
                      {course.duration}
                   </div>
                </div>

                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2 mb-1">
                      {course.type === "video" ? <Video size={12} className="text-orange-400" /> : <Headset size={12} className="text-orange-400" />}
                      <span className="text-xs font-black uppercase text-gray-400 tracking-widest">{course.tag}</span>
                   </div>
                   <h4 className="font-black text-gray-800 mb-1 line-clamp-2 leading-tight text-base">{course.title}</h4>
                   <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <span>讲师: {course.instructor}</span>
                      <div className="w-1 h-1 rounded-full bg-gray-200" />
                      <span className="text-orange-500">+{course.xp} XP</span>
                   </div>

                   {course.progress > 0 && (
                     <div className="mt-3 flex flex-col gap-1">
                        <div className="flex justify-between text-xs font-black text-gray-400">
                           <span>已完成 {course.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                           <motion.div
                             initial={{ width: 0 }}
                             animate={{ width: `${course.progress}%` }}
                             className="h-full bg-orange-500 rounded-full"
                           />
                        </div>
                     </div>
                   )}
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}