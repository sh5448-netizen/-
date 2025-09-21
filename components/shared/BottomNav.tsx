import React from 'react';
import { Screen } from '../../types';
import { HomeIcon, HeartIcon, ScanIcon, UsersIconGroup, ShoppingCartIcon } from '../icons';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  screen: Screen;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ screen, label, icon, isActive, onClick }) => {
  const activeClass = isActive ? 'text-rose-600 font-bold' : 'text-gray-500';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${activeClass} hover:text-rose-500`}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { screen: Screen.Dashboard, label: '홈', icon: <HomeIcon className="w-6 h-6" /> },
    { screen: Screen.HealthCheck, label: '건강 체크', icon: <HeartIcon className="w-6 h-6" /> },
    { screen: Screen.Scanner, label: '스캐너', icon: <ScanIcon className="w-6 h-6" /> },
    { screen: Screen.Community, label: '커뮤니티', icon: <UsersIconGroup className="w-6 h-6" /> },
    { screen: Screen.Shop, label: '쇼핑', icon: <ShoppingCartIcon className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-200 shadow-t-lg z-10">
      <div className="flex justify-around">
        {navItems.map(item => (
          <NavItem
            key={item.screen}
            screen={item.screen}
            label={item.label}
            icon={item.icon}
            isActive={activeScreen === item.screen}
            onClick={() => setActiveScreen(item.screen)}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;