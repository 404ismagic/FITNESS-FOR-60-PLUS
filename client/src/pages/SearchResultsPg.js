import React, { useState } from 'react';
import SearchBarComp from '../components/SearchBarComp';
import { useQuery } from '@apollo/client';
import { SEARCHED_FOOD } from '../utils/queries';

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { data, error, loading } = useQuery(SEARCHED_FOOD);

  const handleSearch = async (searchTerm) => {
    try {
      const results = data?.search || [];
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      console.log(error);
      console.log(loading);
    }
  };

  return (
    <div>
      <h1>Search Results</h1>
      <SearchBarComp onSearch={handleSearch} />
      {searchResults.map((result) => (
        <div key={result.id}>
          <h3>{result.food_name}</h3>
          <p>{result.serving_unit}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;