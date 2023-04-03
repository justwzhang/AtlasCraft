const request = require('supertest');
const app = require('../index');
const User = require("../models/user-model");

describe("POST /api/register", () => {
    test("should register a new user", async () => {
        // test register route
        let response = await request(app)
            .post("/api/register")
            .send({
                firstName: "Hug",
                lastName: "Miela",
                email: "hugmiela@test.com",
                password: "hugpassword",
                passwordVerify: "hugpassword",
                username: "hugmiela"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

        // test login route
        response = await request(app)
            .post("/api/login")
            .send({
                username: "hugmiela",
                password: "hugpassword"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    }, 60000);
});