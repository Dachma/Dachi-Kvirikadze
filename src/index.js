import React from "react";
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";

import App from './components/App';

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});


ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.querySelector('#root')
);