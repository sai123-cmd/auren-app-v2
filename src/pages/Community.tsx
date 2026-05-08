import type { FC } from 'react';
import { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import {
  Heart,
  Plus,
  Trophy,
  Lock,
  Users,
  ChatCircle,
  PawPrint,
  DeviceMobile,
  Sparkle,
  ShareNetwork,
} from 'phosphor-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StoryCard {
  id: number;
  image: string;
  nickname: string;
  likes: number;
  height: 'short' | 'medium' | 'tall';
  liked: boolean;
}

interface TrendingItem {
  id: number;
  rank: number;
  title: string;
  author: string;
  likes: number;
  thumbnail: string;
}

interface ComingSoonFeature {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const mockCards: StoryCard[] = [
  { id: 1, image: '/community-1.png', nickname: '布丁的主人', likes: 128, height: 'tall', liked: false },
  { id: 2, image: '/story-comic-1.png', nickname: '毛茸茸日记', likes: 256, height: 'short', liked: true },
  { id: 3, image: '/story-vlog-cover-1.png', nickname: '柯基小短腿', likes: 64, height: 'medium', liked: false },
  { id: 4, image: '/story-comic-2.png', nickname: '橘狗胖丁', likes: 512, height: 'tall', liked: false },
  { id: 5, image: '/ta-avatar-cute.png', nickname: '豆豆的麻麻', likes: 89, height: 'short', liked: false },
  { id: 6, image: '/story-comic-3.png', nickname: '二哈日常', likes: 345, height: 'medium', liked: true },
  { id: 7, image: '/ta-avatar-ghibli.png', nickname: '吉卜力狗奴', likes: 199, height: 'tall', liked: false },
  { id: 8, image: '/story-comic-4.png', nickname: '金毛大暖男', likes: 77, height: 'short', liked: false },
  { id: 9, image: '/ta-avatar-pixar.png', nickname: '皮克斯小狗', likes: 421, height: 'medium', liked: false },
  { id: 10, image: '/memory-timeline-1.png', nickname: '云朵和棉花糖', likes: 156, height: 'tall', liked: false },
];

const filterTags = ['全部', '狗狗', '狗狗', '小型犬', '大型犬', '奇趣'];

const trendingTabs = ['周榜', '日榜', '漫画榜', '萌宠榜'];

const mockTrendingData: Record<string, TrendingItem[]> = {
  '周榜': [
    { id: 1, rank: 1, title: '布丁的公园冒险日记', author: '布丁的主人', likes: 3420, thumbnail: '/community-1.png' },
    { id: 2, rank: 2, title: '狗狗的午后慵懒时光', author: '毛茸茸日记', likes: 2850, thumbnail: '/story-comic-1.png' },
    { id: 3, rank: 3, title: '柯基的快乐摇摆', author: '柯基小短腿', likes: 2100, thumbnail: '/story-vlog-cover-1.png' },
    { id: 4, rank: 4, title: '橘狗胖丁的减肥计划', author: '橘狗胖丁', likes: 1540, thumbnail: '/story-comic-2.png' },
    { id: 5, rank: 5, title: '豆豆第一次看海', author: '豆豆的麻麻', likes: 1200, thumbnail: '/ta-avatar-cute.png' },
    { id: 6, rank: 6, title: '二哈拆家现场实录', author: '二哈日常', likes: 980, thumbnail: '/story-comic-3.png' },
  ],
  '日榜': [
    { id: 1, rank: 1, title: '今天的阳光真好呀', author: '云朵和棉花糖', likes: 890, thumbnail: '/memory-timeline-1.png' },
    { id: 2, rank: 2, title: '遇见了一只蝴蝶', author: '布丁的主人', likes: 720, thumbnail: '/community-1.png' },
    { id: 3, rank: 3, title: '午睡时光', author: '毛茸茸日记', likes: 650, thumbnail: '/story-comic-1.png' },
    { id: 4, rank: 4, title: '新买的玩具球', author: '柯基小短腿', likes: 430, thumbnail: '/story-vlog-cover-1.png' },
    { id: 5, rank: 5, title: '窗外的风景', author: '橘狗胖丁', likes: 310, thumbnail: '/story-comic-2.png' },
    { id: 6, rank: 6, title: '散步遇到老朋友', author: '豆豆的麻麻', likes: 250, thumbnail: '/ta-avatar-cute.png' },
  ],
  '漫画榜': [
    { id: 1, rank: 1, title: '狗狗的一天四格漫画', author: '毛茸茸日记', likes: 5600, thumbnail: '/story-comic-1.png' },
    { id: 2, rank: 2, title: '狗狗的美食时间', author: '布丁的主人', likes: 4200, thumbnail: '/story-comic-2.png' },
    { id: 3, rank: 3, title: '二哈的日常吐槽', author: '二哈日常', likes: 3800, thumbnail: '/story-comic-3.png' },
    { id: 4, rank: 4, title: '橘狗胖丁的奇幻漂流', author: '橘狗胖丁', likes: 2900, thumbnail: '/story-comic-4.png' },
    { id: 5, rank: 5, title: '吉卜力风格的狗狗', author: '吉卜力狗奴', likes: 2100, thumbnail: '/ta-avatar-ghibli.png' },
    { id: 6, rank: 6, title: '皮克斯小狗的冒险', author: '皮克斯小狗', likes: 1800, thumbnail: '/ta-avatar-pixar.png' },
  ],
  '萌宠榜': [
    { id: 1, rank: 1, title: '世界上最可爱的柯基', author: '柯基小短腿', likes: 6700, thumbnail: '/ta-avatar-cute.png' },
    { id: 2, rank: 2, title: '吉卜力风格的橘狗', author: '吉卜力狗奴', likes: 5400, thumbnail: '/ta-avatar-ghibli.png' },
    { id: 3, rank: 3, title: '皮克斯渲染的金毛', author: '皮克斯小狗', likes: 4800, thumbnail: '/ta-avatar-pixar.png' },
    { id: 4, rank: 4, title: '水彩风格的狗狗头像', author: '毛茸茸日记', likes: 3200, thumbnail: '/ta-avatar-watercolor.png' },
    { id: 5, rank: 5, title: '布丁的艺术照', author: '布丁的主人', likes: 2800, thumbnail: '/community-1.png' },
    { id: 6, rank: 6, title: '豆豆的萌态合集', author: '豆豆的麻麻', likes: 1900, thumbnail: '/memory-timeline-1.png' },
  ],
};

const comingSoonFeatures: ComingSoonFeature[] = [
  { id: 'follow', title: '关注/粉丝', desc: '关注喜欢的宠友，收获粉丝', icon: Users },
  { id: 'chat', title: '私聊', desc: '和宠友一对一聊天', icon: ChatCircle },
  { id: 'mbti', title: 'MBTI配对', desc: '看看TA和哪些毛孩子最合拍', icon: PawPrint },
  { id: 'bump', title: '碰一碰', desc: '和附近的宠友打个招呼', icon: DeviceMobile },
];

/* ------------------------------------------------------------------ */
/*  Helper: colored placeholder for cards without image                */
/* ------------------------------------------------------------------ */

const placeholderColors = [
  'bg-[#F5E6E0]',
  'bg-[#E8D5C4]',
  'bg-[#D4E5D2]',
  'bg-[#C8D8E4]',
  'bg-[#F0E4D7]',
  'bg-[#E4D5E0]',
];

const heightClasses = {
  short: 'h-[160px]',
  medium: 'h-[200px]',
  tall: 'h-[260px]',
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Heart burst particles animation */
const HeartBurst: FC<{ x: number; y: number }> = ({ x, y }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        angle: (i * 90 + 45) * (Math.PI / 180),
        distance: 20 + Math.random() * 20,
      })),
    []
  );

  return (
    <div className="absolute pointer-events-none" style={{ left: x - 20, top: y - 20, width: 40, height: 40, zIndex: 50 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance - 20,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="absolute top-1/2 left-1/2"
        >
          <Heart size={12} weight="fill" className="text-coral" />
        </motion.div>
      ))}
    </div>
  );
};

