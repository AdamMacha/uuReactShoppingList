import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateShoppingList from './CreateShoppingList';
import DeleteShoppingList from './DeleteShoppingList';
import ConfirmationModal from './ConfirmationModal';
import LoadingSpinner from './LoadingSpinner';
import "./css/ShoppingLists.css"

const ShoppingLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    listId: null,
    listTitle: '',
  });

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/shopping-lists');
      setLists(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
      setError(error.message);
      setLoading(false)
    }
  };

  const handleCreateList = async (title) => {
    try {
      const response = await axios.post('http://localhost:3001/api/shopping-lists', { title });
      setLists([...lists, response.data]);
    } catch (error) {
      console.error('Error creating shopping list:', error);
    }
  };

  const handleDeleteList = (listId, listTitle) => {
    setDeleteConfirmation({ isOpen: true, listId, listTitle });
  };

  const confirmDeleteList = async () => {
    try {
      const { listId } = deleteConfirmation;
      await axios.delete(`http://localhost:3001/api/shopping-lists/${listId}`);
      const updatedLists = lists.filter((list) => list.id !== listId);
      setLoading(true)
      setLists(updatedLists);
      setDeleteConfirmation({ isOpen: false, listId: null, listTitle: '' });
      fetchShoppingLists()
    } catch (error) {
      console.error('Error deleting shopping list:', error);
    }
  };

  const cancelDeleteList = () => {
    setDeleteConfirmation({ isOpen: false, listId: null, listTitle: '' });
  };

  if (loading) {
    return(
      <LoadingSpinner/>
    )
  }

  if (error) {
    return(
      <div>
        <h2>Seznam nákupů</h2>
        <div className="error-message">Nastala chyba při načítání dat: {error}</div>
      </div>
    )
  }

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