import React, { useState} from "react";
import { Form, Button} from 'react-bootstrap';

import {createSearchFood} from './.';
import Token from './src/utils/App';

const SearchBarForm = () => {

    // create state for holding returned api data
    const [searchedFoods, setSearchedFoods] = useState([]);
    // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

   // create state to hold saved foodId values
   const [savedFoodIds, setSavedFoodIds] = useState(getSavedFoodIds());

    // set up useEffect hook to save `savedFoodIds` 
  useEffect(() => {
    return () => saveFoodIds(savedFoodIds);
  });

  // create method to search for foods and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await foodAPI(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const foodData = items.map((food) => ({
        foodId: food.id,
        description: food.Info.description,
        image: food.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedFoods(foodData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a food to our database
  const handleSaveFood = async (foodId) => {
    // find the book in `searchedFoodss` state by the matching id
    const foodToSave = searchedFoods.find((food) => food.foodId === foodId);

   // get token
     const token = Auth.loggedIn() ? Auth.getToken() : null;

     if (!token) {
       return false;
     }

    try {
      const response = await saveFood(foodToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if food successfully saves to user's account, save food id to state
      setSavedFoodIds([...savedFoodIds, foodToSave.foodId]);
    } catch (err) {
      console.error(err);
    }
  };


return (
<>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Foods!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a food'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedFoods.length
            ? `Viewing ${searchedFoods.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {searchedFoods.map((food) => {
            return (
              <Card key={food.foodId} border='dark'>
                {food.image ? (
                  <Card.Img src={food.image} alt={`The cover for ${food.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{food.title}</Card.Title>
                  <Card.Text>{food.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedFoodIds?.some((savedFoodId) => savedFoodId === food.foodId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveFood(food.foodId)}>
                      {savedFoodIds?.some((savedFoodId) => savedFoodId === food.foodId)
                         ? 'Save this Food!'
                        : 'Done!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBarForm;