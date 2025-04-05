import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Home from './pages/Home';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
