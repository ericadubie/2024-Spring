// const users = require('../models/users')
// const express = require('express');
// const app = express.Router();

// app
//     .get('/', (req, res) => {
//         const all = users.getAll();
//         res.send(all);
//     })
//     .get('/search', (req, res) => {

//         const search = req.query.q;
//         const result = users.search(search);
//         res.send(result);

//     })
//     .get('/:id', (req, res) => {
//         const id = req.params.id;
//         const user = users.get(id);
//         res.send(user);
//     })

// module.exports = app

const data = require('../data/users.json');



function getAll() {
    return data.items;
}

function get(id) {
    return data.items.find(item => item.id == id);
}

function search(q) {
    return data.items.filter(item => 
        new RegExp(q, 'i').test(item.firstName) ||
        new RegExp(q, 'i').test(item.lastName) ||
        new RegExp(q, 'i').test(item.email) );
}

module.exports = {
    getAll, get, search
}