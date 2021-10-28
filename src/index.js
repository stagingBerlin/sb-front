import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/main.scss'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>,
  document.getElementById('root')
);

