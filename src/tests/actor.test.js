const request = require("supertest")
const app = require("../app")
require("../models")

const URL_ACTORS = '/api/v1/actors'

let actorId

const actor = {
    firstName: "Gal",
    lastName: "Gadot",
    nationality: "Israel",
    image: "https://www.infobae.com/new-resizer/2m_Xwvn9FpHN5lwpg6LKj3Wk35M=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/2YEEAXJEWREOZO6IPDXFCK3NRM.jpg",
    birthday: "1990-01-01"
}

test("POST -> 'URL_ACTORS', should return code 201 and res.body.name === actor.name", async () => {
    const res = await request(app)
        .post(URL_ACTORS)
        .send(actor)
        
    actorId = res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName);
    expect(res.body.lastName).toBe(actor.lastName);
})

test("GET -> 'URL_ACTORS', should return code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_ACTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'URL_ACTORS/:id', should return code 200 and res.body.name === actor.name", async () => {
    const res = await request(app)
        .get(`${URL_ACTORS}/${actorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})

test("PUT -> 'URL_ACTORS/:id', should return status code 200 and res.body.name === actorUpdated.name", async () => {
    const actorUpdated = {
        firstName: "Gal",
        lastName: "Gadot",
        nationality: "Israel",
        image: "https://www.infobae.com/new-resizer/2m_Xwvn9FpHN5lwpg6LKj3Wk35M=/1200x900/filters:format(webp):quality(85)/ cloudfront-us-east-1.images.arcpublishing.com/infobae/2YEEAXJEWREOZO6IPDXFCK3NRM.jpg",
        birthday: "1990-01-01"
    };
    
    const res = await request(app)
        .put(`${URL_ACTORS}/${actorId}`)
        .send(actorUpdated);
        
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(actorUpdated.name)
});

test("DELETE -> 'URL_ACTORS/:id', should return code 204", async () => {
    const res = await request(app)
        .delete(`${URL_ACTORS}/${actorId}`)
    
    expect(res.status).toBe(204)
})