import React, { useState } from 'react';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 検索処理をここに追加
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="App-content">
      <h2>Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
