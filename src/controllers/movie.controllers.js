const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');

const getAll = catchError(async (req, res) => {
    const results = await Movie.findAll({
        include: [Genre,Director,Actor]
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, {
        include: [Genre,Director,Actor]
    });
    if (!result) return res.sendStatus(400);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: { id } });
    if (!result) return res.sendStatus(400);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(400);
    return res.json(result[1][0]);
});

const setActors = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.sendStatus(400)
    await movie.setActors(req.body)
    const actor = await movie.getActors()
    return res.json(actor)
})

const setGenres = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.sendStatus(400)

    await movie.setGenres(req.body)
    const genres = await movie.getGenres()

    return res.json(genres)

})

const setDirectors = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.sendStatus(400)

    await movie.setDirectors(req.body)
    const directors = await movie.getDirectors()

    return res.json(directors)

})



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActors,
    setGenres,
    setDirectors
}