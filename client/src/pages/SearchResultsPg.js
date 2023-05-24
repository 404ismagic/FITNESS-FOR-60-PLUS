import React, { useState } from 'react';
import SearchBar from '../components/SearchBarComp';
import { useQuery } from '@apollo/client';

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Make a GraphQL query using the search term
    // Update the searchResults state with the fetched data
    // fetchSearchResults(term)
    //   .then((data) => setSearchResults(data))
    //   .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Search Results</h1>
      <SearchBar onSearch={handleSearch} />
      {/* Render the search results */}
      {searchResults.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage
