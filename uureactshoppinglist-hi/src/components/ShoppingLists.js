// ShoppingLists.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateShoppingList from './CreateShoppingList';
import DeleteShoppingList from './DeleteShoppingList';
import ListDetail from './ListDetail';

const ShoppingLists = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  const handleCreateList = (title) => {
    const newList = { id: lists.length + 1, title };
    setLists([...lists, newList]);
  };

  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    setSelectedList(null);
  };

  const handleSelectList = (listId) => {
    const selected = lists.find((list) => list.id === listId);
    setSelectedList(selected);
  };

  const handleGoBack = () => {
    setSelectedList(null);
  };

  return (
    <div>
      <h2>Seznam nákupů</h2>
      {selectedList ? (
        <ListDetail listTitle={selectedList.title} onBack={handleGoBack} />
      ) : (
        <div>
          <CreateShoppingList onCreate={handleCreateList} />
          {lists.map((list) => (
            <div key={list.id}>
              <h3>{list.title}</h3>
              <Link to={`/shopping-lists/${list.id}?title=${encodeURIComponent(list.title)}`}>
                Detail
              </Link>
              <DeleteShoppingList onDelete={handleDeleteList} listId={list.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingLists;
