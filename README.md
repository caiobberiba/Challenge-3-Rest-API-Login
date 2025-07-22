# Login API (Study Exercise)

<details>
  <summary>Challenge 3 description</summary>
  
    Join your friends to use Cursor to build a simple login API with the following rules:  

    1 - successful login;  
    2 - invalid login;  
    3 - block password after 3 attempts;  
    4 - remember password.  
    
    Then, write automated tests for each of the 4 functionalities in JS using Mocha and Supertest to validate that the main scenario of each functionality works as it should. The delivery must be made in a GitHub repository.  
</details>

---

This API was created for study purposes and simulates a simple authentication system, without using a database (everything is in memory). It allows you to create users, log in, block after 3 invalid attempts, recover password via email, and reset the password of blocked users.

## Technologies Used
- Node.js
- Express
- Swagger (Documentation)

## How to run the project

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npx nodemon index.js
   ```
   or
   ```bash
   node index.js
   ```

The server will be available at: http://localhost:3000

## Swagger Documentation
Access the interactive documentation at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

### Create user
`POST /auth/register`
```json
{
  "username": "user",
  "password": "password",
  "email": "user@example.com"
}
```
- The email must be in a valid format.
- The email must be unique (cannot be duplicated).
- The username must be unique.

### Login
`POST /auth/login`
```json
{
  "username": "user",
  "password": "password"
}
```
- After 3 invalid attempts, the user will be blocked.

### List usernames
`GET /auth/usernames`
- Returns the list of all registered usernames.

### Recover password
`POST /auth/recover`
```json
{
  "username": "user",
  "email": "user@example.com"
}
```
- Returns the password if the data is correct.

### Reset password (blocked users)
`PATCH /auth/reset-password`
```json
{
  "username": "user",
  "email": "user@example.com",
  "newPassword": "newPassword123"
}
```
- Only blocked users can reset the password.
- Validates username and email before allowing the reset.
- After the reset, the user is automatically unblocked.

## Notes
- All data is stored only in memory (will be lost when the server restarts).
- Do not use this API in production.
- The email is validated as unique to avoid duplicates.
- Blocked users need to reset their password to access the system again. 

---

## Authors
- [Bruna Ferreira]()
- [Carlos Berenguer](https://github.com/CarlosBerenguer)
- [Márcio Corrêa](https://github.com/marciorc)