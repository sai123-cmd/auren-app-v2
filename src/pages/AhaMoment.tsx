import type { FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowClockwise } from 'phosphor-react';

// Generate random stars
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 2,
  }));
};

const typingMessages = [
  '嗨主人，我是Bella！',
  '终于见到你了 ✨',
  '以后每天我都会给你讲故事哦 🐾',
];

const AhaMoment: FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'light' | 'reveal' | 'breathing' | 'typing' | 'done'>('light');
  const [typedText, setTypedText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [stars] = useState(() => generateStars(40));
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipRef = useRef(false);

  // Animation sequence
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Light appears
    timers.push(setTimeout(() => setPhase('reveal'), 600));

    // Phase 2: Avatar reveals
    timers.push(setTimeout(() => setPhase('breathing'), 1400));

    // Phase 3: Start typing
    timers.push(setTimeout(() => setPhase('typing'), 2200));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase !== 'typing' && phase !== 'done') return;

    const currentMessage = typingMessages[messageIndex];
    if (!currentMessage) {
      setShowButton(true);
      return;
    }

    let charIndex = 0;
    const typeNext = () => {
      if (skipRef.current) {
        setTypedText(currentMessage);
        setMessageIndex((prev) => prev + 1);
        skipRef.current = false;
        return;
      }

      if (charIndex <= currentMessage.length) {
        setTypedText(currentMessage.slice(0, charIndex));
        charIndex++;
        typingRef.current = setTimeout(typeNext, 80);
      } else {
        // Message complete, pause then next
        typingRef.current = setTimeout(() => {
          setMessageIndex((prev) => {
            const next = prev + 1;
            if (next >= typingMessages.length) {
              setPhase('done');
              setShowButton(true);
            }
            return next;
          });
          setTypedText('');
        }, 1200);
      }
    };

    typeNext();

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [phase, messageIndex]);

  const handleSkip = useCallback(() => {
    skipRef.current = true;
    if (typingRef.current) clearTimeout(typingRef.current);
    setTypedText(typingMessages[messageIndex] || '');
    setMessageIndex(typingMessages.length);
    setPhase('done');
    setShowButton(true);
  }, [messageIndex]);

  const handleReplay = useCallback(() => {
    setPhase('light');
    setTypedText('');
    setMessageIndex(0);
    setShowButton(false);
    skipRef.current = false;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('reveal'), 600));
    timers.push(setTimeout(() => setPhase('breathing'), 1400));
    timers.push(setTimeout(() => setPhase('typing'), 2200));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="min-h-[100dvh] max-w-[430px] mx-auto relative flex flex-col items-center justify-center overflow-hidden"
      onClick={phase === 'typing' && !showButton ? handleSkip : undefined}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/aha-moment-bg.png"
          alt="星空背景"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-[#1a1a2e]/60" />
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Replay button */}
      <motion.button
        className="absolute top-6 right-6 z-50 w-10 h-10 bg-warmWhite/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          handleReplay();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        aria-label="重播"
      >
        <ArrowClockwise size={20} className="text-white" weight="regular" />
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Light glow */}
        <AnimatePresence>
          {phase !== 'done' && (
            <motion.div
              className="absolute w-[200px] h-[200px] rounded-full bg-amber/30 blur-[60px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: phase === 'light' ? [0, 1] : [1, 1.2, 1],
                opacity: phase === 'light' ? [0, 0.8] : [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: phase === 'light' ? 0.4 : 3,
                repeat: phase === 'light' ? 0 : Infinity,
                ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
              }}
            />
          )}
        </AnimatePresence>

        {/* Avatar */}
        <div className="relative w-[180px] h-[180px] mb-8">
          {/* Light burst */}
          <AnimatePresence>
            {phase === 'light' && (
              <motion.div
                className="absolute inset-0 rounded-full bg-amber/40"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>

          {/* Avatar image */}
          <motion.img
            src="/ta-avatar-cute.png"
            alt="TA 形象"
            className="w-full h-full rounded-full object-cover relative z-10"
            style={{
              filter: phase === 'light' || phase === 'reveal' ? 'blur(8px)' : 'blur(0px)',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: phase === 'breathing' || phase === 'typing' || phase === 'done'
                ? [1, 1.02, 1]
                : phase === 'reveal' ? 1 : 0.8,
              opacity: 1,
              filter: phase === 'light' ? 'blur(10px)' : phase === 'reveal' ? 'blur(4px)' : 'blur(0px)',
            }}
            transition={{
              scale: {
                duration: 3,
                repeat: (phase === 'breathing' || phase === 'typing' || phase === 'done') ? Infinity : 0,
                ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
              },
              filter: { duration: 0.6 },
              opacity: { duration: 0.4 },
            }}
          />

          {/* Ambient glow ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-full border-2 border-amber/30"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
            }}
          />
        </div>

        {/* Chat bubble with typing effect */}
        <AnimatePresence>
          {(phase === 'typing' || phase === 'done') && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
              className="relative bg-warmWhite/90 backdrop-blur-sm rounded-[16px] px-6 py-4 max-w-[300px]"
              style={{ boxShadow: '0 4px 24px rgba(61,43,31,0.08)' }}
            >
              {/* Bubble tail */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-warmWhite/90 rotate-45" />

              <p className="text-espresso text-[18px] font-semibold leading-[1.4] min-h-[28px]">
                {typedText}
                {!showButton && (
                  <motion.span
                    className="inline-block w-[2px] h-[18px] bg-amber ml-1 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/');
              }}
              className="mt-8 w-[200px] h-12 bg-amber rounded-full text-espresso font-semibold text-base flex items-center justify-center"
              style={{ boxShadow: '0 8px 32px rgba(61,43,31,0.10)' }}
              whileTap={{ scale: 0.95 }}
            >
              继续
            </motion.button>
          )}
        </AnimatePresence>

        {/* Skip hint */}
        {phase === 'typing' && !showButton && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 text-white/40 text-[12px]"
          >
            点击屏幕加速
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default AhaMoment;
