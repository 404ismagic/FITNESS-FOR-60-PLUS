import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import CalorieCounter from '../components/CalorieCounterCom';
import SearchBarComp from '../components/SearchBarComp';
import ToolBar from '../components/ToolBarCom';

const MePages = () => {
  const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: 'no-cache',
  });

  const userData = data?.me || {};
  const [goals, setGoals] = useState(userData.goals || '');
  const [setCalorieCount] = useState(0);
  const [currentCalorieCount, setCurrentCalorieCount] = useState(userData.currentCalorieCount || 0);
  const [newGoal, setNewGoal] = useState('');
  
  const handleGoalChange = (e) => {
    setNewGoal(e.target.value);
  };

  const saveCalories = (totalCalories) => {
    setCurrentCalorieCount(totalCalories);
    setCalorieCount(totalCalories);
  };

  const resetCalories = () => {
    setCurrentCalorieCount(0);
    setCalorieCount(0);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return <h1>Loading your Page</h1>;
  }

  return (
  <div>
    <h1>My Page</h1>
    <div>
      <SearchBarComp />
    </div>
    <div>
      <ToolBar goals={goals} currentCalorieCount={currentCalorieCount} />
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
    <div>
      <div>
          <label>New Goal:</label>
          <input type="text" value={newGoal} onChange={handleGoalChange} />
        </div>
        <button onClick={() => setGoals(newGoal)}>Set Goal</button>
      </div>
    </div>
    );
  };
  
  export default MePages