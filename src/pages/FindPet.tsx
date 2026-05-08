import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Phone,
  NavigationArrow,
  Megaphone,
  Headset,
  WarningCircle,
  BatteryWarning,
  Clock,
  MapPin,
  X,
  Copy,
  ShareNetwork,
} from 'phosphor-react';

/* ------------------------------------------------------------------ */
/*  Ripple pulse dot — isolated infinite animation                     */
/* ------------------------------------------------------------------ */
const RippleDot: FC = () => {
  return (
    <div className="relative w-5 h-5">
      <motion.div
        className="absolute inset-0 rounded-full bg-alert/40"
        animate={{ scale: [1, 3, 3], opacity: [0.6, 0.2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-alert/30"
        animate={{ scale: [1, 2.2, 2.2], opacity: [0.5, 0.15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
      />
      <div className="absolute inset-0 rounded-full bg-alert shadow-[0_0_12px_rgba(212,82,74,0.6)]" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Info chip                                                          */
/* ------------------------------------------------------------------ */
interface InfoChipProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  warn?: boolean;
}

const InfoChip: FC<InfoChipProps> = ({ icon, label, value, warn }) => {
  return (
    <div className="flex items-center gap-2 bg-warmWhite/90 backdrop-blur-sm rounded-xl px-3 py-2">
      <span className={warn ? 'text-alert' : 'text-taupe'}>{icon}</span>
      <div>
        <p className="text-[10px] text-taupe leading-tight">{label}</p>
        <p className={`text-[14px] font-semibold leading-tight ${warn ? 'text-alert' : 'text-espresso'}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Lost Pet Poster Modal                                              */
/* ------------------------------------------------------------------ */
interface PosterModalProps {
  open: boolean;
  onClose: () => void;
}

const PosterModal: FC<PosterModalProps> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] bg-black/50 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-warmWhite w-full max-w-[430px] rounded-t-[24px] p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-espresso">寻宠启事</h3>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush transition-colors">
                <X size={20} className="text-taupe" />
              </button>
            </div>

            <div className="bg-cream rounded-2xl p-4 space-y-3 border border-sand">
              <div className="text-center">
                <p className="text-[20px] font-bold text-alert tracking-wide">寻 宠 启 事</p>
                <p className="text-[12px] text-taupe mt-1">重金酬谢 · 感激不尽</p>
              </div>
              <div className="h-px bg-sand" />
              <div className="space-y-2 text-[14px] text-espresso">
                <p>
                  <span className="text-taupe">宠物名字：</span>豆豆
                </p>
                <p>
                  <span className="text-taupe">品种：</span>金毛寻回犬
                </p>
                <p>
                  <span className="text-taupe">特征：</span>黄色毛发，戴红色项圈，左耳有白色斑点
                </p>
                <p>
                  <span className="text-taupe">最后位置：</span>中央公园北门附近
                </p>
                <p>
                  <span className="text-taupe">丢失时间：</span>2024年3月15日 14:30
                </p>
                <p>
                  <span className="text-taupe">联系人：</span>张先生 138-****-8888
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('已复制到剪贴板')}
                className="flex-1 h-12 bg-coral rounded-full flex items-center justify-center gap-2 text-white font-semibold text-[14px] shadow-[0_2px_8px_rgba(232,146,124,0.3)]"
              >
                <Copy size={18} />
                复制文本
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('已生成分享图片')}
                className="flex-1 h-12 bg-amber rounded-full flex items-center justify-center gap-2 text-espresso font-semibold text-[14px] shadow-[0_2px_8px_rgba(240,168,84,0.3)]"
              >
                <ShareNetwork size={18} />
                生成海报
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  FindPet Page                                                       */
/* ------------------------------------------------------------------ */
const FindPet: FC = () => {
  const navigate = useNavigate();
  const [posterOpen, setPosterOpen] = useState(false);
  const [trackProgress, setTrackProgress] = useState(35);

  const handleCall = useCallback(() => {
    alert('正在连接 AUREN 客服...\n客服将协助您制定寻宠方案');
  }, []);

  const handleNavigate = useCallback(() => {
    alert('已打开地图导航\n目标：中央公园北门附近');
  }, []);

  return (
    <div className="min-h-[100dvh] max-w-[430px] mx-auto relative overflow-hidden bg-dark">
      {/* Full-bleed map background */}
      <div className="absolute inset-0">
        <img
          src="/map-style-bg.png"
          alt="map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/20" />
      </div>

      {/* Top overlay bar */}
      <div className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 pt-3 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-warmWhite/80 backdrop-blur-sm active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} className="text-espresso" />
        </button>
        <div className="bg-warmWhite/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
          <MapPin size={16} className="text-amber" weight="fill" />
          <span className="text-[14px] font-semibold text-espresso">寻宠模式</span>
        </div>
        <div className="flex items-center gap-1.5 bg-warmWhite/80 backdrop-blur-sm rounded-full px-3 py-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-alert"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[12px] font-medium text-alert">实时追踪中</span>
        </div>
      </div>

      {/* Center pulsing red dot */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <RippleDot />
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 bg-alert/90 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1.5 rounded-full"
        >
          最后已知位置
        </motion.div>
      </div>

      {/* Bottom stacked info cards */}
      <div className="absolute bottom-0 left-0 right-0 z-[100]">
        {/* Emergency strip */}
        <div className="mx-4 mb-2">
          <motion.div
            className="bg-alert/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center justify-between"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2">
              <WarningCircle size={18} className="text-white" weight="fill" />
              <span className="text-[13px] font-medium text-white">电量不足 · 请尽快找到TA</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('正在连接客服...')}
                className="text-[12px] text-white/90 hover:text-white transition-colors flex items-center gap-1"
              >
                <Headset size={14} />
                联系客服
              </button>
              <button
                onClick={() => alert('已发送紧急求助信息给紧急联系人')}
                className="text-[12px] bg-white/20 hover:bg-white/30 transition-colors text-white px-2.5 py-1 rounded-full font-medium"
              >
                紧急求助
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main bottom card */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
          className="bg-warmWhite rounded-t-[24px] shadow-[0_-4px_24px_rgba(61,43,31,0.08)] px-5 pt-5 pb-8"
        >
          {/* Info chips row */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
            <InfoChip
              icon={<MapPin size={16} weight="fill" />}
              label="最后位置"
              value="中央公园北门附近"
            />
            <InfoChip
              icon={<BatteryWarning size={16} weight="fill" />}
              label="设备电量"
              value="34%"
              warn
            />
            <InfoChip
              icon={<Clock size={16} weight="fill" />}
              label="更新时间"
              value="14:32"
            />
          </div>

          {/* 6-hour track timeline */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium text-taupe">6小时轨迹回放</span>
              <span className="text-[12px] text-taupe">08:32 - 14:32</span>
            </div>
            <div className="relative h-8 bg-cream rounded-lg overflow-hidden">
              {/* Track line */}
              <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-sand -translate-y-1/2 rounded-full" />
              {/* Progress segments */}
              <div className="absolute top-1/2 left-3 h-0.5 bg-amber -translate-y-1/2 rounded-full" style={{ width: `${trackProgress}%` }} />
              {/* Slider thumb */}
              <input
                type="range"
                min={0}
                max={100}
                value={trackProgress}
                onChange={(e) => setTrackProgress(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {/* Visible thumb */}
              <motion.div
                className="absolute top-1/2 w-4 h-4 bg-amber rounded-full border-2 border-white shadow-sm -translate-y-1/2 pointer-events-none"
                style={{ left: `calc(12px + ${trackProgress}% - 16px * ${trackProgress / 100})` }}
              />
              {/* Time markers */}
              <div className="absolute bottom-0.5 left-3 right-3 flex justify-between text-[8px] text-taupe">
                <span>08:32</span>
                <span>11:00</span>
                <span>14:32</span>
              </div>
            </div>
          </div>

          {/* Action buttons row */}
          <div className="flex gap-2.5">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleCall}
              className="flex-1 h-12 bg-amber rounded-full flex items-center justify-center gap-1.5 text-espresso font-semibold text-[14px] shadow-[0_2px_8px_rgba(240,168,84,0.3)] active:shadow-none"
            >
              <Phone size={18} weight="fill" />
              联系客服
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleNavigate}
              className="flex-1 h-12 bg-safe rounded-full flex items-center justify-center gap-1.5 text-white font-semibold text-[14px] shadow-[0_2px_8px_rgba(124,184,124,0.3)] active:shadow-none"
            >
              <NavigationArrow size={18} weight="fill" />
              前往
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setPosterOpen(true)}
              className="flex-1 h-12 bg-coral rounded-full flex items-center justify-center gap-1.5 text-white font-semibold text-[14px] shadow-[0_2px_8px_rgba(232,146,124,0.3)] active:shadow-none"
            >
              <Megaphone size={18} weight="fill" />
              寻宠启事
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Poster Modal */}
      <PosterModal open={posterOpen} onClose={() => setPosterOpen(false)} />
    </div>
  );
};

export default FindPet;
