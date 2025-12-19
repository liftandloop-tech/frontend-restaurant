import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full md:w-64">
      <input
        type="text"
        placeholder="Search by name, phone, ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery && (
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" 
          onClick={() => setSearchQuery('')}
        >
          ×
        </button>
      )}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar;