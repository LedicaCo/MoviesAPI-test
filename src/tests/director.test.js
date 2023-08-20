const request = require("supertest")
const app = require("../app")
require("../models")

const URL_DIRECTORS = '/api/v1/directors'

let directorId

const director = {
    firstName: "Patty",
    lastName: "Jenkins",
    nationality: "USA",
    image: "https://static.wikia.nocookie.net/dcextendeduniverse/images/7/70/Patty_Jenkins.png/revision/latest?cb=20201227204846&path-prefix=es",
    birthday: "1971-07-24"
}

test("POST -> 'URL_DIRECTORS', should return code 201 and res.body.name === director.name", async () => {
    const res = await request(app)
        .post(URL_DIRECTORS)
        .send(director)
        
    directorId = res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName);
    expect(res.body.lastName).toBe(director.lastName);
})

test("GET -> 'URL_DIRECTORS', should return code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_DIRECTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'URL_DIRECTORS/:id', should return code 200 and res.body.name === director.name", async () => {
    const res = await request(app)
        .get(`${URL_DIRECTORS}/${directorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
})

test("PUT -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.name === directorUpdated.name", async () => {
    const directorUpdated = {
        firstName: "Patty",
        lastName: "Jenkins",
        nationality: "USA",
        image: "https://static.wikia.nocookie.net/dcextendeduniverse/images/7/70/Patty_Jenkins.png/revision/latest? cb=20201227204846&path-prefix=es",
        birthday: "1971-07-24"
    };
    
    const res = await request(app)
        .put(`${URL_DIRECTORS}/${directorId}`)
        .send(directorUpdated);
        
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(directorUpdated.name)
});

test("DELETE -> 'URL_DIRECTORS/:id', should return code 204", async () => {
    const res = await request(app)
        .delete(`${URL_DIRECTORS}/${directorId}`)
    
    expect(res.status).toBe(204)
})