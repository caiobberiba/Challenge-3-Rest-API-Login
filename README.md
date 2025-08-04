# Login API (Study Exercise)
This project is part of Challenge 3 of Júlio de Lima’s Software Testing Mentorship 2.0.

<details> <summary>Description</summary>

    Join your friends to use Cursor to build a simple login API with the following rules:  

    1 - Successful login;  
    2 - Invalid login;  
    3 - Block password after 3 attempts;  
    4 - Remember password.  

    Then, write automated tests for each of the 4 functionalities in JS using Mocha and Supertest to validate that the main scenario of each functionality works as it should. The delivery must be made in a GitHub repository.  
</details>

---

This API was created for study purposes and simulates a simple authentication system, without using a database (everything is in memory). It allows you to create users, log in, block after 3 invalid attempts, recover password via email, and reset the password of blocked users.

## Technologies Used
- Node.js
- Express
- Mocha & Supertest (Automated Testing)
- Swagger (Documentation)

## How to Run the Project

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
Access the interactive documentation at: http://localhost:3000/api-docs

## Endpoints

### Create user
`POST /auth/register`

#### Request:
```json
{
  "username": "user",
  "password": "password",
  "email": "user@example.com"
}
```
- The email must be in a valid format and unique (cannot be duplicated).
- The username must be unique.

#### Success Response:
```json
{
  "message": "User created successfully"
}
```

#### Error:
```json
{
  "error": "E-mail or username already exists"
}
```

### Login
`POST /auth/login`

#### Request:
```json
{
  "username": "user",
  "password": "password"
}
```
- After 3 invalid attempts, the user will be blocked.

#### Success Response:
```json
{
  "message": "Login successful"
}
```

#### Error (invalid credentials):
```json
{
  "error": "Invalid username or password"
}
```

#### Error (user blocked):
```json
{
  "error": "User is blocked due to too many invalid attempts"
}
```

### List usernames
`GET /auth/usernames`
```json
{
  "usernames": ["user", "admin", "guest"]
}
```
- Returns the list of all registered usernames.

### Recover password
`POST /auth/recover`

#### Request:
```json
{
  "username": "user",
  "email": "user@example.com"
}
```
- Returns the password if the data is correct.

#### Success Response:
```json
{
  "message": "Password sent to email"
}
```

#### Error:
```json
{
  "error": "Invalid username or email"
}
```

### Reset password (blocked users)
`PATCH /auth/reset-password`

#### Request:
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

#### Success Response:
```json
{
  "message": "Password reset successfully, user unblocked"
}
```

#### Error:
```json
{
  "error": "Invalid username, email or user is not blocked"
}
```

## Automated Testing
This project includes automated tests written with Mocha and Supertest.

### How to run the tests:
   ```bash
   npm test
   ```

### Main scenarios covered:
1. Successful login
2. Invalid login
3. Account blocked after 3 invalid attempts
4. Password recovery and reset flows

## Notes
- All data is stored only in memory (will be lost when the server restarts).
- Do not use this API in production.
- Do not store any real or sensitive user data.
- The email is validated as unique to avoid duplicates.
- Blocked users need to reset their password to access the system again. 

## Authors
- [Bruna Ferreira](https://github.com/BrunaFerSilva)
- [Caio Bêribá](https://github.com/caiobberiba)
- [Carlos Berenguer](https://github.com/CarlosBerenguer)
- [Márcio Corrêa](https://github.com/marciorc)
