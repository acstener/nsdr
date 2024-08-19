import React from 'react';
import 'tailwindcss/tailwind.css';

const Skeleton = () => {
  return (
    <div className="p-8 mb-8 bg-site-bg min-h-screen max-w-[796px] mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-white mb-8">Loading...</h1>
      <div className="space-y-7">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex items-center p-7 bg-gradient-to-r from-[#1E1C20] to-[#1D1C20] rounded-[20px] border-[1.5px] border-solid border-[#2f2e31] w-full animate-pulse transition-opacity duration-500"
          >
            <div className="w-32 h-32 bg-gray-700 rounded-xl mr-8"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-8 bg-gray-700 rounded w-3/4"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;