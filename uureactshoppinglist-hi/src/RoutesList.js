// Routes.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import ShoppingLists from './components/ShoppingLists';

const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/shopping-lists" element={<ShoppingLists/>} />
      </Routes>
    </Router>
  );
};

export default RoutesList;
