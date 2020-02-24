import fetch from 'node-fetch';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: 'http://localhost:2999/',
	fetch
});

const client = new ApolloClient({
	cache,
	link,
});

const OnTheGoApp = ({ Component, pageProps }) => (
	<ApolloProvider client={client}>
		<Component {...pageProps} />
	</ApolloProvider>
);

export default OnTheGoApp;
