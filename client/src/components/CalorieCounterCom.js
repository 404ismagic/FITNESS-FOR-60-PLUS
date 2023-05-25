import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_FOOD } from '../utils/mutations';

const CalorieCounter = ({ day }) => {
  const [meal1Calories, setMeal1Calories] = useState(0);
  const [meal2Calories, setMeal2Calories] = useState(0);
  const [meal3Calories, setMeal3Calories] = useState(0);
  const [meal4Calories, setMeal4Calories] = useState(0);

  const [saveFood, { loading, error }] = useMutation(SAVE_FOOD);

  const saveCalories = () => {
    const totalCalories =
      meal1Calories + meal2Calories + meal3Calories + meal4Calories;

    saveFood({
      variables: {
        name: day,
        calories: totalCalories,
      },
    })
      .then(() => {
        console.log('Calories saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving calories:', error);
      });

    console.log('Meal 1 calories:', meal1Calories);
    console.log('Meal 2 calories:', meal2Calories);
    console.log('Meal 3 calories:', meal3Calories);
    console.log('Meal 4 calories:', meal4Calories);
  };

  return (
    <div className="container">
      <header className="header"></header>

      <div className="content">
        <h1>{day}: Calories</h1>

        <div className="meal-input">
          <label>Meal 1:</label>
          <input
            type="number"
            value={meal1Calories}
            onChange={(e) =>
              setMeal1Calories(parseInt(e.target.value, 10))
            }
          />
        </div>

        <div className="meal-input">
          <label>Meal 2:</label>
          <input
            type="number"
            value={meal2Calories}
            onChange={(e) =>
              setMeal2Calories(parseInt(e.target.value, 10))
            }
          />
        </div>

        <div className="meal-input">
          <label>Meal 3:</label>
          <input
            type="number"
            value={meal3Calories}
            onChange={(e) =>
              setMeal3Calories(parseInt(e.target.value, 10))
            }
          />
        </div>

        <div className="meal-input">
          <label>Meal 4:</label>
          <input
            type="number"
            value={meal4Calories}
            onChange={(e) =>
              setMeal4Calories(parseInt(e.target.value, 10))
            }
          />
        </div>

        <button onClick={saveCalories} disabled={loading}>
          {loading ? 'Saving...' : 'Save Calories'}
        </button>

        {error && <p>Error saving calories: {error.message}</p>}
      </div>
    </div>
  );
};

export default CalorieCounter;