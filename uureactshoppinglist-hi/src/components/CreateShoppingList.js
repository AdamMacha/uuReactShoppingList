// CreateShoppingList.js
import React, { useState } from 'react';

const CreateShoppingList = ({ onCreate }) => {
  const [newListTitle, setNewListTitle] = useState('');

  const handleInputChange = (e) => {
    setNewListTitle(e.target.value);
  };

  const handleCreateList = () => {
    onCreate(newListTitle);
    setNewListTitle('');
  };

  return (
    <div>
      <h3>Vytvořit nový nákupní seznam</h3>
      <input
        type="text"
        placeholder="Název seznamu"
        value={newListTitle}
        onChange={handleInputChange}
      />
      <button onClick={handleCreateList}>Vytvořit</button>
    </div>
  );
};

export default CreateShoppingList;
