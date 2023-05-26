// import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import CalorieCounter from '../components/CalorieCounterCom';
import SearchBar from '../components/SearchBarComp';
import ToolBar from '../components/ToolBarCom';
// comment to fix merge issue
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

  const saveCalories = (totalCalories) => {
    setCurrentCalorieCount(totalCalories);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return <h1>Loading your Page</h1>;
  }

  return (
    <div>
    <h1>My Page</h1>
    <div>
      <SearchBar />
    </div>
    <div className="card-container">
      {days.map((day) => (
        <CalorieCounter
          key={day}
          day={day}
          saveCalories={saveCalories}
          goals={goals}
          currentCalorieCount={currentCalorieCount}
          setCurrentCalorieCount={setCurrentCalorieCount}
        />
      ))}
    </div>
    <div className="bottom-container">
      <div>
        <label>Current Calorie Count:</label>
        <input
          type="text"
          value={currentCalorieCount}
          onChange={(e) => setCurrentCalorieCount(e.target.value)}
        />
      </div>
      <div>
        <label>Goal Calorie Count:</label>
        <input
          type="text"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </div>
      <div>
      {/* <ToolBar goals={goals} currentCalorieCount={currentCalorieCount} /> */}
</div>
    </div>
  </div>
  
  );
};

export default MePages;