process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let item = { name: "Pickles", price: 1.25 };

beforeEach(function() {
  items.push(item);
});

afterEach(function() {
  items.length = 0;
});

describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual(items);
    });
});

describe("POST /items", () => {
    test("Posts item and returns msg with new item data", async() => {
        const newItem = { name: "Star Trek Toy", price: 5.05};
        const resp = await request(app).post(`/items`).send(newItem);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({added: newItem});
    })
})

describe("PATCH /items/:name", () => {
    test("Selects item and updates one or both of properties", async() => {
        const itemUpdates = { name: 'New Pickles', price: 7500};
        const resp = await request(app).patch(`/items/${item.name}`).send(itemUpdates);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated: itemUpdates});
    })
})

describe("DELETE /items/:name", () => {
    test("Deletes item from DB and returns delete message", async() => {
        const resp = await request(app).delete(`/items/${item.name}`);
        expect(resp.body).toEqual({message: "Deleted"});
    })
})