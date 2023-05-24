// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import CalorieCounter from '../components/CalorieCounterCom'
import SearchBar from '../components/SearchBarComp'
const MePages = () => {
  // const [calories, setCalories] = useState(0)
  // remember to add data
  const { loading } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });

  // const userData = data?.me || {}
  // function saveCalories() {
  //   console.log(calories)
  // }
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  if (loading) {
    return (
      <h1>Loading your Page</h1>
    )
  }
  return (
    <div>
      <h1>My Page</h1>
      <div><SearchBar /></div>
      <div className='card-container'>
        {days.map((day) => (
        <CalorieCounter day= {day} />
        ))}
      </div>
    </div>
  );
}
export default MePages