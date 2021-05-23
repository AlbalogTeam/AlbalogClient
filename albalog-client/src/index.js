import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'styles/main.scss';
import App from './App';
import ParttimeHeader from 'components/partTime/header/ParttimeHeader';
import ParttimeAside from 'components/partTime/aside/ParttimeAside';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ParttimeHeader />
      <ParttimeAside />
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
