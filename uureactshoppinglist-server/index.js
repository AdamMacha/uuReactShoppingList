const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const PORT = 3001;

app.use(bodyParser.json());

let shoppingLists = [
    {
      id: 1,
      title: 'Tesco seznam',
      items: [
        { id: 1, name: 'Paprika', pcs: "5" },
        { id: 2, name: 'Chléb', pcs: "2" },
      ],
    },
    {
      id: 2,
      title: 'Lidl seznam',
      items: [
        { id: 3, name: 'Mléko', pcs: "3" },
        { id: 4, name: 'Cibule', pcs: "2" },
      ],
    },    {
        id: 3,
        title: 'Albert seznam',
        items: [
          { id: 5, name: 'Paprika', pcs: "2" },
          { id: 6, name: 'Chléb', pcs: "1" },
        ],
      },
      {
        id: 4,
        title: 'Billa seznam',
        items: [
          { id: 7, name: 'Mléko', pcs: "7" },
          { id: 8, name: 'Cibule', pcs: "5" },
        ],
      },
  ];

app.get('/api/shopping-lists', (req, res) => {
  res.json(shoppingLists);
});

app.get('/api/shopping-lists/:id', (req, res) => {
    const listId = parseInt(req.params.id);
    const list = shoppingLists.find((list) => list.id === listId);
  
    if (list) {
      res.json(list);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
});

app.get('/api/shopping-lists/:id/items', (req, res) => {
    const listId = parseInt(req.params.id);
    const list = shoppingLists.find((list) => list.id === listId);

    if (list) {
        res.json(list.items);
    } else {
        res.status(404).json({ error: 'List not found' });
    }
});

app.post('/api/shopping-lists', (req, res) => {
  const newList = { id: shoppingLists.length + 1, title: req.body.title, items: [] };
  shoppingLists.push(newList);
  res.json(newList);
});

app.post('/api/shopping-lists/:id/items', (req, res) => {
    const listId = parseInt(req.params.id);
    const list = shoppingLists.find((list) => list.id === listId);
  
    if (list) {
      const newItem = { id: Date.now(), name: req.body.name };
      list.items.push(newItem);
      res.json(newItem);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
});

app.delete('/api/shopping-lists/:id', (req, res) => {
  const listId = parseInt(req.params.id);
  shoppingLists = shoppingLists.filter((list) => list.id !== listId);
  res.sendStatus(204);
});

app.delete('/api/shopping-lists/:listId/items/:itemId', (req, res) => {
    const listId = parseInt(req.params.listId);
    const itemId = parseInt(req.params.itemId);
    const list = shoppingLists.find((list) => list.id === listId);
  
    if (list) {
      const index = list.items.findIndex((item) => item.id === itemId);
  
      if (index !== -1) {
        const deletedItem = list.items.splice(index, 1)[0];
        res.json(deletedItem);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } else {
      res.status(404).json({ error: 'List not found' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});