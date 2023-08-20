const request = require("supertest")
const app = require("../app")
require("../models")

const URL_MOVIES = '/api/v1/movies'

let movieId

const movie = {
    name: "Wonder Woman",
    imgage: "https://i.blogs.es/fc7807/wonder-woman0/450_1000.jpg",
    synopsis: "Diana, daughter of the gods and princess of the Amazons, has never left her island. One day, in the context of World War I, an American pilot crashes on her island and Diana saves her life; the pilot explains that a great war is taking place that could devastate the world, and Diana goes to battle.",
    releaseYear: "2017"
    
}

test("POST -> 'URL_MOVIES', should return code 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(URL_MOVIES)
        .send(movie)
        
    movieId = res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name);

})

test("GET -> 'URL_MOVIES', should return code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_MOVIES)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'URL_MOVIES/:id', should return code 200 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${URL_MOVIES}/${movieId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("PUT -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movieUpdated.name", async () => {
    const movieUpdated = {
        name: "Wonder Woman",
        imgage: "https://i.blogs.es/fc7807/wonder-woman0/450_1000.jpg",
        synopsis: "Diana, daughter of the gods and princess of the Amazons, has never left her island. One day, in the context  of World War I, an American pilot crashes on her island and Diana saves her life; the pilot explains that a great war is taking place that could devastate the world, and Diana goes to battle.",
        releaseYear: "2017"
    };
    
    const res = await request(app)
        .put(`${URL_MOVIES}/${movieId}`)
        .send(movieUpdated);
        
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movieUpdated.name)
});

test("DELETE -> 'URL_MOVIES/:id', should return code 204", async () => {
    const res = await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)
    
    expect(res.status).toBe(204)
})