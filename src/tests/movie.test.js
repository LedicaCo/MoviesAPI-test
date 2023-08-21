const request = require("supertest")
const app = require("../app")
const Genre = require("../models/Genre")
const Actor = require("../models/Actor")
const Director = require("../models/Director")

require("../models")

const URL_MOVIES = '/api/v1/movies'

let movieId
let genre
let actor
let director

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

test("POST 'URL_MOVIES/:id/genres', should return status code 200 and res.body.length === 1 ", async () => {
    const body = {
        name: 'Action'
    }
    genre = await Genre.create(body)
    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/genres`)
        .send([genre.id])
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test("POST 'URL_MOVIES/:id/actors', should return status code 200 and res.body.length === 1 ", async () => {
    const body = {
        firstName: "Gal",
        lastName: "Gadot",
        nationality: "Israel",
        image: "https://www.infobae.com/new-resizer/2m_Xwvn9FpHN5lwpg6LKj3Wk35M=/1200x900/filters:format(webp):quality(85)/ cloudfront-us-east-1.images.arcpublishing.com/infobae/2YEEAXJEWREOZO6IPDXFCK3NRM.jpg",
        birthday: "1990-01-01"
    }
    actor = await Actor.create(body)
    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/actors`)
        .send([actor.id])
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test("POST 'URL_MOVIES/:id/directors', should return status code 200 and res.body.length === 1 ", async () => {
    const body = {
        firstName: "Patty",
        lastName: "Jenkins",
        nationality: "USA",
        image: "https://static.wikia.nocookie.net/dcextendeduniverse/images/7/70/Patty_Jenkins.png/revision/latest? cb=20201227204846&path-prefix=es",
        birthday: "1971-07-24"
    }
    director = await Director.create(body)
    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/directors`)
        .send([director.id])
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test("DELETE -> 'URL_MOVIES/:id', should return code 204", async () => {
    const res = await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)
    
    expect(res.status).toBe(204)
    
    await genre.destroy()
    await actor.destroy()
    await director.destroy()
})