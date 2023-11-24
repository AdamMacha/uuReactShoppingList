import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ShoppingLists from './components/ShoppingLists';
import ListDetailPage from './components/ListDetailPage';

const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ShoppingLists/>} />
        <Route path="/shopping-lists" element={<ShoppingLists/>} />
        <Route path="/shopping-lists/:id" element={<ListDetailPage/>} />
      </Routes>
    </Router>
  );
};

export default RoutesList;
