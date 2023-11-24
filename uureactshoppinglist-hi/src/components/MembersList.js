import "./css/MembersList.css"

import { useState } from "react"
import React from 'react'

const DEMO_LIST = [
    {id: 1, title: "vlastník"},
]

function MembersList() {
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

  return (
    <div className="list">
        <h2 className="members-title">Členové</h2>
        <ul>
            {list.map((item) => (
                <li className="members-item">
                    <span>
                    {item.title}
                    </span>
                    <div style={{display: "flex", alignItems: "center", gap: "10px" }}>
                        <button 
                        className="delete-button"
                        onClick={() => deleteItem(item.id)}
                        >
                            Odebrat
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        <div className="input-container">
            <input 
            type="text" 
            className="item-input" 
            placeholder="Jméno uživatele"
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

export default MembersList