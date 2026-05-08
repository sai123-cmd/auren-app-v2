import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertBannerProps {
  message: string;
  visible: boolean;
  type?: 'alert' | 'warn';
}

const AlertBanner: FC<AlertBannerProps> = ({ message, visible, type = 'alert' }) => {
  const bgColor = type === 'alert' ? 'bg-alert' : 'bg-warn';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          className={`fixed top-[48px] left-0 right-0 z-[200] h-[40px] ${bgColor} flex items-center justify-center max-w-[430px] mx-auto`}
        >
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white text-sm font-medium"
          >
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBanner;
