import React, { useState } from "react";
import "./Items.css"

import { Button } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";


const DEMO_items = [
    
        {
            id: 0,
            name: "Jablka",
            pcs: "5",
        },
        {
            id: 1,
            name: "Hrušky",
            pcs: "3",
        }

]

const Items = (props) => {
    const [items, setItems] = useState(DEMO_items);
    const [title, setTitle] = useState(props.title)

    const [newItem, setNewItem] = useState({ name: "", pcs: "" });
    const [openedItem, setOpenedItem] = useState(null);
    const [editedItem, setEditedItem] = useState(null);
    const [resolvedItems, setResolvedItems] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

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

    const addItem = () => {
        const id = items.length;
        const updatedBooks = [...items, { id, ...newItem }];
        setItems(updatedBooks);
        setNewItem({ name: "", pcs: "" });
    };

    const deleteBook = (id) => {
        const updatedBooks = items.filter((book) => book.id !== id);
        setItems(updatedBooks);
        if (openedItem && openedItem.id === id) {
            setOpenedItem(null);
            setEditedItem(null);
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

    const saveEditedBook = () => {
        const updatedBooks = items.map((item) =>
            item.id === openedItem.id ? { ...item, ...editedItem } : item
        );
        setItems(updatedBooks);
        setOpenedItem({ ...openedItem, ...editedItem });
        setEditedItem(null);
    };

    const resolveItem = (id) => {
        const itemToResolve = items.find((item) => item.id === id);
        const updatedResolvedItems = [...resolvedItems, itemToResolve];
        setResolvedItems(updatedResolvedItems);
    
        // Odstranit vyřešenou položku ze seznamu
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    
        // Zavřít detaily, pokud byly otevřeny pro vyřešenou položku
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
    
        // Přidat zpět do seznamu items
        const updatedItems = [...items, itemToUnresolve];
        setItems(updatedItems);
      };

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
                                    onClick={() => deleteBook(oneItem.id)}
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
                            <button className="save-button" onClick={saveEditedBook}>Uložit</button>
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