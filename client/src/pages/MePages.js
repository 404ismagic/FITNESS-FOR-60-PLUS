import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Me from '../components/Me'

// const MePages = () => {
//   const [calories,setCalories] = useState(0)
//   const { loading, data } = useQuery(QUERY_ME, {
//     fetchPolicy: "no-cache"
//   });

//   const melist = data?.me || [];
// function saveCalories(){
//   console.log(calories)
// }
//   return (
//     <div>
// <h1>Me page</h1>
// <p>calories; {calories}</p>
// <input onChange={e => setCalories(e.target.value)}></input>
// <button onClick={saveCalories}>Click here</button>
//     </div>
//     );
// }
// export default MePages;
const CalorieCounter = () => {
  const [meal1Calories, setMeal1Calories] = useState(0);
  const [meal2Calories, setMeal2Calories] = useState(0);
  const [meal3Calories, setMeal3Calories] = useState(0);
  const [meal4Calories, setMeal4Calories] = useState(0);

  function saveCalories() {
    // Perform any desired operations with the entered calorie values
    console.log('Meal 1 calories:', meal1Calories);
    console.log('Meal 2 calories:', meal2Calories);
    console.log('Meal 3 calories:', meal3Calories);
    console.log('Meal 4 calories:', meal4Calories);
  }

  return (
    <div className="container">
      <header className="header">
      </header>

      <div className="content">
        <h1>Calorie Counter</h1>

        <div className="meal-input">
          <label>Meal 1:</label>
          <input type="number" value={meal1Calories} onChange={e => setMeal1Calories(parseInt(e.target.value, 10))} />
        </div>

        <div className="meal-input">
          <label>Meal 2:</label>
          <input type="number" value={meal2Calories} onChange={e => setMeal2Calories(parseInt(e.target.value, 10))} />
        </div>

        <div className="meal-input">
          <label>Meal 3:</label>
          <input type="number" value={meal3Calories} onChange={e => setMeal3Calories(parseInt(e.target.value, 10))} />
        </div>

        <div className="meal-input">
          <label>Meal 4:</label>
          <input type="number" value={meal4Calories} onChange={e => setMeal4Calories(parseInt(e.target.value, 10))} />
        </div>

        <button onClick={saveCalories}>Save Calories</button>
      </div>
    </div>
  );
};

export default CalorieCounter;