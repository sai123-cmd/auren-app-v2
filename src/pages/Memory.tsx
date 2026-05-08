import type { FC } from 'react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Stack,
  CalendarBlank,
  Trophy,
  Sun,
  Play,
  CaretLeft,
  CaretRight,
  Lock,
  Star,
  Tree,
  Fire,
  Heart,
  Moon,
  Cake,
  PersonSimpleRun,
  TennisBall,
  Mountains,
  ForkKnife,
  Users,
} from 'phosphor-react';
import Layout from '../components/Layout';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TabKey = 'timeline' | 'collections' | 'calendar' | 'badges';

interface TimelineStory {
  id: string;
  date: string;
  monthDay: string;
  weekday: string;
  isToday: boolean;
  title: string;
  excerpt: string;
  duration: string;
  interactions: number;
  mood: string;
  thumbnailColor: string;
}

interface Collection {
  id: string;
  title: string;
  count: number;
  icon: React.ReactNode;
  gradient: string;
  thumbnailColors: string[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  icon: React.ReactNode;
  color: string;
  isNew?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'timeline', label: '时间线', icon: <Clock size={16} weight="regular" /> },
  { key: 'collections', label: '合集', icon: <Stack size={16} weight="regular" /> },
  { key: 'calendar', label: '日历', icon: <CalendarBlank size={16} weight="regular" /> },
  { key: 'badges', label: '徽章', icon: <Trophy size={16} weight="regular" /> },
];

const TIMELINE_DATA: TimelineStory[] = [
  {
    id: '1',
    date: '2024-03-15',
    monthDay: '3/15',
    weekday: '周五',
    isToday: true,
    title: '奔跑在夕阳下',
    excerpt: '今天下午带TA去了中央公园，夕阳把草地染成金色。TA追着飞盘跑了整整三圈，最后趴在我脚边喘着气，尾巴还摇个不停...',
    duration: '2:34',
    interactions: 12,
    mood: '开心',
    thumbnailColor: 'bg-amber/20',
  },
  {
    id: '2',
    date: '2024-03-14',
    monthDay: '3/14',
    weekday: '周四',
    isToday: false,
    title: '雨天的午后',
    excerpt: '外面下着小雨，TA趴在窗台上看了很久的雨。我给它裹了一条毛毯，它竟然就这样睡着了，还打起了小呼噜...',
    duration: '1:48',
    interactions: 8,
    mood: '慵懒',
    thumbnailColor: 'bg-sky/20',
  },
  {
    id: '3',
    date: '2024-03-13',
    monthDay: '3/13',
    weekday: '周三',
    isToday: false,
    title: '第一次交到朋友',
    excerpt: '在宠物聚会遇到了一只金毛，两只狗狗一见如故。它们分享了玩具，还在草地上打滚，最后难舍难分地告别...',
    duration: '3:12',
    interactions: 24,
    mood: '兴奋',
    thumbnailColor: 'bg-coral/20',
  },
  {
    id: '4',
    date: '2024-03-12',
    monthDay: '3/12',
    weekday: '周二',
    isToday: false,
    title: '偷吃被抓现场',
    excerpt: '我只是转身去拿个快递，回来就发现TA把桌上的三明治咬了一口。那表情——又委屈又得意，真是让人哭笑不得...',
    duration: '1:25',
    interactions: 15,
    mood: '调皮',
    thumbnailColor: 'bg-warn/20',
  },
  {
    id: '5',
    date: '2024-03-11',
    monthDay: '3/11',
    weekday: '周一',
    isToday: false,
    title: '清晨的散步',
    excerpt: '六点半就醒了，TA在床边轻轻扒拉我的手。清晨的空气特别清新，小区里只有我们两个人——不，一人一狗...',
    duration: '2:05',
    interactions: 6,
    mood: '平静',
    thumbnailColor: 'bg-sage/20',
  },
  {
    id: '6',
    date: '2024-03-10',
    monthDay: '3/10',
    weekday: '周日',
    isToday: false,
    title: '周末大扫除',
    excerpt: '我在打扫卫生，TA以为我在和它玩。它追着扫把跑，还试图"帮忙"叼走垃圾袋。最后累瘫在沙发底下，只露出一个鼻子...',
    duration: '1:56',
    interactions: 10,
    mood: '好奇',
    thumbnailColor: 'bg-blush/30',
  },
  {
    id: '7',
    date: '2024-03-09',
    monthDay: '3/9',
    weekday: '周六',
    isToday: false,
    title: '公园野餐日',
    excerpt: '带TA去湖边野餐，它对所有食物都感兴趣。最后专门给它带了狗狗蛋糕，吃得满脸都是，还不忘对我摇尾巴...',
    duration: '2:48',
    interactions: 18,
    mood: '满足',
    thumbnailColor: 'bg-amber/15',
  },
];

