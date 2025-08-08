Objective:
Create a REST API to perform login with username and password on a website.
The API must be created in JavaScript with Express.
The API must have the following functionalities:
- Create login and password;
- Get list of all logins;
- Perform successful login;
- Return an error if the username and password are invalid;
- Block the password after 3 invalid attempts;
- Allow password recovery.
- User can "RESET" the password blocked 

Context:
- This API will be used only for software testing studies and will not go to production.
- We will not use a database; the information must be stored in memory (e.g., variables or constants).
- Communication will be in JSON.

Rules:
- You must build all the necessary file structure;
- You must add all the required libraries to build the API.
- Create a README.md to provide information about the project.
- The endpoint used for creating a new username and password must ask for a unique id which must have exactly 11 numbers ( will be CPF )
- After creating a username and password it will be saved in a list.
- This list will be used to validate the username and password when the user login.
- For the password recovery the user must send the username and the unique id, then it will return the password 
- Expose a URL so we can access the Swagger documentation of this API.
- If the CPF has been already added, send and error explaining that the CPF MUST BE UNIQUE
- After failing login 3 times the user gets blocked until changing the password 
- The user must send Username, CPF and the new password. 
- The new Passwrod will be valid ONLY if the Username and CPF are valid in the user list
- The new password will update the old password in the list of users
- Create this new project here: F:\projetos

-------------------------------------- -------------------------------------------------
Web application

objetive
- Install and prepare the environment (files, folders, etc) so we can create automation tests for the application using cypress 
- run cypress ofr the first time 

Context
- We've just implemented the BFF consuming the API
- The automated tests for the API are already done
- We need to implement tests End-to-End using cypress

Rules
- Create a new folder named "cypress"
- Install the last version of cypress, npm and every other library needed to start e2e automated testing
- url to open the application: http://localhost:3001
- Create a new package.json inside the cypress folder 

---------------------------------------------------------------------------------------------------
Objetive
- Create page where i can see the list of users cretead

Context
- As it is now, we can't se what users have been already created

Rules
- After login the page with the list of users is displayed