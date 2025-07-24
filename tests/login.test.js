const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const app = require('../index');

describe("Login", () => {
    describe("POST /auth/login", () => {
        it("Must return 200 and user logged in successfully", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks',
                    password: '123456'
                });

            expect(response.status).to.be.equal(200)
            expect(response.body.message).to.be.equal("Login successful.")
        })

        it("Must return 400 and user not found", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-type', 'application/json')
                .send({
                    username: 'marcio',
                    password: '123456'
                });

            expect(response.status).to.be.equal(400)
            expect(response.body).to.have.property("error", 'Invalid username or password.')
        })

        it("Must block user after 3 failed login attempts", async () => {
            const username = 'shanks';
            const wrongPassword = 'wrongpass';

            for (let i = 0; i < 3; i++) {
                await request(process.env.BASE_URL)
                    .post('/auth/login')
                    .set('Content-type', 'application/json')
                    .send({ username, password: wrongPassword });
            }

            const response = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-type', 'application/json')
                .send({ username, password: wrongPassword });

            expect(response.status).to.be.equal(403);
            expect(response.body).to.have.property("error", 'Account blocked due to too many attempts.');
        });
    })
})