import type { FC } from 'react';
import { Sun, BookOpen, PawPrint, Users } from 'phosphor-react';
import { NavLink } from 'react-router';

interface BottomTabBarProps {
  activeTab: string;
}

const tabs = [
  { id: 'today', label: '今日', path: '/', icon: Sun },
  { id: 'memory', label: '回忆', path: '/memory', icon: BookOpen },
  { id: 'ta', label: 'TA', path: '/ta', icon: PawPrint },
  { id: 'community', label: '社区', path: '/community', icon: Users },
];

const BottomTabBar: FC<BottomTabBarProps> = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[64px] bg-warmWhite border-t border-sand max-w-[430px] mx-auto">
      <div className="flex items-center justify-around h-full pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-amber' : 'text-taupe'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={24}
                    weight={isActive ? 'fill' : 'regular'}
                    className={isActive ? '-translate-y-0.5' : ''}
                  />
                  <span className="text-[12px] font-medium tracking-wide">{tab.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabBar;
