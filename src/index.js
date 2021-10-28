import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/main.scss'
import { BrowserRouter as Router} from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <App />
    </Router>
    <ToastContainer/>
  </UserContextProvider>,
  document.getElementById('root')
);

