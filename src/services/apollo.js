import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjc20nti7236v0114tc87v7la',
});

const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache });

export default client;
