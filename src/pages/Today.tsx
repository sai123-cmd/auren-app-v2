import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Play, CaretRight, CloudSun, PersonSimpleWalk, Smiley } from 'phosphor-react';
import Layout from '../components/Layout';
import LocationCard from '../components/LocationCard';
import AlertBanner from '../components/AlertBanner';

// Soft Reveal animation variant
const softReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay,
      ease: [0, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

const Today: FC = () => {
  const [showAlert] = useState(false);
  const [dateStr, setDateStr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekDay = weekDays[now.getDay()];
    setDateStr(`${month}月${day}日 ${weekDay}`);
  }, []);

  const comicImages = [
    '/story-comic-1.png',
    '/story-comic-2.png',
    '/story-comic-3.png',
    '/story-comic-4.png',
  ];

  return (
    <Layout title={dateStr || 'TA的一天'} activeTab="today">
      {/* Alert Banner */}
      <AlertBanner
        message="Bella 的位置已长时间未更新"
        visible={showAlert}
        type="alert"
      />

      <div className="pt-2 space-y-6">
        {/* Location Card */}
        <motion.div custom={0.1} variants={softReveal} initial="hidden" animate="visible">
          <LocationCard
            status="safe"
            location="Bella在家"
            battery={78}
            time="刚刚更新"
            onClick={() => navigate('/find-pet-detail')}
          />
        </motion.div>

        {/* Welcome Message */}
        <motion.p
          custom={0.2}
          variants={softReveal}
          initial="hidden"
          animate="visible"
          className="text-espresso text-base leading-relaxed"
        >
          嗨，我是Bella 🐾 这是我的今天~
        </motion.p>

        {/* Vlog Cover Card */}
        <motion.div
          custom={0.3}
          variants={softReveal}
          initial="hidden"
          animate="visible"
          className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden shadow-[0_2px_16px_rgba(61,43,31,0.06)]"
        >
          <img
            src="/story-vlog-cover-1.png"
            alt="今天的Vlog"
            className="w-full h-full object-cover"
          />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />

          {/* Play button */}
          <motion.button
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-amber rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(61,43,31,0.10)]"
          >
            <Play size={24} weight="fill" className="text-white ml-1" />
          </motion.button>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 bg-espresso/60 px-2 py-1 rounded-lg">
            <span className="text-white text-xs font-medium">02:34</span>
          </div>

          {/* Title */}
          <div className="absolute bottom-3 left-3">
            <h3 className="text-white text-lg font-semibold">今天的奔跑日记</h3>
          </div>
        </motion.div>

        {/* First-person Diary */}
        <motion.div
          custom={0.4}
          variants={softReveal}
          initial="hidden"
          animate="visible"
          className="pl-3 border-l-[3px] border-amber"
        >
          <p className="text-espresso text-base leading-[1.7] font-serif">
            今天早上的阳光透过窗帘洒进来，
            我懒洋洋地伸了个懒腰。
            妈妈给我准备了最爱的鸡肉罐头，
            那味道… 简直让本汪飘飘欲仙！
          </p>
          <p className="text-espresso text-base leading-[1.7] font-serif mt-3">
            下午去公园追了三只松鼠，
            虽然一只都没追到，
            但那种奔跑的感觉真是太棒了。
            现在趴在自己的小窝里，
            觉得今天又是完美的一天 🐾
          </p>
        </motion.div>

        {/* 4-panel Comic Grid */}
        <motion.div
          custom={0.5}
          variants={softReveal}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-2"
        >
          {comicImages.map((src, index) => (
            <motion.div
              key={index}
              custom={0.5 + index * 0.1}
              variants={softReveal}
              initial="hidden"
              animate="visible"
              className="aspect-square rounded-[12px] overflow-hidden saturate-[0.9] active:saturate-100 active:scale-[0.98] transition-all"
            >
              <img
                src={src}
                alt={`漫画第${index + 1}格`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Story Meta Info */}
        <motion.div
          custom={0.6}
          variants={softReveal}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-6 h-10"
        >
          <div className="flex items-center gap-1.5 text-taupe">
            <CloudSun size={16} weight="regular" />
            <span className="text-xs">晴朗 18°C</span>
          </div>
          <div className="flex items-center gap-1.5 text-taupe">
            <PersonSimpleWalk size={16} weight="regular" />
            <span className="text-xs">步数 3,428</span>
          </div>
          <div className="flex items-center gap-1.5 text-taupe">
            <Smiley size={16} weight="regular" />
            <span className="text-xs">心情指数 92</span>
          </div>
        </motion.div>

        {/* Bottom CTA Card */}
        <motion.div
          custom={0.7}
          variants={softReveal}
          initial="hidden"
          animate="visible"
          className="bg-blush rounded-[16px] p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <img
              src="/ta-avatar-cute.png"
              alt="Bella"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-espresso text-base">想跟我聊聊今天吗？</span>
          </div>
          <a
            href="#/ta"
            className="flex items-center gap-1 text-amber text-sm font-medium hover:opacity-80 transition-opacity"
          >
            去聊聊天
            <CaretRight size={16} weight="regular" />
          </a>
        </motion.div>

        {/* Yesterday Preview */}
        <motion.div
          custom={0.8}
          variants={softReveal}
          initial="hidden"
          animate="visible"
          className="border-t border-sand pt-4 pb-6"
        >
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-taupe text-sm">昨天 · 3月14日 周四</span>
              <img
                src="/memory-timeline-1.png"
                alt="昨天"
                className="w-[60px] h-[60px] rounded-lg object-cover"
              />
            </div>
            <CaretRight size={16} className="text-taupe" weight="regular" />
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Today;
