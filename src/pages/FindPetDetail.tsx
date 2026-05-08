import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Camera,
  NavigationArrow,
  Warning,
  Copy,
  Check,
  Compass,
  Activity,
} from 'phosphor-react';
import { useNavigate } from 'react-router';

const FindPetDetail: FC = () => {
  const navigate = useNavigate();
  const [flashActive, setFlashActive] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState(12.5);
  const [photoTimestamp] = useState('14:32');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      setGpsAccuracy(prev => Math.max(3.2, +(prev + (Math.random() - 0.5) * 2).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyAddress = () => {
    navigator.clipboard?.writeText('中央公园北门附近灌木丛 (40.7484°N, 73.9857°W)');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto">
      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-50 bg-warmWhite/95 backdrop-blur border-b border-sand">
        <div className="flex items-center px-4 h-12">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center -ml-2">
            <ArrowLeft size={22} className="text-espresso" />
          </button>
          <h1 className="flex-1 text-center text-[15px] font-semibold text-espresso pr-6">实时追踪</h1>
        </div>
      </div>

      <div className="px-4 pt-4 pb-48 space-y-4">

        {/* ── Layer 1: GPS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-warmWhite rounded-2xl border border-sand overflow-hidden"
        >
          {/* Layer header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-sand/50">
            <div className="w-8 h-8 rounded-full bg-safe/15 text-safe flex items-center justify-center">
              <Compass size={18} weight="fill" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-espresso">卫星定位</p>
              <p className="text-[11px] text-taupe">GPS + WiFi + 基站三重定位</p>
            </div>
            <div className="flex items-center gap-1">
              <Activity size={14} className="text-safe animate-pulse" />
              <span className="text-[12px] text-safe font-medium">实时</span>
            </div>
          </div>

          {/* Map preview */}
          <div className="relative mx-4 mt-3 rounded-xl overflow-hidden h-[160px]">
            <img src="/map-style-bg.png" alt="map" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-dark/10" />
            {/* Center pulse dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-14 h-14 rounded-full bg-alert/30"
              />
              <div className="relative w-4 h-4 rounded-full bg-alert border-2 border-warmWhite shadow-lg" />
            </div>
            {/* Accuracy badge */}
            <div className="absolute top-2 right-2 bg-warmWhite/90 backdrop-blur rounded-lg px-2 py-1">
              <span className="text-[11px] text-espresso font-medium">±{gpsAccuracy}m</span>
            </div>
          </div>

          {/* Address */}
          <div className="px-4 py-3">
            <button onClick={copyAddress} className="w-full flex items-center justify-between group">
              <div className="flex items-center gap-2 min-w-0">
                <MapPin size={16} className="text-alert shrink-0" weight="fill" />
                <span className="text-[14px] text-espresso truncate">中央公园北门附近灌木丛</span>
              </div>
              <span className="text-taupe group-hover:text-amber transition-colors">
                {copied ? <Check size={16} className="text-safe" /> : <Copy size={16} />}
              </span>
            </button>
            <p className="text-[11px] text-taupe mt-1 pl-6 font-mono">40.7484°N, 73.9857°W</p>
          </div>
        </motion.div>

        {/* ── Layer 2: Image ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-warmWhite rounded-2xl border border-sand overflow-hidden"
        >
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-sand/50">
            <div className="w-8 h-8 rounded-full bg-amber/15 text-amber flex items-center justify-center">
              <Camera size={18} weight="fill" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-espresso">环境影像</p>
              <p className="text-[11px] text-taupe">AI 图像回传 · {photoTimestamp} 更新</p>
            </div>
            <div className="bg-cream rounded-full px-2 py-0.5">
              <span className="text-[11px] text-taupe">最近</span>
            </div>
          </div>

          {/* Photo */}
          <div className="relative mx-4 mt-3 rounded-xl overflow-hidden">
            <img src="/community-1.png" alt="环境照片" className="w-full h-[200px] object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/50 to-transparent p-3">
              <div className="flex gap-1.5">
                {['灌木丛', '草地', '户外'].map(t => (
                  <span key={t} className="bg-warmWhite/90 text-espresso text-[11px] px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <p className="px-4 py-3 text-[13px] text-taupe leading-relaxed">
            AI 分析：检测到绿色植被区域，Bella 当前处于灌木丛遮蔽处，环境阴凉。
          </p>
        </motion.div>

        {/* ── Layer 3: Flash ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl border overflow-hidden transition-colors ${
            flashActive ? 'border-alert bg-alert/[0.04]' : 'border-sand bg-warmWhite'
          }`}
        >
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-sand/50">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              flashActive ? 'bg-alert/15 text-alert' : 'bg-taupe/15 text-taupe'
            }`}>
              <Compass size={18} weight="fill" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-espresso">精确定位</p>
              <p className="text-[11px] text-taupe">远程 LED 爆闪 · 夜间/隐蔽环境</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${flashActive ? 'bg-alert animate-pulse' : 'bg-sand'}`} />
          </div>

          <div className="px-4 py-4">
            <div className={`relative rounded-xl h-[100px] flex items-center justify-center overflow-hidden transition-colors ${
              flashActive ? 'bg-alert/[0.08]' : 'bg-cream'
            }`}>
              {flashActive && (
                <motion.div
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-alert/10"
                />
              )}
              <div className="relative text-center">
                <p className={`text-[28px] font-bold ${flashActive ? 'text-alert' : 'text-sand'}`}>
                  {flashActive ? '● 闪烁中' : '○ 待机'}
                </p>
                <p className="text-[11px] text-taupe mt-1">
                  {flashActive ? '1Hz 频率 · 预计续航 15 分钟' : '点击开启以精确定位 Bella'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setFlashActive(!flashActive)}
              className={`w-full mt-3 h-11 rounded-xl font-semibold text-[15px] transition-all ${
                flashActive
                  ? 'bg-alert text-warmWhite'
                  : 'bg-cream text-espresso border border-sand hover:border-amber'
              }`}
            >
              {flashActive ? '关闭爆闪' : '开启 LED 爆闪'}
            </button>

            <div className="flex items-start gap-2 mt-3">
              <Warning size={14} className="text-warn shrink-0 mt-0.5" />
              <p className="text-[11px] text-taupe">
                爆闪消耗电量较快，当前电量 34%，建议仅在夜间或隐蔽环境使用。
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Sticky Bottom Action Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-warmWhite border-t border-sand z-40">
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <button className="h-12 rounded-xl bg-safe text-warmWhite font-semibold text-[15px] flex items-center justify-center gap-2">
              <NavigationArrow size={18} weight="fill" />
              前往
            </button>
            <button className="h-12 rounded-xl bg-coral text-warmWhite font-semibold text-[15px] flex items-center justify-center gap-2">
              <Warning size={18} weight="fill" />
              寻宠启事
            </button>
          </div>
        </div>
        <div className="h-[34px]" />
      </div>
    </div>
  );
};

export default FindPetDetail;
