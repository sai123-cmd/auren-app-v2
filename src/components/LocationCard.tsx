import type { FC } from 'react';
import { motion } from 'framer-motion';
import { CaretRight } from 'phosphor-react';

interface LocationCardProps {
  status: 'safe' | 'warn' | 'alert';
  location: string;
  battery?: number;
  time?: string;
  onClick?: () => void;
}

const statusConfig = {
  safe: { color: '#7CB87C', bg: 'bg-safe/10', label: '安全' },
  warn: { color: '#E8C547', bg: 'bg-warn/10', label: '预警' },
  alert: { color: '#D4524A', bg: 'bg-alert/10', label: '紧急' },
};

const LocationCard: FC<LocationCardProps> = ({ status, location, battery, time, onClick }) => {
  const config = statusConfig[status];
  const pulseDuration = status === 'alert' ? 1 : status === 'warn' ? 1.5 : 2;

  return (
    <motion.button
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      onClick={onClick}
      className={`w-full h-[56px] rounded-[12px] ${config.bg} flex items-center px-4 relative overflow-hidden active:scale-[0.98] transition-transform`}
    >
      {/* Left status bar */}
      <div
        className="absolute left-0 top-2 bottom-2 w-1 rounded-full"
        style={{ backgroundColor: config.color }}
      />

      {/* Status dot with breathing animation */}
      <motion.div
        animate={{
          scale: [1, status === 'alert' ? 1.03 : 1.02, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: pulseDuration,
          repeat: Infinity,
          ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
        }}
        className="w-2 h-2 rounded-full mr-3 ml-1 shrink-0"
        style={{ backgroundColor: config.color }}
      />

      {/* Location info */}
      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-espresso text-base font-medium truncate">
            {location}
            {battery !== undefined && (
              <span className="text-taupe text-sm font-normal ml-1">· 电量{battery}%</span>
            )}
          </span>
        </div>
        {time && <span className="text-taupe text-sm shrink-0 ml-2">{time}</span>}
        <CaretRight size={16} className="text-taupe shrink-0 ml-1" weight="regular" />
      </div>
    </motion.button>
  );
};

export default LocationCard;
