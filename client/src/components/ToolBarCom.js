import React from 'react';

const ToolBar = ({ goals, currentCalorieCount }) => {
  return (
    <div className="top-bar">
      <div className="goals">
        <h3>This weeks Goal {goals} / {currentCalorieCount}</h3>
        {/* <p>{goals}</p> */}
      </div>
      {/* <div className="calorie-count">
        <h3>Current Calorie Count:</h3>
        <p>{currentCalorieCount}</p>
      </div> */}
    </div>
  );
};

export default ToolBar;