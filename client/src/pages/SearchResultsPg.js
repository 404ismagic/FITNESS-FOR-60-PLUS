import React, { useState, } from 'react';
import { useParams } from 'react-router-dom';
// import SearchBarComp from '../components/SearchBarComp';
import { useQuery } from '@apollo/client';
import { SEARCHED_FOOD } from '../utils/queries';
import getNutrimix from '../utils/API';
const SearchResultsPage = () => {
  let {searchTerm} = useParams()
  const [searchResults, setSearchResults] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const { data, error, loading } = useQuery(SEARCHED_FOOD, {
    variables: {search:searchTerm}
  });
  const results = data?.search || [];
  const handleSearch = async (searchTerm) => {
    try {
      
      const results = await getNutrimix(searchTerm)
      console.log(results);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      console.log(error);
      console.log(loading);
    }
  };
  // const handleInputChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   getNutrimix(searchTerm);
  //   // navigate(`/searchresults/${searchTerm}`);
  // };
  return (
    <div>
      <h1>Search Results</h1>
     
      {results.map((result) => (
        <div key={result?.id}>
          <h3>{result?.food_name}</h3>
          <p>{result?.serving_unit}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;