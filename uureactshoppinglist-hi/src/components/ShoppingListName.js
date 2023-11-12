import React, { useState } from 'react'

import "./ShoppingListName.css"

function ShoppingListName() {
    const[name, setName] = useState("ShoppingList")

    function handleChange(e) {
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

  return (
    <div className='list-header'>
        <h2>{name}</h2>
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={handleChange}/>
            <button type='submit'>Změnit</button>
        </form>
    </div>
    
  )
}

export default ShoppingListName