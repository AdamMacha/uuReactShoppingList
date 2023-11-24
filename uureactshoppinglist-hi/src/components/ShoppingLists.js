import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateShoppingList from './CreateShoppingList';
import DeleteShoppingList from './DeleteShoppingList';
import ConfirmationModal from './ConfirmationModal';
import data from '../data/data';
import "./css/ShoppingLists.css"

const ShoppingLists = () => {
  const [lists, setLists] = useState(data);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    listId: null,
    listTitle: '',
  });

  const handleCreateList = (title) => {
    const newList = { id: lists.length + 1, title };
    setLists([...lists, newList]);
  };

  const handleDeleteList = (listId, listTitle) => {
    setDeleteConfirmation({ isOpen: true, listId, listTitle });
  };

  const confirmDeleteList = () => {
    const { listId } = deleteConfirmation;
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    setDeleteConfirmation({ isOpen: false, listId: null, listTitle: '' });
  };

  const cancelDeleteList = () => {
    setDeleteConfirmation({ isOpen: false, listId: null, listTitle: '' });
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
        <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onCancel={cancelDeleteList}
        onConfirm={confirmDeleteList}
        message={`Opravdu chcete smazat tento nákupní seznam?`}
      />
      </div>
    </div>
    
  );
};

export default ShoppingLists;
