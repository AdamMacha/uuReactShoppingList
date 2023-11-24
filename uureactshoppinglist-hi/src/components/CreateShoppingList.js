
import React, { useState } from 'react';
import "./CreateShoppingList.css"

const CreateShoppingList = ({ onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const handleInputChange = (e) => {
    setNewListTitle(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewListTitle('');
  };

  const handleCreateList = () => {
    onCreate(newListTitle);
    handleCloseModal();
  };

  return (
    <div className="create-shopping-list">
      <button onClick={handleOpenModal}>Vytvořit nový nákupní seznam</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>Zadejte název nového seznamu:</h3>
            <input
              type="text"
              placeholder="Název seznamu"
              value={newListTitle}
              onChange={handleInputChange}
            />
            <button onClick={handleCreateList}>Vytvořit</button>
            <p>*Položky nákupního seznamu je možné přidat na detailu nákupního seznamu</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateShoppingList;
