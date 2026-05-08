import type { FC } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  PawPrint,
  TrendUp,
  Trophy,
  Calendar,
  Heart,
  
  Star
} from 'phosphor-react';
import { useNavigate } from 'react-router';

const Growth: FC = () => {
  const navigate = useNavigate();

  const milestones = [
    { date: '2024.08.15', title: '来到新家', desc: 'Bella第一次踏入家门，紧张又好奇', icon: <PawPrint size={16} /> },
    { date: '2024.09.01', title: '第一次出门散步', desc: '牵绳遛弯，探索外面的世界', icon: <span className='text-[14px]'>🐾</span> },
    { date: '2024.09.20', title: '学会"坐下"指令', desc: '用了3天学会了第一个指令', icon: <Star size={16} /> },
    { date: '2024.10.05', title: '第一次交友', desc: '在公园遇到了另一只金毛 Max', icon: <Heart size={16} /> },
    { date: '2024.11.12', title: '疫苗接种完成', desc: '完成全部基础疫苗注射', icon: <Calendar size={16} /> },
    { date: '2024.12.25', title: '100天高光达成', desc: '累计获得100次高光时刻', icon: <Trophy size={16} /> },
  ];

  const weightData = [
    { age: '2月', weight: 8 },
    { age: '4月', weight: 18 },
    { age: '6月', weight: 24 },
    { age: '8月', weight: 28 },
    { age: '10月', weight: 30 },
    { age: '12月', weight: 32 },
  ];

  const maxWeight = Math.max(...weightData.map(d => d.weight));

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-warmWhite/90 backdrop-blur border-b border-sand">
        <div className="flex items-center px-4 h-12">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center -ml-2">
            <ArrowLeft size={24} className="text-espresso" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-espresso pr-6">成长档案</h1>
        </div>
      </div>

      <div className="px-4 pt-4 pb-24 space-y-4">
        {/* Basic Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <div className="flex items-center gap-4">
            <img src="/ta-avatar-cute.png" alt="Bella" className="w-16 h-16 rounded-full object-cover border-2 border-amber" />
            <div>
              <p className="text-[18px] font-bold text-espresso">Bella</p>
              <p className="text-[13px] text-taupe">金毛寻回犬 · 雌性 · 1岁2个月</p>
              <p className="text-[12px] text-taupe mt-0.5">2024.08.15 出生</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: '体重', value: '32kg', color: 'amber' },
              { label: '肩高', value: '56cm', color: 'safe' },
              { label: '成长值', value: '126', color: 'coral' },
            ].map((item) => (
              <div key={item.label} className="bg-cream rounded-xl p-3 text-center">
                <p className={`text-[18px] font-bold text-${item.color}`}>{item.value}</p>
                <p className="text-[12px] text-taupe">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weight Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendUp size={18} className="text-amber" />
            <p className="text-[15px] font-semibold text-espresso">体重变化</p>
          </div>
          <div className="flex items-end gap-2 h-[120px]">
            {weightData.map((d, i) => (
              <div key={d.age} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.weight / maxWeight) * 100}px` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="w-full max-w-[40px] bg-amber rounded-t-lg"
                />
                <p className="text-[11px] text-taupe">{d.age}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-coral" />
            <p className="text-[15px] font-semibold text-espresso">里程碑</p>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex gap-3 pb-4 relative"
              >
                {i < milestones.length - 1 && (
                  <div className="absolute left-[19px] top-8 w-[2px] h-[calc(100%-8px)] bg-sand" />
                )}
                <div className="w-10 h-10 rounded-full bg-amber/15 text-amber flex items-center justify-center shrink-0">
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-espresso">{m.title}</p>
                    <span className="text-[11px] text-taupe bg-cream px-1.5 py-0.5 rounded">{m.date}</span>
                  </div>
                  <p className="text-[12px] text-taupe mt-0.5">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Character Tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-warmWhite rounded-2xl border border-sand p-4"
        >
          <p className="text-[15px] font-semibold text-espresso mb-3">性格标签</p>
          <div className="flex flex-wrap gap-2">
            {['好奇', '户外派', '社牛', '粘人', '贪吃', '勇敢'].map((tag) => (
              <span key={tag} className="bg-cream text-espresso text-[13px] px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Growth;
