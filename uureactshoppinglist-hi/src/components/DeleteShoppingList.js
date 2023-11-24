import React from 'react';
import "./DeleteShoppingList.css"

const DeleteShoppingList = ({ onDelete, listId }) => {
  const handleDeleteList = () => {
    onDelete(listId);
  };

  return (
    <div className="delete-shopping-list">
      <button onClick={handleDeleteList}>Smazat</button>
    </div>
  );
};

export default DeleteShoppingList;
