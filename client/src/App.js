import CalorieCounter from './pages/MePages';
import MePages from './pages/MePages';
import Login from './pages/LoginPg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Signup from './pages/Signup';
import Login from './pages/Login';
const httpLink = createHttpLink({
  uri: '/graphql',

});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them ADDS TOKEN TO HEADERS FOR TEAM SNIPPERS 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` For Front-END-DEV TEAM MEMBERS PROJECT SNIPPER THIS IS FOR ACCEPTING THE JWT
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route 
              path="/" 
              element={<Login />}
            />
            <Route 
              path="/me" 
              element={<MePages />}
            />
             <Route
              path="/" 
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
  
            {/* <Route 
              path="/matchup" 
              element={<Matchup />}
            />
            {/* <Route 
              path="/matchup/:id" 
              element={<Vote />}
            />
            <Route 
              path="*"
              element={<NotFound />}
            /> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
