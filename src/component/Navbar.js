import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../app/themeSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); 
  return (
    <div
      className={`h-16 flex justify-between items-center  border-b border-gray-600s shadow-lg px-4 transition-all duration-300 ${isDarkMode ? 'bg-[#1e293b] text-white' : 'bg-white text-gray-800'
        }`}>
      <h1 className="text-xl font-bold">RMart</h1>
      <h1 className="text-2xl font-bold">React APP</h1>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-2 rounded-full transition duration-300"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? (
          <span className="text-white">🌙</span>
        ) : (
          <span className="text-gray-600">🌞</span>
        )}
      </button>
    </div>
  );
};

export default NavBar;
