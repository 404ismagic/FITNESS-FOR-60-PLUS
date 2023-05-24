import React, { useState } from 'react'
import SearchBar from '../components/SearchBarComp'
import { UseQuery } from 'react'
import { SEARCHED_FOOD } from '../utils/queries'
import { useParams } from 'react-router-dom'

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const { search } = useParams();

  const handleSearch = async (term) => {
    try {
      const { loading, data, error } = await UseQuery(SEARCHED_FOOD, {
        variables: { search: term },
      })
      

      setSearchResults([])
    } catch (error) {
      console.error(error)
    }
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

