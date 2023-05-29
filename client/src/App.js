import MePages from './pages/MePages';
import Login from './pages/LoginPg';
// import SearchResultsPage from './pages/SearchResultsPg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});
// where i need to look for the calorie count
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <nav>
            <ul>
              <li>
                <Link to="/me">My Page</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/me" element={<MePages />} />
            {/* <Route path="/searchresults/:searchTerm" element={<SearchResultsPage />} /> Add the route for SearchResultsPage */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;