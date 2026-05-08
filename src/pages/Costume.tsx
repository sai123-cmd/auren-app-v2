import type { FC } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  
  
  
    
  
  Star
} from 'phosphor-react';
import { useNavigate } from 'react-router';

const Costume: FC = () => {
  const navigate = useNavigate();
  const [selectedCostume, setSelectedCostume] = useState<string | null>(null);

  const costumes = [
    { id: 'scarf', name: '红色围巾', icon: <span className='text-[20px]'>🧣</span>, color: 'text-alert', bg: 'bg-alert/15' },
    { id: 'glasses', name: '酷酷墨镜', icon: <span className='text-[20px]'>🕶️</span>, color: 'text-espresso', bg: 'bg-cream' },
    { id: 'hat', name: '生日帽', icon: <span className='text-[20px]'>🎉</span>, color: 'text-amber', bg: 'bg-amber/15' },
    { id: 'crown', name: '皇冠', icon: <span className='text-[20px]'>👑</span>, color: 'text-warn', bg: 'bg-warn/15' },
    { id: 'ribbon', name: '蝴蝶结', icon: <span className='text-[20px]'>🎀</span>, color: 'text-coral', bg: 'bg-coral/15' },
    { id: 'butterfly', name: '蝴蝶翅膀', icon: <span className='text-[20px]'>🦋</span>, color: 'text-sky', bg: 'bg-sky/15' },
  ];

  const costumeOverlay = {
    scarf: '🧣',
    glasses: '🕶️',
    hat: '🎉',
    crown: '👑',
    ribbon: '🎀',
    butterfly: '🦋',
  };

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-warmWhite/90 backdrop-blur border-b border-sand">
        <div className="flex items-center px-4 h-12">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center -ml-2">
            <ArrowLeft size={24} className="text-espresso" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-espresso pr-6">装扮 Bella</h1>
        </div>
      </div>

      <div className="px-4 pt-4 pb-24 space-y-4">
        {/* Preview Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-warmWhite rounded-2xl border border-sand p-6 flex flex-col items-center"
        >
          <div className="relative">
            <img
              src="/ta-avatar-cute.png"
              alt="Bella"
              className="w-32 h-32 rounded-full object-cover border-3 border-amber"
            />
            {selectedCostume && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-warmWhite rounded-full border-2 border-amber flex items-center justify-center text-[22px] shadow-lg"
              >
                {costumeOverlay[selectedCostume as keyof typeof costumeOverlay]}
              </motion.div>
            )}
          </div>
          <p className="text-[16px] font-semibold text-espresso mt-3">
            {selectedCostume ? `Bella 正在戴 ${costumes.find(c => c.id === selectedCostume)?.name}` : '选择装扮来预览'}
          </p>
          {selectedCostume && (
            <button
              onClick={() => setSelectedCostume(null)}
              className="mt-2 text-[12px] text-taupe underline"
            >
              取消装扮
            </button>
          )}
        </motion.div>

        {/* Costume Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <p className="text-[15px] font-semibold text-espresso mb-3">可选装扮</p>
          <div className="grid grid-cols-3 gap-3">
            {costumes.map((costume, i) => (
              <motion.button
                key={costume.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                onClick={() => setSelectedCostume(selectedCostume === costume.id ? null : costume.id)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  selectedCostume === costume.id
                    ? 'border-amber bg-amber/5'
                    : 'border-sand bg-cream'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${costume.bg} ${costume.color} flex items-center justify-center`}>
                  {costume.icon}
                </div>
                <p className="text-[12px] text-espresso">{costume.name}</p>
                {selectedCostume === costume.id && (
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-amber text-warmWhite flex items-center justify-center">
                    <Check size={12} weight="bold" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Unlock More */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-warn/10 rounded-2xl border border-warn/20 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Star size={18} className="text-warn" weight="fill" />
            <p className="text-[14px] font-semibold text-espresso">解锁更多装扮</p>
          </div>
          <p className="text-[12px] text-taupe">
            升级到 Premium 计划，解锁节日主题装扮、限定联名款等 20+ 种虚拟装扮。
          </p>
          <button className="mt-3 w-full h-10 rounded-xl bg-amber text-warmWhite text-[14px] font-semibold">
            查看 Premium 装扮
          </button>
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-warmWhite border-t border-sand p-4 z-40">
        <button
          onClick={() => {
            alert('装扮已保存！Bella 看起来好可爱 ✨');
            navigate(-1);
          }}
          className="w-full h-12 rounded-xl bg-amber text-warmWhite font-semibold text-[16px]"
        >
          保存装扮
        </button>
        <div className="h-[34px]" />
      </div>
    </div>
  );
};

export default Costume;
