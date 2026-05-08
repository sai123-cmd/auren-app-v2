import type { FC } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShareNetwork,
  TiktokLogo,
  InstagramLogo,
  FacebookLogo,
  Check,
  Copy
} from 'phosphor-react';
import { useNavigate } from 'react-router';

const SharePage: FC = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<number>(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tiktok']);
  const [caption, setCaption] = useState('今天 Bella 在公园追松鼠，虽然没追到但交了新朋友 🐕✨ #AUREN #金毛日记');
  const [shared, setShared] = useState(false);

  const stories = [
    { id: 0, title: '今天的奔跑日记', image: '/story-vlog-cover-1.png', date: '05.08' },
    { id: 1, title: '公园新朋友', image: '/story-comic-3.png', date: '05.07' },
    { id: 2, title: '晚安时刻', image: '/story-comic-4.png', date: '05.06' },
  ];

  const platforms = [
    { id: 'tiktok', name: 'TikTok', icon: <TiktokLogo size={24} />, color: 'text-dark' },
    { id: 'instagram', name: 'Instagram', icon: <InstagramLogo size={24} />, color: 'text-coral' },
    { id: 'x', name: 'X / Twitter', icon: <span className='text-[20px] font-bold'>𝕏</span>, color: 'text-espresso' },
    { id: 'facebook', name: 'Facebook', icon: <FacebookLogo size={24} />, color: 'text-sky' },
  ];

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => {
      alert(`已成功分享到 ${selectedPlatforms.map(p => platforms.find(pl => pl.id === p)?.name).join('、')}！`);
      setShared(false);
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-warmWhite/90 backdrop-blur border-b border-sand">
        <div className="flex items-center px-4 h-12">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center -ml-2">
            <ArrowLeft size={24} className="text-espresso" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-espresso pr-6">分享到社交平台</h1>
        </div>
      </div>

      <div className="px-4 pt-4 pb-40 space-y-4">
        {/* Story Selection */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <p className="text-[15px] font-semibold text-espresso mb-3">选择要分享的故事</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story.id)}
                className={`relative shrink-0 w-[100px] rounded-xl overflow-hidden border-2 transition-all ${
                  selectedStory === story.id ? 'border-amber' : 'border-transparent'
                }`}
              >
                <img src={story.image} alt={story.title} className="w-full h-[100px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5">
                  <p className="text-[11px] text-warmWhite font-medium truncate">{story.title}</p>
                  <p className="text-[10px] text-warmWhite/70">{story.date}</p>
                </div>
                {selectedStory === story.id && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber text-warmWhite flex items-center justify-center">
                    <Check size={12} weight="bold" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Platform Selection */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <p className="text-[15px] font-semibold text-espresso mb-3">选择平台</p>
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? 'border-amber bg-amber/5'
                    : 'border-sand bg-cream'
                }`}
              >
                <span className={platform.color}>{platform.icon}</span>
                <span className="text-[14px] text-espresso">{platform.name}</span>
                {selectedPlatforms.includes(platform.id) && (
                  <Check size={16} className="text-amber ml-auto" weight="bold" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Caption Editor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-semibold text-espresso">分享文案</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(caption);
                alert('文案已复制到剪贴板');
              }}
              className="flex items-center gap-1 text-[12px] text-taupe"
            >
              <Copy size={14} />
              复制
            </button>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full h-[100px] bg-cream rounded-xl p-3 text-[14px] text-espresso resize-none focus:outline-none focus:ring-2 focus:ring-amber/30"
            placeholder="写点什么..."
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['#AUREN', '#金毛日记', '#狗狗日常', '#宠物生活', '#Bella'].map((tag) => (
              <button
                key={tag}
                onClick={() => setCaption(prev => prev + ' ' + tag)}
                className="text-[12px] text-amber bg-amber/10 px-2 py-1 rounded-full hover:bg-amber/20 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Share Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-warmWhite border-t border-sand p-4 z-40">
        <button
          onClick={handleShare}
          disabled={selectedPlatforms.length === 0 || shared}
          className={`w-full h-12 rounded-xl font-semibold text-[16px] flex items-center justify-center gap-2 transition-all ${
            selectedPlatforms.length === 0
              ? 'bg-sand text-warmWhite cursor-not-allowed'
              : shared
              ? 'bg-safe text-warmWhite'
              : 'bg-amber text-warmWhite'
          }`}
        >
          {shared ? (
            <>
              <Check size={20} weight="bold" />
              分享成功
            </>
          ) : (
            <>
              <ShareNetwork size={20} weight="fill" />
              一键分享 ({selectedPlatforms.length})
            </>
          )}
        </button>
        <div className="h-[34px]" />
      </div>
    </div>
  );
};

export default SharePage;
