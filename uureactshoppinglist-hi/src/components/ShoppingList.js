import "./ShoppingList.css"
import ShoppingListName from "./ShoppingListName"

import { useState } from "react"
import React from 'react'

const DEMO_LIST = [
    {id: 1, title: "Hrušky"},
    {id: 2, title: "Jablka"},
    {id: 3, title: "Pomeranče"}
]

function ShoppingList() {
    const [list, setList] = useState(DEMO_LIST);
    const [value, setValue] = useState("");

    function addItem() {
        setList([...list, {id: list.length + 1, title: value, isChecked: false}])
        setValue("")
    }

    function deleteItem(ids) {
        const sortedList = list.filter((item) => item.id !== ids)
        setList(sortedList)
    }

    function checkItem(ids) {
        setList(list.map((item) => {
            return item.id === ids ? {...item, isChecked: true} : item
            })
        )
    }

  return (
    <div className="list">
        <ShoppingListName/>

        <ul>
            {list.map((item) => (
                <li className="item">
                    <span
                        style={{textDecoration: item.isChecked ? "line-through" : "none"}}
                    >
                    {item.title}
                    </span>
                    <div style={{display: "flex", alignItems: "center", gap: "10px" }}>
                        <input 
                        type="checkbox" 
                        name="" 
                        id=""
                        onChange={() => checkItem(item.id)}
                        />
                        <button 
                        className="delete-button"
                        onClick={() => deleteItem(item.id)}
                        >
                            Smazat
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        <div className="input-container">
            <input 
            type="text" 
            className="item-input" 
            placeholder="Přidat položku"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            />
            <button className="add-button" onClick={() => addItem()}>
                Přidat
            </button>
        </div>
    </div>

  )
}

export default ShoppingList