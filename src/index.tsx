import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Helmet } from 'react-helmet';
import App from 'App';
import { Provider } from 'react-redux';
import store from 'store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <App />
    <Helmet>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Helmet>
  </Provider>,
);
