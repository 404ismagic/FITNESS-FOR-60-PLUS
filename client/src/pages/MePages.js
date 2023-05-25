// import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import CalorieCounter from '../components/CalorieCounterCom';
import './MePages.css';
import { Link } from 'react-router-dom';



import CalorieCounter from '../components/CalorieCounterCom'
import SearchBar from '../components/SearchBarComp'

const MePages = () => {
  const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: 'no-cache'
  });

  const userData = data?.me || {};
  const [goals, setGoals] = useState(userData.goals || '');
  const [currentCalorieCount, setCurrentCalorieCount] = useState(userData.currentCalorieCount || 0);
  const [newGoal, setNewGoal] = useState('');

  const handleGoalChange = (e) => {
    setNewGoal(e.target.value);
  };

  const saveCalories = () => {
    const profile = new Profile(); // Create an instance of the Profile model
    const totalCalories = profile.calculateTotalCalories([
      // meal1Calories,
      // meal2Calories,
      // meal3Calories,
      // meal4Calories,
    ]);
    setCurrentCalorieCount(totalCalories);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return <h1>Loading your Page</h1>;
  }

  return (
    <div>
      <header className="header">
        <Link to="/profile">Profile</Link>
      </header>
      <h1 className='one'> My Page</h1>
      <h1>My Page</h1>
      <div><SearchBar /></div>
      <div className='card-container'>
        {days.map((day, index) => (
          <CalorieCounter key={index} day={day} />
        ))}
      </div>
      <div>
        <label>New Goal:</label>
        <input type="text" value={newGoal} onChange={handleGoalChange} />
      </div>
      <button onClick={() => setGoals(newGoal)}>Set Goal</button>
    </div>
  );
};

export default MePages;