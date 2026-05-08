import type { FC, ReactNode } from 'react';
import Navbar from './Navbar';
import BottomTabBar from './BottomTabBar';

interface LayoutProps {
  children: ReactNode;
  title: string;
  activeTab: string;
  hideTabBar?: boolean;
  hideNavbar?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, title, activeTab, hideTabBar, hideNavbar }) => {
  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative">
      {!hideNavbar && <Navbar title={title} />}
      <main
        className={`${!hideNavbar ? 'pt-[48px]' : ''} ${!hideTabBar ? 'pb-[64px]' : ''} px-6`}
      >
        {children}
      </main>
      {!hideTabBar && <BottomTabBar activeTab={activeTab} />}
    </div>
  );
};

export default Layout;
