import React from 'react';
import './App.css';

import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

import {Artists} from './containers';

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: '/graphql',
  fetch,
});

const client = new ApolloClient({
  cache,
  link,
});

function App() {
  return (
    <ApolloProvider  client={client}>
      <Artists />
    </ApolloProvider>
  );
}

export default App;
