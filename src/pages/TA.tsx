import type { FC } from 'react';
import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import BottomTabBar from '../components/BottomTabBar';
import {
  ChartLineUp,
  PaintBrush,
  DotsThree,
  PawPrint,
  Mountains,
  Alien,
  PaperPlaneRight,
  Microphone,
} from 'phosphor-react';

/* ─── Types ─── */
interface HeartParticle {
  id: number;
  x: number;
  y: number;
}

interface TagItem {
  label: string;
  icon: 'paw' | 'tree' | 'alien';
}

/* ─── Constants ─── */
const TAGS: TagItem[] = [
  { label: '好奇', icon: 'paw' },
  { label: '户外派', icon: 'tree' },
  { label: '社牛', icon: 'alien' },
];

const TA_SPEECH = '主人你看我今天追松鼠了吗？没追到呜呜';

const MOCK_GROWTH = {
  days: 47,
  highlights: 126,
  progress: 72,
  level: 'Lv.5 冒险家',
};

/* ─── Heart Particles ─── */
const Heart: FC<{ x: number; y: number }> = memo(({ x, y }) => (
  <motion.div
    initial={{ opacity: 1, scale: 0.5, x, y }}
    animate={{
      opacity: 0,
      scale: 1.4,
      y: y - 80,
      x: x + (Math.random() - 0.5) * 60,
    }}
    transition={{ duration: 0.9, ease: 'easeOut' as const }}
    className="absolute pointer-events-none z-30"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8927C">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </motion.div>
));

/* ─── Breathing Avatar (isolated perpetual animation) ─── */
const BreathingAvatar: FC<{
  isBlinking: boolean;
  onTap: () => void;
  isBouncing: boolean;
}> = memo(({ isBlinking, onTap, isBouncing }) => {
  return (
    <motion.div
      className="relative z-20 cursor-pointer"
      animate={
        isBouncing
          ? { scale: [1, 0.92, 1.08, 1] }
          : { scale: [1, 1.02, 1], opacity: [1, 0.95, 1] }
      }
      transition={
        isBouncing
          ? { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }
          : { duration: 3, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number] }
      }
      onClick={onTap}
      style={{ transformOrigin: 'center bottom' }}
    >
      <motion.img
        src="/ta-avatar-cute.png"
        alt="Bella"
        className="w-[180px] h-[180px] rounded-full object-cover"
        animate={isBlinking ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
        transition={{ duration: 0.15, ease: 'easeInOut' as const }}
        style={{ transformOrigin: 'center center' }}
        draggable={false}
      />
    </motion.div>
  );
});

/* ─── Tag Icon ─── */
const TagIcon: FC<{ type: TagItem['icon'] }> = ({ type }) => {
  const cls = 'text-amber';
  switch (type) {
    case 'tree':
      return <Mountains size={14} weight="fill" className={cls} />;
    case 'alien':
      return <Alien size={14} weight="fill" className={cls} />;
    default:
      return <PawPrint size={14} weight="fill" className={cls} />;
  }
};

