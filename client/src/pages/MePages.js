import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import CalorieCounter from '../components/CalorieCounterCom';
import './MePages.css';
import { Link } from 'react-router-dom';


const MePages = () => {
  // const [calories, setCalories] = useState(0)
  const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });

  const userData = data?.me || {}
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
      <header className="header">
        <Link to="/profile">Profile</Link>
      </header>
      <h1 className='one'> My Page</h1>
      <div></div>
      <div className='card-container'>
        {days.map((day, index) => (
          <CalorieCounter key={index} day={day} />
        ))}
      </div>
    </div>
  );
}
export default MePages