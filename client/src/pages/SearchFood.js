import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Token from '../utils/app';
import { saveFood } from '../utils/API';
import { saveFoodIds, getSavedFoodIds } from '../utils/localStorage';

const SearchFood = () => {
  // create state for holding returned google api data
  const [searchedFood, setSearchedFood] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedFoodIds, setSavedFoodIds] = useState(getSavedFoodIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveFoodIds(savedFoodIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const foodData = items.map((food) => ({
        foodId: food.id,
        description: food.description,
        image: food.imageLinks?.thumbnail || '',
      }));

      setSearchedFood(foodData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a food to our database
  const handleSaveFood = async (foodId) => {
    // find the food in `searchedFood` state by the matching id
    const foodToSave = searchedFood.find((food) => food.foodId === foodId);

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
                  placeholder='Search for a book'
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
          {searchedFood.length
            ? `Viewing ${searchedFood.length} results:`
            : 'Search for a food to begin'}
        </h2>
        <CardColumns>
          {searchedFood.map((food) => {
            return (
              <Card key={food.foodId} border='dark'>
                {food.image ? (
                  <Card.Img src={food.image} alt={`The cover for ${food.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{food.name}</Card.Title>
                  <Card.Text>{food.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedFoodIds?.some((savedFoodId) => savedFoodId === food.foodId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveFood(food.foodId)}>
                      {savedFoodIds?.some((savedFoodId) => savedFoodId === food.foodId)
                        ? 'This food has already been saved!'
                        : 'Save this Food!'}
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

export default SearchFood;
