import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteFood } from '../utils/API';
import Auth from '../utils/auth';
import { removeFoodId } from '../utils/localStorage';

const SavedFood = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the food's mongo _id value as param and deletes the book from the database
  const handleDeleteFood = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteFood(foodId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove food's id from localStorage
      removeFoodId(foodId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved food!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.SavedFood.length
            ? `Viewing ${userData.savedFood.length} saved ${userData.savedFood.length === 1 ? 'food' : 'food'}:`
            : 'You have no saved food!'}
        </h2>
        <CardColumns>
          {userData.savedFood.map((food) => {
            return (
              <Card key={food.foodId} border='dark'>
                 {book.image ? <Card.Img src={food.image} alt={`The cover for ${food.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{food.name}</Card.Title>
                  <Card.Text>{food.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteFood(food.foodId)}>
                    Delete this Food!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedFood;
