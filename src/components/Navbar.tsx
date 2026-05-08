import type { FC } from 'react';
import { Gear, Bell } from 'phosphor-react';

interface NavbarProps {
  title: string;
  onSettingsClick?: () => void;
  onNotificationClick?: () => void;
  hasNotification?: boolean;
}

const Navbar: FC<NavbarProps> = ({ title, onSettingsClick, onNotificationClick, hasNotification }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[48px] bg-warmWhite/80 backdrop-blur-[12px] border-b border-sand flex items-center justify-between px-6 max-w-[430px] mx-auto">
      <button
        onClick={onSettingsClick}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
        aria-label="设置"
      >
        <Gear size={24} className="text-taupe" weight="regular" />
      </button>
      <h1 className="text-[18px] font-semibold text-espresso tracking-tight">{title}</h1>
      <button
        onClick={onNotificationClick}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95 relative"
        aria-label="通知"
      >
        <Bell size={24} className="text-taupe" weight="regular" />
        {hasNotification && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-alert rounded-full" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