/** Individual waterfall card */
const WaterfallCard: FC<{
  card: StoryCard;
  index: number;
  onLike: (id: number) => void;
}> = ({ card, index, onLike }) => {
  const navigate = useNavigate();
  const [localLiked, setLocalLiked] = useState(card.liked);
  const [localLikes, setLocalLikes] = useState(card.likes);
  const [burstPos, setBurstPos] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);

  const handleLike = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      if (!localLiked) {
        setLocalLikes((prev) => prev + 1);
        if (e && 'clientX' in e) {
          setBurstPos({ x: e.clientX, y: e.clientY });
          setTimeout(() => setBurstPos(null), 600);
        }
      } else {
        setLocalLikes((prev) => prev - 1);
      }
      setLocalLiked((prev) => !prev);
      onLike(card.id);
    },
    [card.id, localLiked, onLike]
  );

  const handleDoubleTap = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        if ('touches' in e && e.touches.length > 0) {
          const touch = e.touches[0];
          setBurstPos({ x: touch.clientX, y: touch.clientY });
        } else if ('clientX' in e) {
          setBurstPos({ x: e.clientX, y: e.clientY });
        }
        setTimeout(() => setBurstPos(null), 600);
        if (!localLiked) {
          setLocalLikes((prev) => prev + 1);
          setLocalLiked(true);
          onLike(card.id);
        }
      }
      lastTapRef.current = now;
    },
    [card.id, localLiked, onLike]
  );

  const bgColor = placeholderColors[index % placeholderColors.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0, 0, 0.2, 1] as [number, number, number, number],
      }}
      className="relative rounded-xl overflow-hidden cursor-pointer select-none"
      style={{ touchAction: 'manipulation' }}
      onClick={handleDoubleTap}
    >
      {/* Image area */}
      <div className={`relative w-full ${heightClasses[card.height]} ${bgColor} overflow-hidden`}>
        <img
          src={card.image}
          alt={`${card.nickname} 的故事`}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#3D2B1F]/60 to-transparent" />

        {/* Info overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-6 h-6 rounded-full bg-amber/80 flex items-center justify-center flex-shrink-0">
              <PawPrint size={12} weight="fill" className="text-espresso" />
            </div>
            <span className="text-white text-[12px] font-medium truncate">{card.nickname}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigate('/share'); }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="flex items-center gap-1"
              aria-label="分享"
            >
              <ShareNetwork size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.85 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 15,
              }}
              className="flex items-center gap-1"
              aria-label={localLiked ? '取消点赞' : '点赞'}
            >
              <motion.div
                animate={localLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
              >
                <Heart
                  size={14}
                  weight={localLiked ? 'fill' : 'regular'}
                  className={localLiked ? 'text-coral' : 'text-white/80'}
                />
              </motion.div>
              <span className="text-white text-[12px] font-medium">{localLikes}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Heart burst overlay */}
      <AnimatePresence>
        {burstPos && <HeartBurst x={burstPos.x} y={burstPos.y} />}
      </AnimatePresence>
    </motion.div>
  );
};

