const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

router.get('/hello', (req, res) => res.send('abc'));

// GET /items returns array of items
router.get('/', (req, res) => res.json(items));

// POST /items adds item to shopping list (accepts JSON => app.use(express.json())) and responds with msg:
// {added: {name: food price: 6.66}}
router.post('/', (req, res) => {
    items.push(req.body);
    return res.json({added: req.body});
})

// GET /items/:name returns C
router.get('/:name', (req, res) => {
    const item = items.filter(i => i.name === req.params.name);
    return res.json(item[0]);
})

// PATCH /items/:name takes in JSON and returns 
// {updated: {“name”: “popsicle”, “price”: 1.45}}
router.patch('/:name', (req, res) => {
    const item = items.filter(i => i.name === req.params.name);
    item[0].name = req.body.name;
    item[0].price = req.body.price;
    return res.json({updated: item[0]});
})

// DELETE /items/:name returns {message: deleted}
router.delete('/:name', (req, res) => {
    const idx = items.indexOf(items.find((item) => item.name === req.params.name));
    items.splice(idx, 1);
    return res.json({message: "Deleted"});
})

module.exports = router;