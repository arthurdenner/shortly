import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './services/apollo';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './AppRouter';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
