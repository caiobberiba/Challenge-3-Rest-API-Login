const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const app = require('../index');

describe("User", () => {
    describe("POST /auth/register", () => {
        it.skip("Must return 201 and user created successfully", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks',
                    password: '123456',
                    email: 'shanks@teste.com'                    
                });

            expect (response.status).to.be.equal(201);
            expect (response.body.message).to.be.equal("User created successfully.");
        })

        it("Must return 400 and user already exists", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks',
                    password: '123456',
                    email: 'shanks@teste.com'                    
                });

            expect (response.status).to.be.equal(400);
            expect (response.body.error).to.be.equal("User already exists.");
            //expect (response.body).to.have.property("error", "User already exists."); //it works too, just another way to do it
        })
    })
    

    describe("GET /auth/usernames", () => {
        it.only("Must return 200 and user found successfully", async () => {
            const response = await request(process.env.BASE_URL)
                .get('/auth/usernames')
                .set('Content-type', 'application/json')
            
            expect(response.status).to.be.equal(200);
            expect(response.body.usernames).to.be.an("array");
            expect(response.body.usernames).to.have.length.of.at.least(1);
        })
    })

    describe("DELETE /auth/delete/{username}", () => {
        it.skip("Must return 200 and user deleted successfully", async () => {
            const response = await request(process.env.BASE_URL)
                .delete('/auth/delete/shanks')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks',
                });

            expect(response.status).to.be.equal(200);
            expect(response.body.message).to.be.equal("User deleted successfully.");
        })
        it("Must return 400 and user not found", async () => {
            const response = await request(process.env.BASE_URL)
                .delete('/auth/delete/shanks123')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks123',
                });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.property("error", "User not found.");
        })
    })

    describe("GET /auth/recover", () => {
        it("Must return 200 and user recovered successfully", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/recover')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks',
                    email: 'shanks@teste.com'
                });

            expect(response.status).to.be.equal(200);
            expect(response.body.password).to.be.equal("123456");
        })

        it("Must return 400 and user not found", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/recover')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks123',
                    email: 'shanks123@teste.com'
                });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.property("error", "Invalid data.");
        })

        it("Must return 400 and email is incorrect", async () => {
            const response = await request(process.env.BASE_URL)
                .post('/auth/recover')
                .set('Content-type', 'application/json')
                .send({
                    username: 'shanks',
                    email: 'shanks123@teste.com'
                });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.property("error", "Invalid data.");
        })  
    })
})
