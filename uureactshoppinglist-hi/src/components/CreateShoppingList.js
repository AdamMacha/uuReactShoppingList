
import React, { useState } from 'react';
import "./CreateShoppingList.css"

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
    <div className="create-shopping-list">
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