const COLLECTIONS_DATA: Collection[] = [
  {
    id: '1',
    title: '奔跑',
    count: 12,
    icon: <PersonSimpleRun size={24} weight="fill" className="text-amber" />,
    gradient: 'from-amber/30 to-coral/20',
    thumbnailColors: ['bg-amber/30', 'bg-coral/20', 'bg-warn/25', 'bg-amber/20'],
  },
  {
    id: '2',
    title: '玩耍',
    count: 8,
    icon: <TennisBall size={24} weight="fill" className="text-sage" />,
    gradient: 'from-sage/30 to-sky/20',
    thumbnailColors: ['bg-sage/30', 'bg-sky/20', 'bg-sage/25', 'bg-amber/15'],
  },
  {
    id: '3',
    title: '户外',
    count: 15,
    icon: <Mountains size={24} weight="fill" className="text-sky" />,
    gradient: 'from-sky/30 to-sage/20',
    thumbnailColors: ['bg-sky/30', 'bg-sage/20', 'bg-amber/15', 'bg-sky/25'],
  },
  {
    id: '4',
    title: '美食',
    count: 6,
    icon: <ForkKnife size={24} weight="fill" className="text-coral" />,
    gradient: 'from-coral/30 to-warn/20',
    thumbnailColors: ['bg-coral/30', 'bg-warn/20', 'bg-coral/25', 'bg-amber/15'],
  },
  {
    id: '5',
    title: '交友',
    count: 9,
    icon: <Users size={24} weight="fill" className="text-amber" />,
    gradient: 'from-amber/25 to-blush/30',
    thumbnailColors: ['bg-amber/25', 'bg-blush/30', 'bg-coral/20', 'bg-amber/20'],
  },
];

const BADGES_DATA: Badge[] = [
  {
    id: '1',
    name: '首次公园',
    description: '记录第一次公园出行',
    earned: true,
    earnedDate: '3/12',
    icon: <Tree size={32} weight="fill" className="text-sage" />,
    color: 'bg-sage/20',
    isNew: false,
  },
  {
    id: '2',
    name: '连续7天',
    description: '连续记录7天',
    earned: true,
    earnedDate: '3/14',
    icon: <Fire size={32} weight="fill" className="text-amber" />,
    color: 'bg-amber/20',
    isNew: true,
  },
  {
    id: '3',
    name: '100次高光',
    description: '累计获得100次互动',
    earned: true,
    earnedDate: '3/10',
    icon: <Star size={32} weight="fill" className="text-warn" />,
    color: 'bg-warn/20',
    isNew: false,
  },
  {
    id: '4',
    name: '首次交友',
    description: '记录第一次宠物交友',
    earned: true,
    earnedDate: '3/13',
    icon: <Heart size={32} weight="fill" className="text-coral" />,
    color: 'bg-coral/20',
    isNew: true,
  },
  {
    id: '5',
    name: '夜狗子',
    description: '在晚上10点后记录',
    earned: true,
    earnedDate: '3/08',
    icon: <Moon size={32} weight="fill" className="text-sky" />,
    color: 'bg-sky/20',
    isNew: false,
  },
  {
    id: '6',
    name: '早起鸟',
    description: '在早上7点前记录',
    earned: true,
    earnedDate: '3/11',
    icon: <Sun size={32} weight="fill" className="text-amber" />,
    color: 'bg-amber/20',
    isNew: false,
  },
  {
    id: '7',
    name: '生日惊喜',
    description: '记录TA的生日',
    earned: false,
    icon: <Cake size={32} weight="fill" className="text-sand" />,
    color: 'bg-cream',
  },
  {
    id: '8',
    name: '马拉松',
    description: '累计奔跑10公里',
    earned: false,
    icon: <PersonSimpleRun size={32} weight="fill" className="text-sand" />,
    color: 'bg-cream',
  },
  {
    id: '9',
    name: '社交达人',
    description: '交到10个朋友',
    earned: false,
    icon: <Users size={32} weight="fill" className="text-sand" />,
    color: 'bg-cream',
  },
];

