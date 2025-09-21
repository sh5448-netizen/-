import React from 'react';
import { DogIcon } from '../icons';

interface HeaderProps {
  dogName: string;
  photo?: string;
}

const Header: React.FC<HeaderProps> = ({ dogName, photo }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {photo ? (
            <img src={photo} alt={dogName} className="w-10 h-10 rounded-full object-cover border-2 border-rose-200" />
          ) : (
            <DogIcon className="w-10 h-10 text-rose-500" />
          )}
          <span className="text-xl font-bold text-gray-800 ml-3">포메모여라!</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">환영합니다</div>
          <div className="font-semibold text-gray-700">{dogName} 견주님</div>
        </div>
      </div>
    </header>
  );
};

export default Header;