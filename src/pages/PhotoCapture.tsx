import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Plus, X, Sparkle, CheckCircle } from 'phosphor-react';

const prompts = [
  '请拍一张 TA 的正面照，清晰看到眼睛和鼻子',
  '再来一张侧面照，帮助识别轮廓',
  '最后一张全身照，完整认识 TA',
];

const PhotoCapture: FC = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generatingText, setGeneratingText] = useState('');
  const [qualityCheck, setQualityCheck] = useState(false);

  const currentPrompt = prompts[Math.min(photos.length, prompts.length - 1)];
  const canAddMore = photos.length < 3;

  const addPhoto = useCallback(() => {
    if (!canAddMore) return;
    // Simulate taking a photo - add a placeholder colored square
    const colors = ['#F0A854', '#A8C5B5', '#9BBFD4', '#E8927C'];
    const color = colors[photos.length % colors.length];
    setPhotos((prev) => [...prev, color]);
  }, [canAddMore, photos.length]);

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setQualityCheck(true);

    // Simulate AI quality check + generation
    const progressTexts = [
      '分析面部特征...',
      '捕捉神态...',
      '绘制风格...',
      '注入灵魂 ✨',
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setGeneratingProgress(Math.min((step / 10) * 100, 100));
      if (step <= progressTexts.length) {
        setGeneratingText(progressTexts[step - 1] || '');
      }
      if (step >= 10) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/avatar-select');
        }, 600);
      }
    }, 500);
  }, [navigate]);

  // Magic transition: photos fly to center
  const [flyPhotos, setFlyPhotos] = useState(false);

  const startMagicTransition = useCallback(() => {
    setFlyPhotos(true);
    setTimeout(() => {
      handleGenerate();
    }, 600);
  }, [handleGenerate]);

  if (isGenerating) {
    return (
      <div className="min-h-[100dvh] bg-espresso max-w-[430px] mx-auto relative flex flex-col items-center justify-center px-6">
        {/* Center photo collage animation */}
        <div className="relative w-[200px] h-[200px] flex items-center justify-center mb-10">
          {photos.map((color, index) => (
            <motion.div
              key={index}
              className="absolute w-[80px] h-[80px] rounded-[12px]"
              style={{ backgroundColor: color }}
              animate={{
                rotate: [0, 360],
                scale: [1, 0.8, 1],
                filter: ['blur(0px)', 'blur(4px)', 'blur(8px)'],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                filter: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                delay: index * 0.3,
              }}
            />
          ))}
          {/* Sparkle particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-2 h-2 bg-amber rounded-full"
              animate={{
                x: [0, (Math.random() - 0.5) * 120],
                y: [0, (Math.random() - 0.5) * 120],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        <motion.p
          className="text-warmWhite text-[16px] font-semibold mb-6"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          正在生成 TA 的形象...
        </motion.p>

        {/* Progress bar */}
        <div className="w-[60%] h-1 bg-espresso rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-amber rounded-full"
            animate={{ width: `${generatingProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {generatingText && (
            <motion.p
              key={generatingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-taupe text-[14px]"
            >
              {generatingText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col">
      {/* Header */}
      <div className="pt-6 px-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/pet-info')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
          aria-label="返回"
        >
          <ArrowLeft size={24} className="text-taupe" weight="regular" />
        </button>
        <h1 className="text-[22px] font-semibold text-espresso tracking-[-0.01em] leading-[1.3]">给 TA 拍张照</h1>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
        {/* Prompt text */}
        <motion.p
          key={currentPrompt}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-taupe text-[14px] text-center mb-4 leading-relaxed"
        >
          {currentPrompt}
        </motion.p>

        {/* Guidance badge */}
        <div className="flex items-center justify-center gap-1 mb-4">
          <Sparkle size={14} className="text-amber" weight="fill" />
          <span className="text-amber text-[12px] font-medium">正脸优先 · 光线充足 · 背景简洁</span>
        </div>

        {/* Camera preview area */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="w-[280px] h-[280px] bg-cream rounded-[16px] flex items-center justify-center relative overflow-hidden border-2 border-dashed border-sand"
            whileTap={{ scale: 0.98 }}
          >
            {photos.length > 0 ? (
              <div className="w-full h-full grid grid-cols-1 gap-1 p-2">
                {photos.slice(-1).map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-full h-full rounded-[12px]"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Camera size={48} className="text-sand" weight="regular" />
                <span className="text-sand text-[14px]">点击拍照</span>
              </div>
            )}

            {/* Camera button */}
            <motion.button
              onClick={addPhoto}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[64px] h-[64px] bg-amber rounded-full flex items-center justify-center"
              style={{ boxShadow: '0 4px 16px rgba(240,168,84,0.4)' }}
              whileTap={{ scale: 0.9 }}
              disabled={!canAddMore}
            >
              <Camera size={28} className="text-espresso" weight="fill" />
            </motion.button>
          </motion.div>
        </div>

        {/* Photo thumbnails */}
        <div className="flex items-center gap-3 mt-4 mb-4">
          <span className="text-espresso text-[14px] font-medium">已选 {photos.length}/3 张</span>
          {qualityCheck && photos.length >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 text-sage text-[12px]"
            >
              <CheckCircle size={14} weight="fill" />
              <span>质量检测通过</span>
            </motion.div>
          )}
        </div>

        <div className="flex gap-3 mb-6">
          {photos.map((color, index) => (
            <motion.div
              key={index}
              className="relative w-[80px] h-[80px] rounded-[8px] overflow-hidden"
              style={{ backgroundColor: color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              layout
            >
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 w-5 h-5 bg-alert rounded-full flex items-center justify-center"
                aria-label="删除"
              >
                <X size={12} className="text-white" weight="bold" />
              </button>
            </motion.div>
          ))}
          {canAddMore && (
            <motion.button
              onClick={addPhoto}
              className="w-[80px] h-[80px] bg-cream rounded-[8px] flex items-center justify-center border-2 border-dashed border-sand"
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={24} className="text-sand" weight="regular" />
            </motion.button>
          )}
        </div>

        {/* Generate button */}
        <div className="mt-auto">
          <motion.button
            onClick={startMagicTransition}
            className="w-full h-12 bg-amber rounded-full text-espresso font-semibold text-base flex items-center justify-center disabled:opacity-40"
            style={{ boxShadow: '0 8px 32px rgba(61,43,31,0.10)' }}
            whileTap={{ scale: 0.95 }}
            disabled={photos.length === 0}
          >
            <Sparkle size={20} className="mr-2" weight="fill" />
            生成 TA 的形象
          </motion.button>
        </div>
      </div>

      {/* Magic transition overlay */}
      <AnimatePresence>
        {flyPhotos && (
          <motion.div
            className="fixed inset-0 z-[500] bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoCapture;