/* ------------------------------------------------------------------ */
/*  Calendar Helpers                                                    */
/* ------------------------------------------------------------------ */

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function getToday(): { year: number; month: number; day: number } {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

// Mock recorded days for March 2024 (1-indexed)
const RECORDED_DAYS = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 20, 22, 23, 24, 25, 27, 28, 29,
]);

/* ------------------------------------------------------------------ */
/*  Segmented Control                                                  */
/* ------------------------------------------------------------------ */

interface SegmentedControlProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

const SegmentedControl: FC<SegmentedControlProps> = ({ activeTab, onChange }) => {
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);

  return (
    <div className="relative flex items-center bg-warmWhite rounded-xl p-1 shadow-[0_2px_16px_rgba(61,43,31,0.06)]">
      {/* Animated background pill */}
      <motion.div
        className="absolute top-1 bottom-1 bg-amber/15 rounded-lg"
        initial={false}
        animate={{
          x: activeIndex * 100 + '%',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        style={{ width: '25%' }}
      />
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1 py-2.5 text-[13px] font-medium transition-colors duration-200 rounded-lg ${
              isActive ? 'text-amber' : 'text-taupe hover:text-espresso'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Timeline View                                                      */
/* ------------------------------------------------------------------ */

const TimelineView: FC = () => {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-[22px] top-0 bottom-0 w-px bg-sand/60" />

      <div className="flex flex-col gap-6">
        {TIMELINE_DATA.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
              ease: [0, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="flex gap-4"
          >
            {/* Date marker with timeline node */}
            <div className="flex flex-col items-center shrink-0 w-11">
              <div
                className={`w-2.5 h-2.5 rounded-full border-2 z-10 ${
                  story.isToday
                    ? 'bg-amber border-amber'
                    : 'bg-cream border-sand'
                }`}
              />
              <span className="text-[11px] font-medium text-taupe mt-1.5 leading-tight text-center">
                {story.monthDay}
              </span>
              <span className="text-[10px] text-sand mt-0.5">{story.weekday}</span>
            </div>

            {/* Story card */}
            <div className="flex-1 bg-warmWhite rounded-2xl p-3 shadow-[0_2px_16px_rgba(61,43,31,0.06)] flex gap-3 active:scale-[0.98] transition-transform">
              {/* Thumbnail */}
              <div
                className={`w-20 h-20 rounded-xl ${story.thumbnailColor} shrink-0 flex items-center justify-center overflow-hidden`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Play size={20} weight="fill" className="text-espresso/40" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                <div>
                  <h3 className="text-[15px] font-semibold text-espresso leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-[12px] text-taupe mt-1 leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-sand mt-1.5">
                  <span className="flex items-center gap-0.5">
                    <Play size={12} weight="fill" />
                    {story.duration}
                  </span>
                  <span>·</span>
                  <span>{story.interactions} 次互动</span>
                  <span>·</span>
                  <span className="text-amber">{story.mood}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Collections View                                                   */
/* ------------------------------------------------------------------ */

const CollectionsView: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {COLLECTIONS_DATA.map((collection, index) => (
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.08,
            ease: [0, 0, 0.2, 1] as [number, number, number, number],
          }}
          whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(61, 43, 31, 0.10)' }}
          className={`bg-gradient-to-br ${collection.gradient} rounded-2xl p-4 shadow-[0_2px_16px_rgba(61,43,31,0.06)] cursor-pointer active:scale-[0.98] transition-shadow`}
        >
          {/* Header: icon + title */}
          <div className="flex items-center gap-2 mb-3">
            {collection.icon}
            <span className="text-[15px] font-semibold text-espresso">
              {collection.title}
            </span>
          </div>

          {/* 2x2 thumbnail grid */}
          <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden mb-3 aspect-square">
            {collection.thumbnailColors.map((color, i) => (
              <div
                key={i}
                className={`${color} aspect-square flex items-center justify-center`}
              >
                {i === 0 && (
                  <Play size={14} weight="fill" className="text-espresso/30" />
                )}
              </div>
            ))}
          </div>

          {/* Footer: story count */}
          <span className="text-[12px] text-taupe font-medium">
            {collection.count} 个故事
          </span>
        </motion.div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Calendar View                                                      */
/* ------------------------------------------------------------------ */

const CalendarView: FC = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(2); // March (0-indexed)
  const [prompt, setPrompt] = useState<string | null>(null);

  const today = getToday();
  const isCurrentMonth = year === today.year && month === today.month;

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const hasRecord = RECORDED_DAYS.has(day);
    if (!hasRecord) {
      setPrompt('这天TA没被记录，去看看发生了什么？');
      setTimeout(() => setPrompt(null), 2500);
    }
  };

  const monthName = `${year}年${month + 1}月`;

  // Calculate stats for the mock data
  const recordedCount = useMemo(() => {
    let count = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      if (RECORDED_DAYS.has(d)) count++;
    }
    return count;
  }, [daysInMonth]);

  return (
    <div>
      {/* Month header with navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevMonth}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-warmWhite shadow-[0_2px_16px_rgba(61,43,31,0.06)] text-taupe hover:text-espresso transition-colors"
        >
          <CaretLeft size={18} weight="bold" />
        </motion.button>
        <motion.h2
          key={monthName}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[18px] font-semibold text-espresso"
        >
          {monthName}
        </motion.h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleNextMonth}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-warmWhite shadow-[0_2px_16px_rgba(61,43,31,0.06)] text-taupe hover:text-espresso transition-colors"
        >
          <CaretRight size={18} weight="bold" />
        </motion.button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-[12px] font-medium text-taupe py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const hasRecord = RECORDED_DAYS.has(day);
          const isToday = isCurrentMonth && day === today.day;

          return (
            <motion.button
              key={day}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDayClick(day)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-colors ${
                isToday
                  ? 'ring-2 ring-amber bg-blush/50'
                  : hasRecord
                    ? 'bg-warmWhite hover:bg-blush/30'
                    : 'bg-cream/50 hover:bg-blush/20'
              }`}
            >
              <span
                className={`text-[13px] font-medium ${
                  isToday
                    ? 'text-espresso'
                    : hasRecord
                      ? 'text-espresso'
                      : 'text-sand'
                }`}
              >
                {day}
              </span>
              {hasRecord && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.02 + 0.1, type: 'spring', stiffness: 500 }}
                  className="mt-0.5"
                >
                  <Sun size={12} weight="fill" className="text-amber" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Monthly stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-5 flex items-center justify-around bg-warmWhite rounded-xl p-3 shadow-[0_2px_16px_rgba(61,43,31,0.06)]"
      >
        <div className="text-center">
          <div className="text-[16px] font-semibold text-espresso">{recordedCount}天</div>
          <div className="text-[11px] text-taupe mt-0.5">本月记录</div>
        </div>
        <div className="w-px h-8 bg-sand/40" />
        <div className="text-center">
          <div className="flex items-center gap-1">
            <span className="text-[16px] font-semibold text-espresso">7天</span>
            <Fire size={14} weight="fill" className="text-amber" />
          </div>
          <div className="text-[11px] text-taupe mt-0.5">连续记录</div>
        </div>
        <div className="w-px h-8 bg-sand/40" />
        <div className="text-center">
          <div className="text-[16px] font-semibold text-espresso">5篇</div>
          <div className="text-[11px] text-taupe mt-0.5">精彩故事</div>
        </div>
      </motion.div>

      {/* Prompt for empty days */}
      <AnimatePresence>
        {prompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-3 bg-espresso/90 text-white text-[13px] py-2.5 px-4 rounded-full text-center shadow-lg"
          >
            {prompt}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Badges View                                                        */
/* ------------------------------------------------------------------ */

const BadgesView: FC = () => {
  const earnedBadges = BADGES_DATA.filter((b) => b.earned);
  const lockedBadges = BADGES_DATA.filter((b) => !b.earned);

  return (
    <div className="flex flex-col gap-6">
      {/* Earned section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-espresso">
            已获得 <span className="text-amber">{earnedBadges.length}</span>/{BADGES_DATA.length}
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {earnedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 12, rotateZ: -5 }}
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-warmWhite rounded-2xl p-3 shadow-[0_2px_16px_rgba(61,43,31,0.06)] flex flex-col items-center cursor-pointer"
            >
              {/* Shimmer effect for earned badges */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
              </div>

              {/* NEW badge */}
              {badge.isNew && (
                <span className="absolute -top-1 -right-1 bg-coral text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm z-10">
                  NEW
                </span>
              )}

              {/* Icon area */}
              <div
                className={`w-14 h-14 rounded-full ${badge.color} flex items-center justify-center mb-2`}
              >
                {badge.icon}
              </div>

              {/* Name */}
              <span className="text-[12px] font-medium text-espresso text-center leading-tight">
                {badge.name}
              </span>

              {/* Date */}
              {badge.earnedDate && (
                <span className="text-[10px] text-sand mt-1">{badge.earnedDate}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked section */}
      <div>
        <h3 className="text-[15px] font-semibold text-taupe mb-3">待解锁</h3>
        <div className="grid grid-cols-3 gap-3">
          {lockedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: (earnedBadges.length + index) * 0.06,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="bg-cream rounded-2xl p-3 flex flex-col items-center"
            >
              {/* Lock icon area */}
              <div className="w-14 h-14 rounded-full bg-sand/20 flex items-center justify-center mb-2">
                <Lock size={20} weight="fill" className="text-sand" />
              </div>

              {/* Name (dimmed) */}
              <span className="text-[12px] font-medium text-sand text-center leading-tight">
                {badge.name}
              </span>

              {/* Unlock condition */}
              <span className="text-[10px] text-sand/70 mt-1 text-center leading-tight">
                {badge.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Memory Page                                                   */
/* ------------------------------------------------------------------ */

const Memory: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('timeline');

  return (
    <Layout title="回忆" activeTab="memory">
      <div className="pt-[48px] pb-[64px] px-6">
        {/* Segmented Control */}
        <div className="sticky top-[48px] z-40 pt-3 pb-2 bg-cream/95 backdrop-blur-sm -mx-6 px-6">
          <SegmentedControl activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Content area */}
        <div className="mt-4 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'timeline' && <TimelineView />}
              {activeTab === 'collections' && <CollectionsView />}
              {activeTab === 'calendar' && <CalendarView />}
              {activeTab === 'badges' && <BadgesView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Memory;
