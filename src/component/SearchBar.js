import React from 'react';
import { useSelector } from 'react-redux'; 

const SearchBar = ({ searchTerm, handleSearchChange }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); 

  return (
    <div className="flex items-center mb-4 w-full md:w-1/3">
      <input
        type="text"
        placeholder="Search by name or category..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
      />
    </div>
  );
};

export default SearchBar;