/* ─── TA Profile Page ─── */
const TA: FC = () => {
  const navigate = useNavigate();

  /* Interaction states */
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const heartIdRef = useRef(0);

  /* Typing effect for speech bubble */
  const [typedText, setTypedText] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  /* Random blink */
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 2000;
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        scheduleBlink();
      }, delay);
    };
    const timer = scheduleBlink();
    return () => clearTimeout(timer);
  }, []);

  /* Typing effect on first load */
  useEffect(() => {
    const showTimer = setTimeout(() => setShowBubble(true), 600);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showBubble) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      setTypedText(TA_SPEECH.slice(0, idx));
      if (idx >= TA_SPEECH.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [showBubble]);

  /* Avatar tap → bounce + hearts */
  const handleAvatarTap = useCallback(() => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    const newHearts: HeartParticle[] = [];
    for (let i = 0; i < 5; i++) {
      heartIdRef.current += 1;
      newHearts.push({
        id: heartIdRef.current,
        x: (Math.random() - 0.5) * 80,
        y: -20 - Math.random() * 40,
      });
    }
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 1000);
  }, []);

  /* Input focus → navigate to chat */
  const handleInputClick = useCallback(() => {
    navigate('/chat');
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col">
      {/* ── Top nav (transparent over avatar area) ── */}
      <div className="absolute top-0 left-0 right-0 z-50 h-[48px] flex items-center justify-between px-6">
        <span className="text-[18px] font-semibold text-white drop-shadow-md">Bella</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors">
          <DotsThree size={24} className="text-white drop-shadow-md" weight="bold" />
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* ═════ Avatar Area (top ~50%) ═════ */}
        <div className="relative min-h-[55dvh] flex flex-col items-center justify-end pb-6 overflow-hidden rounded-b-[24px]">
          {/* Warm gradient circle background — "家" feeling */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 60%, #F5E6E0 0%, #FDF8F3 60%, #FDF8F3 100%)',
            }}
          />

          {/* Soft ambient glow behind avatar */}
          <motion.div
            className="absolute z-10 w-[260px] h-[260px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(240,168,84,0.18) 0%, rgba(245,230,224,0.08) 50%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -55%)',
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.9, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
          />

          {/* Avatar with breathing + blink + tap interaction */}
          <div className="relative z-20">
            <BreathingAvatar
              isBlinking={isBlinking}
              isBouncing={isBouncing}
              onTap={handleAvatarTap}
            />

            {/* Heart particles on tap */}
            <AnimatePresence>
              {hearts.map((h) => (
                <Heart key={h.id} x={h.x} y={h.y} />
              ))}
            </AnimatePresence>
          </div>

          {/* Subtle name label below avatar */}
          <motion.p
            className="relative z-20 mt-3 text-sm text-taupe font-medium"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            轻点互动~
          </motion.p>
        </div>

        {/* ═════ Character Tags ═════ */}
        <motion.div
          className="flex gap-2 px-6 mt-5 overflow-x-auto no-scrollbar"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
        >
          {TAGS.map((tag, i) => (
            <motion.div
              key={tag.label}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blush rounded-full shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.06,
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
              }}
            >
              <TagIcon type={tag.icon} />
              <span className="text-[12px] font-medium text-espresso">{tag.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ═════ Growth Stats ═════ */}
        <motion.div
          className="mx-6 mt-4 bg-warmWhite rounded-2xl p-4"
          style={{ boxShadow: '0 2px 16px rgba(61, 43, 31, 0.06)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] font-semibold text-espresso">成长值</span>
            <span className="text-[12px] text-taupe">{MOCK_GROWTH.level}</span>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-[rgba(212,196,176,0.25)] rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #E8A040 0%, #F0A854 100%)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${MOCK_GROWTH.progress}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold text-espresso">{MOCK_GROWTH.days}</span>
              <span className="text-[12px] text-taupe">天陪伴</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold text-espresso">{MOCK_GROWTH.highlights}</span>
              <span className="text-[12px] text-taupe">高光</span>
            </div>
          </div>
        </motion.div>

        {/* ═════ TA Speech Bubble ═════ */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              className="mx-6 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            >
              <div
                className="relative bg-warmWhite px-4 py-3 rounded-2xl rounded-tl-[4px]"
                style={{
                  boxShadow: '0 2px 12px rgba(61, 43, 31, 0.06)',
                  border: '1px solid #D4C4B0',
                }}
              >
                <p className="text-[16px] text-espresso leading-relaxed">
                  {typedText}
                  {typedText.length < TA_SPEECH.length && (
                    <span className="inline-block w-[2px] h-[1em] bg-amber ml-0.5 align-middle animate-pulse" />
                  )}
                </p>
                <p className="text-right text-[12px] text-taupe mt-1">—— Bella</p>

                {/* Little tail pointing to avatar */}
                <div
                  className="absolute -top-[7px] left-4 w-3 h-3 bg-warmWhite rotate-45"
                  style={{ borderTop: '1px solid #D4C4B0', borderLeft: '1px solid #D4C4B0' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═════ Action Buttons ═════ */}
        <motion.div
          className="mx-6 mt-5 grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
        >
          <button
            onClick={() => navigate('/growth')}
            className="flex flex-col items-center gap-2 py-3 rounded-xl border border-sand bg-transparent hover:bg-blush/50 transition-colors active:scale-95"
          >
            <ChartLineUp size={22} className="text-taupe" weight="regular" />
            <span className="text-[12px] text-taupe font-medium">成长档案</span>
          </button>
          <button
            onClick={() => navigate('/costume')}
            className="flex flex-col items-center gap-2 py-3 rounded-xl border border-sand bg-transparent hover:bg-blush/50 transition-colors active:scale-95"
          >
            <PaintBrush size={22} className="text-taupe" weight="regular" />
            <span className="text-[12px] text-taupe font-medium">装扮</span>
          </button>
          <button
            onClick={() => navigate('/ta-more')}
            className="flex flex-col items-center gap-2 py-3 rounded-xl border border-sand bg-transparent hover:bg-blush/50 transition-colors active:scale-95"
          >
            <DotsThree size={22} className="text-taupe" weight="regular" />
            <span className="text-[12px] text-taupe font-medium">更多</span>
          </button>
        </motion.div>

      {/* ── Bottom Chat Input ── */}
      <div className="mx-6 mt-5 bg-warmWhite border border-sand rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-cream shrink-0">
            <Microphone size={20} className="text-taupe" weight="regular" />
          </button>

          <button
            onClick={handleInputClick}
            className="flex-1 h-10 bg-cream rounded-full px-4 text-left text-[14px] text-sand hover:bg-[#F5E6E0]/50 transition-colors focus:outline-none"
          >
            跟TA说点什么...
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-sand shrink-0">
            <PaperPlaneRight size={18} className="text-warmWhite" weight="fill" />
          </button>
        </div>
      </div>

      {/* Spacer for BottomTabBar */}
      <div className="h-[80px]" />
    </div>

    <BottomTabBar activeTab="ta" />
  </div>
);
};

export default TA;