/** Discover / Waterfall view */
const DiscoverView: FC = () => {
  const [cards, setCards] = useState(mockCards);
  const [activeTag, setActiveTag] = useState('全部');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshOffset, setRefreshOffset] = useState(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLike = useCallback((id: number) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
      )
    );
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop <= 0) {
      const delta = e.touches[0].clientY - touchStartY.current;
      if (delta > 0) {
        setRefreshOffset(Math.min(delta * 0.5, 80));
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (refreshOffset > 60 && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setRefreshOffset(0);
        toast.success('刷新成功 ✨', { duration: 1500 });
      }, 1500);
    } else {
      setRefreshOffset(0);
    }
  }, [refreshOffset, isRefreshing]);

  const filteredCards = useMemo(
    () => (activeTag === '全部' ? cards : cards.filter((_, i) => i % filterTags.length === filterTags.indexOf(activeTag))),
    [activeTag, cards]
  );

  // Split into left/right columns for masonry
  const leftCards = filteredCards.filter((_, i) => i % 2 === 0);
  const rightCards = filteredCards.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex flex-col">
      {/* Filter tags row */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-3 -mx-1 px-1 sticky top-0 z-10 bg-cream">
        {filterTags.map((tag) => (
          <motion.button
            key={tag}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors ${
              activeTag === tag
                ? 'bg-amber text-espresso'
                : 'bg-blush text-taupe'
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>

      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {refreshOffset > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: refreshOffset }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center overflow-hidden"
          >
            <motion.div
              animate={{ rotate: isRefreshing ? 360 : (refreshOffset / 80) * 180 }}
              transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: 'linear' } : { duration: 0.2 }}
            >
              <Sparkle size={20} className="text-amber" weight="fill" />
            </motion.div>
            <span className="ml-2 text-[12px] text-taupe">
              {isRefreshing ? '刷新中...' : '下拉刷新'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waterfall grid */}
      <div
        ref={containerRef}
        className="flex gap-3"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-3">
          {leftCards.map((card, idx) => (
            <WaterfallCard key={card.id} card={card} index={idx * 2} onLike={handleLike} />
          ))}
        </div>
        {/* Right column */}
        <div className="flex-1 flex flex-col gap-3">
          {rightCards.map((card, idx) => (
            <WaterfallCard key={card.id} card={card} index={idx * 2 + 1} onLike={handleLike} />
          ))}
        </div>
      </div>

      {/* Bottom padding for FAB */}
      <div className="h-20" />
    </div>
  );
};

/** Trending list item */
const TrendingListItem: FC<{ item: TrendingItem; isFirst: boolean }> = ({ item, isFirst }) => {
  const rankColors = ['text-amber', 'text-[#C0C0C0]', 'text-[#CD7F32]'];
  const rankBgColors = ['bg-amber/20', 'bg-[#C0C0C0]/20', 'bg-[#CD7F32]/20'];

  if (isFirst) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: item.rank * 0.06 }}
        className="bg-warmWhite rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(61,43,31,0.06)]"
      >
        {/* Rank badge */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <div className={`w-8 h-8 rounded-full ${rankBgColors[0]} flex items-center justify-center`}>
            <Trophy size={18} weight="fill" className={rankColors[0]} />
          </div>
          <span className="text-[14px] font-semibold text-espresso">第一名</span>
        </div>
        {/* Cover image */}
        <div className="relative mx-4 mb-3 rounded-xl overflow-hidden aspect-video">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#3D2B1F]/50 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-amber/80 flex items-center justify-center">
                <PawPrint size={10} weight="fill" className="text-espresso" />
              </div>
              <span className="text-white text-[11px] font-medium">{item.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={12} weight="fill" className="text-coral" />
              <span className="text-white text-[11px] font-medium">{item.likes}</span>
            </div>
          </div>
        </div>
        <div className="px-4 pb-3">
          <h3 className="text-[15px] font-semibold text-espresso leading-snug">{item.title}</h3>
        </div>
      </motion.div>
    );
  }

  // Rank 2-3: medium cards
  if (item.rank <= 3) {
    const rankIdx = item.rank - 1;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: item.rank * 0.06 }}
        className="bg-warmWhite rounded-2xl p-3 flex gap-3 shadow-[0_2px_16px_rgba(61,43,31,0.06)]"
      >
        {/* Rank badge */}
        <div className="flex flex-col items-center justify-center gap-1 w-10 flex-shrink-0">
          <div className={`w-8 h-8 rounded-full ${rankBgColors[rankIdx]} flex items-center justify-center`}>
            <Trophy size={16} weight="fill" className={rankColors[rankIdx]} />
          </div>
          <span className="text-[10px] text-taupe font-medium">第{item.rank}名</span>
        </div>
        {/* Thumbnail */}
        <div className="w-[90px] h-[68px] rounded-lg overflow-hidden flex-shrink-0">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <h3 className="text-[14px] font-semibold text-espresso leading-snug line-clamp-2">{item.title}</h3>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[12px] text-taupe">{item.author}</span>
            <div className="flex items-center gap-1">
              <Heart size={12} weight="fill" className="text-coral" />
              <span className="text-[12px] text-taupe">{item.likes}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Rank 4+: compact row
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: item.rank * 0.06 }}
      className="flex items-center gap-3 py-2 px-1"
    >
      <span className="text-[16px] font-semibold text-taupe w-6 text-center flex-shrink-0">{item.rank}</span>
      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-blush">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-medium text-espresso truncate">{item.title}</h3>
        <span className="text-[12px] text-taupe">{item.author}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <Heart size={12} weight="regular" className="text-taupe" />
        <span className="text-[12px] text-taupe">{item.likes}</span>
      </div>
    </motion.div>
  );
};

