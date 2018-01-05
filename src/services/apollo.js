import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjc20nti7236v0114tc87v7la',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjc20nti7236v0114tc87v7la',
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache });

export default client;
