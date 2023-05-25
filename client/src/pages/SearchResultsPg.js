import React, { useState } from 'react'
import SearchBar from '../components/SearchBarComp'
import { useQuery } from '@apollo/client'
import { SEARCHED_FOOD } from '../utils/queries'
import {useParams} from 'react-router-dom'
// import style from react-bootstrap
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([])
  // const { search } = useParams();

  const HandleSearch = async (term) => {
    const { loading, data, error } = await useQuery(SEARCHED_FOOD, {
      variables: { search: term },
    })
    try {
      const results = data?.search || []

      setSearchResults(results)
    } catch (err) {
      console.error(err)
      console.log(error)
      console.log(loading)
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