/** Trending view */
const TrendingView: FC = () => {
  const [activeTrendingTab, setActiveTrendingTab] = useState('周榜');
  const items = mockTrendingData[activeTrendingTab] || [];

  return (
    <div className="flex flex-col">
      {/* Sub-tabs */}
      <div className="flex gap-2 py-3 sticky top-0 z-10 bg-cream">
        {trendingTabs.map((tab) => (
          <motion.button
            key={tab}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTrendingTab(tab)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
              activeTrendingTab === tab
                ? 'bg-amber text-espresso shadow-[0_2px_8px_rgba(240,168,84,0.3)]'
                : 'bg-warmWhite text-taupe border border-sand'
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrendingTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3 pb-4"
        >
          {items.map((item) => (
            <TrendingListItem key={item.id} item={item} isFirst={item.rank === 1} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/** Coming Soon feature card */
const ComingSoonCard: FC<{ feature: ComingSoonFeature; index: number }> = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0, 0, 0.2, 1] as [number, number, number, number],
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => toast('功能即将上线，敬请期待 ✨', { duration: 2000 })}
      className="relative bg-warmWhite rounded-2xl p-4 flex flex-col items-center gap-2 shadow-[0_2px_16px_rgba(61,43,31,0.06)] overflow-hidden text-left"
    >
      {/* Lock overlay */}
      <div className="absolute inset-0 bg-warmWhite/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="flex items-center gap-1.5 bg-espresso/80 text-white px-3 py-1.5 rounded-full text-[11px] font-medium">
          <Lock size={12} weight="fill" />
          <span>Coming Soon</span>
        </div>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center">
        <Icon size={24} className="text-taupe" weight="regular" />
      </div>

      {/* Text */}
      <h3 className="text-[15px] font-semibold text-espresso">{feature.title}</h3>
      <p className="text-[12px] text-taupe text-center leading-relaxed">{feature.desc}</p>
      <p className="text-[11px] text-sand font-medium mt-0.5">即将开放</p>
    </motion.button>
  );
};

/** Coming Soon section */
const ComingSoonSection: FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-[16px] font-semibold text-espresso mb-3 px-1">更多功能</h2>
      <div className="grid grid-cols-2 gap-3">
        {comingSoonFeatures.map((feature, idx) => (
          <ComingSoonCard key={feature.id} feature={feature} index={idx} />
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Floating Action Button                                             */
/* ------------------------------------------------------------------ */

const FloatingActionButton: FC = () => (
  <motion.button
    className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-amber shadow-[0_4px_20px_rgba(240,168,84,0.4)] flex items-center justify-center"
    whileTap={{ scale: 0.9 }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.5,
    }}
    onClick={() => toast('发布功能即将上线 ✨', { duration: 2000 })}
    aria-label="公开我的Story"
  >
    <Plus size={24} weight="bold" className="text-espresso" />
  </motion.button>
);

/* ------------------------------------------------------------------ */
/*  Main Community Component                                           */
/* ------------------------------------------------------------------ */

const Community: FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'discover' | 'trending'>('discover');

  return (
    <Layout title="社区" activeTab="community">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'rgba(61, 43, 31, 0.9)',
            color: '#FFFBF7',
            borderRadius: '9999px',
            fontSize: '14px',
            padding: '12px 20px',
          },
        }}
      />

      {/* Top Segmented Control */}
      <div className="flex items-center justify-center gap-1 bg-warmWhite rounded-xl p-1 mt-2 mb-4 shadow-[0_1px_8px_rgba(61,43,31,0.04)]">
        <button
          onClick={() => setActiveMainTab('discover')}
          className={`flex-1 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
            activeMainTab === 'discover'
              ? 'bg-amber text-espresso shadow-sm'
              : 'text-taupe hover:text-espresso'
          }`}
        >
          发现
        </button>
        <button
          onClick={() => setActiveMainTab('trending')}
          className={`flex-1 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
            activeMainTab === 'trending'
              ? 'bg-amber text-espresso shadow-sm'
              : 'text-taupe hover:text-espresso'
          }`}
        >
          热门榜
        </button>
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMainTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
        >
          {activeMainTab === 'discover' ? <DiscoverView /> : <TrendingView />}
        </motion.div>
      </AnimatePresence>

      {/* Coming Soon section - shown in both tabs */}
      <ComingSoonSection />

      {/* Floating Action Button - only in discover */}
      {activeMainTab === 'discover' && <FloatingActionButton />}
    </Layout>
  );
};

export default Community;
