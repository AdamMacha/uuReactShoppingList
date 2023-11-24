// DeleteShoppingList.js
import React from 'react';

const DeleteShoppingList = ({ onDelete, listId }) => {
  const handleDeleteList = () => {
    onDelete(listId);
  };

  return (
    <div>
      <h3>Smazat nákupní seznam</h3>
      <button onClick={handleDeleteList}>Smazat</button>
    </div>
  );
};

export default DeleteShoppingList;
