const { getAll, create, getOne, remove, update, setGenres } = require('../controllers/director.controllers');
const express = require('express');

const routerDirector = express.Router();

routerDirector.route('/')
    .get(getAll)
    .post(create);

routerDirector.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerDirector.route('/:id/genres')
    .post(setGenres)

module.exports = routerDirector; 