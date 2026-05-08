import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretRight } from 'phosphor-react';

const slides = [
  {
    image: '/onboarding-1.png',
    title: '遇见 TA 的数字生命',
    desc: '每天一篇故事，记录 TA 独一无二的一天。Vlog、漫画、日记——用温暖的方式，留住每一个瞬间。',
  },
  {
    image: '/onboarding-2.png',
    title: '24小时的温柔陪伴',
    desc: '实时位置、健康追踪、AI 对话——即使不在身边，也知道 TA 过得好不好。',
  },
  {
    image: '/onboarding-3.png',
    title: '5分钟，开启旅程',
    desc: '只需要拍几张照片，TA 的数字形象就会诞生。今晚7点，第一篇故事等你。',
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const Onboarding: FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [[currentPage, direction], setPageDirection] = useState([0, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      const next = currentPage + newDirection;
      if (next >= 0 && next < slides.length) {
        setPageDirection([next, newDirection]);
        setPage(next);
      }
    },
    [currentPage]
  );

  const goToSlide = useCallback((index: number) => {
    const newDirection = index > currentPage ? 1 : -1;
    setPageDirection([index, newDirection]);
    setPage(index);
  }, [currentPage]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paginate]);

  const isLast = currentPage === slides.length - 1;

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col overflow-hidden">
      {/* Slide area */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipe = swipePower(info.offset.x, info.velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
          >
            {/* Full-bleed illustration */}
            <motion.div
              className="w-full flex items-center justify-center mb-8"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: 0.1 }}
            >
              <img
                src={slides[currentPage].image}
                alt={slides[currentPage].title}
                className="w-full max-w-[320px] h-[380px] object-cover rounded-[16px]"
                draggable={false}
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-espresso text-[28px] font-semibold mb-3 text-center tracking-[-0.02em] leading-[1.2]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: 0.2 }}
            >
              {slides[currentPage].title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-taupe text-[16px] text-center leading-[1.6] max-w-[300px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: 0.3 }}
            >
              {slides[currentPage].desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom area: pagination + buttons */}
      <div className="relative z-10 pb-10 px-6">
        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative h-2 rounded-full transition-all duration-200"
              style={{
                width: index === page ? 24 : 8,
                backgroundColor: index === page ? '#F0A854' : '#D4C4B0',
              }}
              aria-label={`转到第 ${index + 1} 屏`}
            />
          ))}
        </div>

        {/* CTA on last slide */}
        <AnimatePresence mode="wait">
          {isLast ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            >
              <motion.button
                onClick={() => navigate('/auth')}
                className="w-full h-12 bg-amber rounded-full text-espresso font-semibold text-base flex items-center justify-center gap-2"
                style={{ boxShadow: '0 8px 32px rgba(61,43,31,0.10)' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
                  },
                }}
              >
                开始体验
                <CaretRight size={20} weight="regular" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-12 flex items-center justify-center"
            >
              <span className="text-sand text-sm">向右滑动继续</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login link on first slide */}
        {currentPage === 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/auth')}
              className="text-taupe text-[12px] hover:text-amber transition-colors"
            >
              已有账号？登录
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
