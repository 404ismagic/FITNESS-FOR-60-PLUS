import React from 'react';

const ToolBar = ({ goals, currentCalorieCount, resetCalories, setCalorieCount }) => {
  const handleResetCalories = () => {
    resetCalories()
    setCalorieCount(0)
  };

  return (
    <div className="top-bar">
      <div className="goals">
        <h3>This week's Goal: {goals} || {currentCalorieCount}</h3>
      </div>
      <button onClick={handleResetCalories}>Reset Calories</button>
    </div>
  );
};

export default ToolBar;
