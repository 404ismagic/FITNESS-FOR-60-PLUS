import React, { useState } from 'react'
import SearchBarComp from '../components/SearchBarComp'
import { useQuery } from '@apollo/client'
import { SEARCHED_FOOD } from '../utils/queries'

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { loading, data, error } = useQuery(SEARCHED_FOOD);

  const { loading: searchLoading, data: searchData, error: searchError } = await useQuery(SEARCHED_FOOD, {
    variables: { search: term },
  })

  const handleSearch = async (term) => {
    try {

      if (!searchLoading && searchData) {
        const results = searchData.search || [];
        setSearchResults(results);
      }
    } catch (err) {
      console.error(err)
      console.log(error)
      console.log(loading)
    }
  };

  return (
    <div>
      <h1>Search Results</h1>
      {/* Pass the handleSearch function to the SearchBarComp component */}
      <SearchBarComp onSearch={handleSearch} />
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