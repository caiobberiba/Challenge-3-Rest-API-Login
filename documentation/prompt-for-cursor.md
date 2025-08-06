# PROMPT TO RECREATE LOGIN API WITH CURSOR

Create a complete login API in Node.js/Express with the following specifications:

## PROJECT STRUCTURE
- Create a Node.js project with Express
- Use Swagger for automatic documentation
- Structure: index.js (main server) + routes/auth.js (authentication routes)

## REQUIRED DEPENDENCIES
```json
{
  "express": "^4.18.2",
  "swagger-ui-express": "^5.0.0",
  "swagger-jsdoc": "^6.2.8"
}
```

## MANDATORY FUNCTIONALITIES

### 1. AUTHENTICATION ENDPOINTS
- POST /auth/register - Create user (username, password, cpf)
- POST /auth/login - Login (username, password)
- POST /auth/recover - Recover password (username, cpf)
- GET /auth/usernames - List all usernames
- PATCH /auth/reset-password - Reset password for blocked users

### 2. SPECIFIC VALIDATIONS
- CPF must have exactly 11 numbers
- CPF must be UNIQUE (cannot be duplicated)
- Username must be UNIQUE
- All required fields must be validated

### 3. BLOCKING SYSTEM
- After 3 invalid login attempts, block user
- Blocked users can only login after resetting password
- Password reset only works for blocked users

### 4. STORAGE
- Use in-memory arrays for users[] and loginAttempts{}
- Do not use database (study purposes only)

## SWAGGER CONFIGURATION
- Configure Swagger in index.js
- Document ALL endpoints with @swagger
- Include request/response schemas
- Configure to read files in ./routes/*.js

## DATA STRUCTURE
```javascript
// In routes/auth.js
const users = []; // Users array
const loginAttempts = {}; // Login attempts control
```

## FUNCTIONALITY FLOW

### REGISTRATION
1. Validate required data
2. Validate CPF format (11 numbers)
3. Check if username already exists
4. Check if CPF already exists
5. Add user to array

### LOGIN
1. Find user by username
2. Check if blocked
3. Validate password
4. Count invalid attempts
5. Block after 3 attempts

### PASSWORD RECOVERY
1. Validate username and CPF
2. Return password if data is correct

### USERNAME LISTING
1. Return array with all usernames

### PASSWORD RESET
1. Validate username, CPF and new password
2. Check if user exists
3. Check if blocked
4. Update password
5. Unblock user

## SERVER CONFIGURATION
- Port 3000
- express.json() middleware
- Routes in /auth
- Documentation in /api-docs

## FILES TO CREATE
1. package.json (with dependencies)
2. index.js (server + Swagger)
3. routes/auth.js (all endpoints)
4. README.md (complete documentation)

## TEST EXAMPLES
```json
// Registration
POST /auth/register
{
  "username": "user",
  "password": "password123",
  "cpf": "12345678901"
}

// Login
POST /auth/login
{
  "username": "user",
  "password": "password123"
}

// Password reset (after blocking)
PATCH /auth/reset-password
{
  "username": "user",
  "cpf": "12345678901",
  "newPassword": "newPassword123"
}
```

## IMPORTANT POINTS
- Use PATCH (not POST) for password reset
- Document everything in Swagger
- Validate unique CPF
- Implement blocking system
- Create complete README
- Use clear error messages in Portuguese

## IMPLEMENTATION ORDER
1. Configure project and dependencies
2. Create basic structure (index.js + routes/auth.js)
3. Implement registration with validations
4. Implement login with blocking system
5. Implement password recovery
6. Implement username listing
7. Implement password reset
8. Configure Swagger
9. Create README
10. Test all endpoints

Create this API following exactly these specifications and keep the code clean and well documented. 