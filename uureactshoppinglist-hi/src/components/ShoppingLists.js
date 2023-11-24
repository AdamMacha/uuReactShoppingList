import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateShoppingList from './CreateShoppingList';
import DeleteShoppingList from './DeleteShoppingList';
import data from '../data/data';
import "./ShoppingLists.css"

const ShoppingLists = () => {
  const [lists, setLists] = useState(data);

  const handleCreateList = (title) => {
    const newList = { id: lists.length + 1, title };
    setLists([...lists, newList]);
  };

  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
  };

  return (
    <div>
      <h2>Seznam nákupů</h2>
        <div className="shoppinglists-container">
        <div>
          <div className='create-list'>
            <CreateShoppingList onCreate={handleCreateList} />           
          </div>

          {lists.map((list) => (
            <div key={list.id} className="shoppinglist">
              <div className='one-item'>
              <h3 className="shoppinglist-title">{list.title}</h3>
                <Link
                  to={`/shopping-lists/${list.id}?title=${encodeURIComponent(list.title)}`}
                  className="shoppinglist-detail-link"
                >
                  Detail
                </Link>
                <DeleteShoppingList onDelete={handleDeleteList} listId={list.id} />
              </div>

            </div>
          ))}
        </div>
      )}
      </div>
    </div>
    
  );
};

export default ShoppingLists;
