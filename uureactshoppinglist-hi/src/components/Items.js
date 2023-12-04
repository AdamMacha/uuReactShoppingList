import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Items.css"

import { useParams } from "react-router-dom";

import { Button } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import LoadingSpinner from "./LoadingSpinner";


const Items = (props) => {
    const { id } = useParams();
    const [listId, setListId] = useState(id)
    const [items, setItems] = useState(props.items);
    const [title, setTitle] = useState(props.title)
    const [newItem, setNewItem] = useState({ name: "", pcs: "" });
    const [openedItem, setOpenedItem] = useState(null);
    const [editedItem, setEditedItem] = useState(null);
    const [resolvedItems, setResolvedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchItems();
      }, [title]); 
    
      const fetchItems = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/shopping-lists/${listId}/items`);
          setItems(response.data);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching items:', error);
          setItems([]);
          setError(error.message)
          setLoading(false)
        }
      };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
      };
    
      const saveTitle = () => {
        setTitle(newTitle);
        closeModal();
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const addItem = async () => {
        try {
          await axios.post(`http://localhost:3001/api/shopping-lists/${props.id}/items`, {
            name: newItem.name,
          });
          setNewItem({ name: "", pcs: "" });
          setLoading(true)
          fetchItems();
        } catch (error) {
          console.error("Error adding item:", error);
          setError(error.message)
          setLoading(false)
        }
      };

    const deleteItem = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/api/shopping-lists/${props.id}/items/${id}`);
          setLoading(true)
          fetchItems(); 
        } catch (error) {
          console.error("Error deleting item:", error);
          setError(error.message)
          setLoading(false)
        }
      };

    const openItem = (id) => {
        const item = items.find((b) => b.id === id);
        setOpenedItem(item);
        setEditedItem(null);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const saveEditedItem = () => {
        const updatedItems = items.map((item) =>
            item.id === openedItem.id ? { ...item, ...editedItem } : item
        );
        setItems(updatedItems);
        setOpenedItem({ ...openedItem, ...editedItem });
        setEditedItem(null);
    };

    const resolveItem = (id) => {
        const itemToResolve = items.find((item) => item.id === id);
        const updatedResolvedItems = [...resolvedItems, itemToResolve];
        setResolvedItems(updatedResolvedItems);
    
        
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    
        
        if (openedItem && openedItem.id === id) {
          setOpenedItem(null);
          setEditedItem(null);
        }
      };
    
      const unresolveItem = (id) => {
        const itemToUnresolve = resolvedItems.find((item) => item.id === id);
        const updatedResolvedItems = resolvedItems.filter(
          (item) => item.id !== id
        );
        setResolvedItems(updatedResolvedItems);
    
        
        const updatedItems = [...items, itemToUnresolve];
        setItems(updatedItems);
      };

    if (loading) {
        return(
            <LoadingSpinner/>
        )
    }  

    if (error) {
        return (
            <div>
                <h2>Nebylo možné načíst data</h2>
            </div>
        )
    }

    return (
        <>
            <div className="shopping-lists">
                    <p>
                    <h3 className="title">
                        {title}{" "}
                        <Button className="button-edit btn-icon" onClick={openModal} style={{ backgroundColor: "transparent", border: "none", padding: 0 }}>
                        <BiPencil style={{ color: "grey", fontSize: "1.5em", marginLeft: "5px" }}/>
                        </Button>
                    </h3>
                        {items.map((oneItem) => (
                            <div key={oneItem.id}>
                                <div className="one-item">
                                    <h5 className="item-name">{oneItem.name} {oneItem.pcs}ks</h5>
                                    <div>
                                    <button
                                        className="button-resolve"
                                        onClick={() => resolveItem(oneItem.id)}
                                    >
                                        Zakoupeno
                                    </button>
                                <button
                                    className="button-detail"
                                    onClick={() => openItem(oneItem.id)}
                                >
                                    Detail
                                </button>
                                <button
                                    className="button-delete"
                                    onClick={() => deleteItem(oneItem.id)}
                                >
                                    Smazat
                                </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </p>
                    <h3>Již zakoupené položky</h3>
            {resolvedItems.map((resolvedItem) => (
                <div key={resolvedItem.id}>
                    <div className="one-item">
                        <h5 className="item-name">
                            {resolvedItem.name} {resolvedItem.pcs}ks (Zakoupeno)
                        </h5>
                        <div>
                            <button
                                className="button-unresolve"
                                onClick={() => unresolveItem(resolvedItem.id)}
                            >
                                Vrátit zpět
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>

            <div className="add-item">
                <h3>Přidat položku:</h3>
                <div className="grid">
                    <div>
                        <label>Název položky</label><br/>
                        <input
                            type="text"
                            name="name"
                            value={newItem.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Počet</label><br/>
                        <input
                            type="text"
                            name="pcs"
                            value={newItem.pcs}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button className="button-add" onClick={addItem}>Přidat Položku</button>
            </div>

            {openedItem ? (
                <div className="container">
                    {editedItem ? (
                        <div>
                            <h3>Editovat položku:</h3>
                            <div className="grid">
                                <div>
                                    <label>Název položky</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedItem.name}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Počet kusů</label>
                                    <input
                                        type="text"
                                        name="pcs"
                                        value={editedItem.pcs}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                            </div>
                            <button className="save-button" onClick={saveEditedItem}>Uložit</button>
                        </div>
                    ) : (
                        <div>
                            <h3>Detaily Položky:</h3>
                            <p>
                                Název: {openedItem.name}
                                <br />
                                Počet kusů: {openedItem.pcs}
                            </p>
                            <button className="button-edit" onClick={() => setEditedItem({ ...openedItem })}>
                                Editovat
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="container">
                    <p></p>
                </div>
            )}
                  {isModalOpen && (
                 <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                        &times;
                        </span>
                        <h3>Změnit název</h3>
                        <input
                        type="text"
                        value={newTitle}
                        onChange={handleTitleChange}
                        />
                        <button className="save-button" onClick={saveTitle}>Uložit</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Items;