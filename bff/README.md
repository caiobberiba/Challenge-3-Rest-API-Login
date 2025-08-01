# Login BFF (Backend For Frontend)

This is the BFF server that acts as a proxy between the frontend and the Login API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Configuration

The server uses the following environment variables (with defaults):

- `BFF_PORT`: Port for the BFF server (default: 3001)
- `API_BASE_URL`: URL of the Login API (default: http://localhost:3000/auth)

## Endpoints

The BFF server provides the following endpoints that proxy to the Login API:

- `POST /bff/register` - User registration
- `POST /bff/login` - User login
- `POST /bff/recover` - Password recovery
- `POST /bff/reset-password` - Password reset

## Static Files

The server serves static files from the `../public` directory, including:

- `/` - Home page (login form)
- `/register` - Registration page
- `/recover` - Password recovery page
- `/reset-password` - Password reset page

## Usage

1. Make sure your Login API is running on port 3000
2. Start this BFF server on port 3001
3. Access the frontend at http://localhost:3001 