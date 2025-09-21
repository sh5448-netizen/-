import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">AI가 분석하고 있어요...</p>
    </div>
  );
};

export default LoadingSpinner;