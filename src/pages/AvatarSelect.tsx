import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ArrowCounterClockwise } from 'phosphor-react';

const avatars = [
  { src: '/ta-avatar-cute.png', label: '手绘卡通', style: 'cute' },
  { src: '/ta-avatar-pixar.png', label: 'Pixar 风格', style: 'pixar' },
  { src: '/ta-avatar-watercolor.png', label: '水彩手绘', style: 'watercolor' },
  { src: '/ta-avatar-ghibli.png', label: '吉卜力动画', style: 'ghibli' },
];

const AvatarSelect: FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate generating progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsGenerating(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleConfirm = () => {
    if (!selected) return;
    navigate('/aha-moment');
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setSelected(null);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsGenerating(false), 400);
          return 100;
        }
        return prev + Math.random() * 20 + 8;
      });
    }, 300);
  };

  if (isGenerating) {
    return (
      <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col items-center justify-center px-6">
        <motion.div
          className="w-[120px] h-[120px] bg-warmWhite rounded-full flex items-center justify-center mb-8"
          style={{ boxShadow: '0 2px 16px rgba(61,43,31,0.06)' }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-amber border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <p className="text-espresso text-[18px] font-semibold mb-2">正在生成形象...</p>
        <p className="text-taupe text-[14px] mb-6">四种风格正在绘制中</p>

        <div className="w-[60%] h-1 bg-cream rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-amber rounded-full"
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-taupe text-[12px] mt-2">{Math.min(Math.round(progress), 100)}%</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col">
      {/* Header */}
      <div className="pt-6 px-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/photo-capture')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
          aria-label="返回"
        >
          <ArrowLeft size={24} className="text-taupe" weight="regular" />
        </button>
        <h1 className="text-[22px] font-semibold text-espresso tracking-[-0.01em] leading-[1.3]">选择 TA 的形象</h1>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6 pb-6">
        {/* Guide text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-espresso text-[16px] text-center mb-6"
        >
          这是 TA 的四种模样，选一个最像的~
        </motion.p>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {avatars.map((avatar, index) => {
            const isSelected = selected === avatar.style;
            return (
              <motion.button
                key={avatar.style}
                onClick={() => setSelected(avatar.style)}
                className={`relative flex flex-col items-center rounded-[16px] p-3 transition-all ${
                  isSelected
                    ? 'bg-blush border-[3px] border-amber'
                    : 'bg-warmWhite border-[3px] border-transparent'
                }`}
                style={{ boxShadow: '0 2px 16px rgba(61,43,31,0.06)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Checkmark badge */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-amber rounded-full flex items-center justify-center z-10"
                    >
                      <Check size={14} className="text-espresso" weight="bold" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Avatar image */}
                <motion.img
                  src={avatar.src}
                  alt={avatar.label}
                  className="w-[120px] h-[120px] rounded-full object-cover mb-3"
                  animate={isSelected ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number] }}
                />

                {/* Label */}
                <span className={`text-[12px] font-medium ${isSelected ? 'text-espresso' : 'text-taupe'}`}>
                  {avatar.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="mt-6 flex flex-col gap-3">
          <motion.button
            onClick={handleConfirm}
            className="w-full h-12 bg-amber rounded-full text-espresso font-semibold text-base flex items-center justify-center disabled:opacity-40"
            style={{ boxShadow: '0 8px 32px rgba(61,43,31,0.10)' }}
            whileTap={{ scale: 0.95 }}
            disabled={!selected}
          >
            就是这只 TA！
          </motion.button>

          <button
            onClick={handleRegenerate}
            className="text-taupe text-[14px] text-center hover:text-amber transition-colors flex items-center justify-center gap-1"
          >
            <ArrowCounterClockwise size={16} weight="regular" />
            不满意？重新生成
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelect;
