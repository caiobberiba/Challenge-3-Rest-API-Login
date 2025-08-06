# Objective:
Build a complete web application to consume the Login API using Express.js (for serving static files only), and MaterializeCSS (for styling). This interface need to responsive and friendly

# Context:
Create an interface that will use the API that we developed before.

# Rules:
- All the requests to API need to be did by a BFF  
- Create a page to Register that use the endpoint '/register'  
- Create a page to Login that use the endpoint '/login'  
- Create a page to Recover the Password that use the endpoint '/recover'  
- Create a page to Reset the Password that use the endpoint '/reset-password'  
- Don't create any page to the endpoints: '/delete/:username' and get '/usernames'  
- Home page with login form (username, password) and submit button;  
- Show success and error messages according to API response;
- After 3 failed attempts, show a "user blocked" message according to API response;  
- "Forgot password" form that calls the password recovery endpoint;  
- Page or modal for blocked users to reset their password;
- Use MaterializeCSS for a modern, responsive look;  
- Keep the front-end app separate from the API (only consume API via fetch/AJAX);  
- Express.js should serve only static front-end files (do not create REST routes in Express);  
- Use the BFF server to start the application  
- Do not write automated tests now.  