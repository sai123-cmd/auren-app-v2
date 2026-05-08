import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, WifiHigh, Check, Bluetooth } from 'phosphor-react';

type DeviceState = 'scanning' | 'found' | 'connected' | 'wifi';

const statusMessages = [
  '正在打开蓝牙...',
  '搜索附近设备...',
  '发现 1 个设备',
  '正在连接...',
  '连接成功！',
];

const DevicePairing: FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<DeviceState>('scanning');
  const [statusIndex, setStatusIndex] = useState(0);
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');

  // Simulate BLE scanning progress
  useEffect(() => {
    if (state !== 'scanning') return;

    const timers = [
      setTimeout(() => setStatusIndex(1), 800),
      setTimeout(() => setStatusIndex(2), 2000),
      setTimeout(() => setState('found'), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [state]);

  // Auto-advance after connected
  useEffect(() => {
    if (state === 'connected') {
      const timer = setTimeout(() => navigate('/pet-info'), 1200);
      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  const handleConnect = useCallback(() => {
    setState('connected');
    setStatusIndex(4);
  }, []);

  const handleSkip = useCallback(() => {
    navigate('/pet-info');
  }, [navigate]);

  const handleWifiSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (wifiName && wifiPassword) {
      handleConnect();
    }
  }, [wifiName, wifiPassword, handleConnect]);

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col">
      {/* Header */}
      <div className="pt-6 px-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/auth')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
          aria-label="返回"
        >
          <ArrowLeft size={24} className="text-taupe" weight="regular" />
        </button>
        <h1 className="text-[22px] font-semibold text-espresso tracking-[-0.01em] leading-[1.3]">连接设备</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {state === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Device illustration with scanning rings */}
              <div className="relative w-[160px] h-[160px] flex items-center justify-center mb-8">
                {/* Scanning rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-taupe/30"
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-taupe/30"
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-taupe/30"
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 1.0 }}
                />
                {/* Device icon */}
                <motion.div
                  className="w-[100px] h-[100px] bg-warmWhite rounded-full flex items-center justify-center"
                  style={{ boxShadow: '0 2px 16px rgba(61,43,31,0.06)' }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number] }}
                >
                  <Bluetooth size={48} className="text-taupe" weight="regular" />
                </motion.div>
              </div>

              <p className="text-espresso text-[16px] font-semibold mb-2">将设备靠近手机</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-taupe text-[14px]"
                >
                  {statusMessages[statusIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {state === 'found' && (
            <motion.div
              key="found"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center w-full"
            >
              {/* Device found icon */}
              <motion.div
                className="w-[120px] h-[120px] bg-warmWhite rounded-full flex items-center justify-center mb-6"
                style={{ boxShadow: '0 2px 16px rgba(61,43,31,0.06)' }}
                animate={{
                  boxShadow: [
                    '0 2px 16px rgba(61,43,31,0.06)',
                    '0 0 0 4px rgba(240,168,84,0.3)',
                    '0 2px 16px rgba(61,43,31,0.06)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Bluetooth size={48} className="text-amber" weight="fill" />
              </motion.div>

              <p className="text-espresso text-[16px] font-semibold mb-1">发现 AUREN 设备</p>
              <p className="text-taupe text-[14px] mb-8">型号: A1-Pro • 信号强度: 强</p>

              {/* WiFi setup */}
              <form onSubmit={handleWifiSubmit} className="w-full flex flex-col gap-4">
                <p className="text-espresso text-[16px] font-semibold">配置 WiFi</p>
                <input
                  type="text"
                  value={wifiName}
                  onChange={(e) => setWifiName(e.target.value)}
                  placeholder="WiFi 名称"
                  className="w-full h-12 bg-cream rounded-[12px] px-4 text-espresso text-[16px] placeholder:text-sand border-2 border-transparent focus:border-amber outline-none transition-colors"
                />
                <input
                  type="password"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="WiFi 密码"
                  className="w-full h-12 bg-cream rounded-[12px] px-4 text-espresso text-[16px] placeholder:text-sand border-2 border-transparent focus:border-amber outline-none transition-colors"
                />
                <motion.button
                  type="submit"
                  className="w-full h-12 bg-amber rounded-full text-espresso font-semibold text-base flex items-center justify-center gap-2 mt-2"
                  style={{ boxShadow: '0 8px 32px rgba(61,43,31,0.10)' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!wifiName || !wifiPassword}
                >
                  <WifiHigh size={20} weight="regular" />
                  连接设备
                </motion.button>
              </form>
            </motion.div>
          )}

          {state === 'connected' && (
            <motion.div
              key="connected"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="w-[120px] h-[120px] bg-amber/20 rounded-full flex items-center justify-center mb-6"
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(240,168,84,0.4)',
                    '0 0 0 20px rgba(240,168,84,0)',
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                >
                  <Check size={56} className="text-amber" weight="bold" />
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-amber text-[18px] font-semibold"
              >
                连接成功！
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-taupe text-[14px] mt-2"
              >
                即将进入下一步...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip link */}
      <div className="pb-10 px-6 text-center">
        <button
          onClick={handleSkip}
          className="text-sand text-[14px] hover:text-taupe transition-colors"
        >
          我没有设备，先跳过 →
        </button>
        <p className="text-sand text-[12px] mt-2 max-w-[280px] mx-auto">
          没有设备也可以继续，但部分功能需要设备支持。之后随时可以配对。
        </p>
      </div>
    </div>
  );
};

export default DevicePairing;
