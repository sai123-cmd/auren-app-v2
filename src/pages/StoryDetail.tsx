import type { FC } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Pause,
  Heart,
  ShareNetwork,
  ChatTeardropText,
  CloudSun,
  PersonSimpleWalk,
  Smiley
} from 'phosphor-react';
import { useNavigate } from 'react-router';

const StoryDetail: FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const diary = [
    "早上醒来，阳光刚好洒在我的窝里，太舒服啦！",
    "主人给开了鸡肉罐头，那味道…简直让本汪飘飘欲仙。",
    "下午去公园撒欢儿，追了三只松鼠，虽然一只也没追到哈哈哈。",
    "回家瘫在沙发上，这一天真是充实又快乐！"
  ];

  const comics = [
    { src: '/story-comic-1.png', caption: '伸个懒腰，新的一天开始啦' },
    { src: '/story-comic-2.png', caption: '早餐时间，最爱鸡肉罐头' },
    { src: '/story-comic-3.png', caption: '公园追松鼠，失败了但开心' },
    { src: '/story-comic-4.png', caption: '累瘫在沙发上，晚安世界' },
  ];

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-warmWhite/90 backdrop-blur border-b border-sand">
        <div className="flex items-center px-4 h-12">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center -ml-2">
            <ArrowLeft size={24} className="text-espresso" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-espresso pr-6">Today's Story</h1>
        </div>
      </div>

      <div className="pb-24">
        {/* Vlog Player */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full aspect-video bg-dark"
        >
          <img src="/story-vlog-cover-1.png" alt="Vlog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/30 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-amber/90 text-warmWhite flex items-center justify-center backdrop-blur"
            >
              {isPlaying ? <Pause size={28} weight="fill" /> : <Play size={28} weight="fill" className="ml-1" />}
            </button>
          </div>
          <div className="absolute bottom-3 right-3 bg-dark/60 text-warmWhite text-[11px] px-2 py-1 rounded-md">
            02:34
          </div>
          <div className="absolute top-3 left-3 bg-amber/90 text-warmWhite text-[11px] px-2 py-1 rounded-md flex items-center gap-1">
            <Play size={10} weight="fill" />
            Bella's Vlog
          </div>
        </motion.div>

        {/* Story Meta */}
        <div className="px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[12px] text-taupe">
            <CloudSun size={14} />
            <span>晴 24°C</span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-taupe">
            <PersonSimpleWalk size={14} />
            <span>8,432步</span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-taupe">
            <Smiley size={14} />
            <span>开心</span>
          </div>
        </div>

        {/* Diary Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-amber rounded-full" />
            <p className="text-[15px] font-semibold text-espresso">Bella 的日记</p>
          </div>
          <div className="space-y-3">
            {diary.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-[14px] text-espresso leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Comic Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-4 mt-4 bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <p className="text-[15px] font-semibold text-espresso mb-3">今日漫画</p>
          <div className="grid grid-cols-2 gap-2">
            {comics.map((comic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="rounded-xl overflow-hidden"
              >
                <img src={comic.src} alt={comic.caption} className="w-full aspect-square object-cover" />
                <p className="text-[11px] text-taupe text-center mt-1 px-1">{comic.caption}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Date Tag */}
        <div className="mx-4 mt-4 text-center">
          <span className="inline-block bg-cream text-taupe text-[12px] px-3 py-1 rounded-full">
            2025.05.08 · Bella 的第 267 篇日记
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-warmWhite border-t border-sand z-40">
        <div className="flex items-center px-4 py-3 gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-[14px]"
          >
            <Heart size={22} weight={liked ? 'fill' : 'regular'} className={liked ? 'text-coral' : 'text-taupe'} />
            <span className={liked ? 'text-coral' : 'text-taupe'}>{likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-[14px] text-taupe">
            <ChatTeardropText size={22} />
            <span>12</span>
          </button>
          <button
            onClick={() => navigate('/share')}
            className="flex items-center gap-1.5 text-[14px] text-taupe ml-auto"
          >
            <ShareNetwork size={22} />
            <span>分享</span>
          </button>
        </div>
        <div className="h-[34px]" />
      </div>
    </div>
  );
};

export default StoryDetail;
