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
                    username: 'shanks123',
                    password: '123456'
                });
                expect(response.status).to.be.equal(400)
                expect(response.body).to.have.property("error", "Invalid username or password.")
        })

        it("Must return 400 and password is incorrect", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks',
                    password: '1234567'
                });
                expect(response.status).to.be.equal(400)
                expect(response.body.error).to.be.equal( "Invalid username or password.")

        })

        it("Must return 400 and username is incorrect", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks123',
                    password: '123456'
                });
                expect(response.status).to.be.equal(400)
                expect(response.body.error).to.be.equal( "Invalid username or password.")

        });
    })
})