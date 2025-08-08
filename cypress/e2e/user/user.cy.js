describe("User", () => {

    beforeEach(() => {
        cy.visit('/')
    });

    describe("Register", () => {
        it('should create a new user', () => {
            cy.registerUser();
            cy.get("#successMessage").should("contain", "Account created successfully! You can now sign in.");
        });
        it('should create a new user to be blocked', () => {
            cy.registerUserToBeBlocked();
            cy.get("#successMessage").should("contain", "Account created successfully! You can now sign in.");
        });
        it('should give the error message "User already exists."', () => {
            cy.registerUser();
            cy.get("#errorMessage").should("contain", "User already exists.");
        });
    });

    describe("Recover Password", () => {
        it('should recover the password', () => {
            cy.recoverPasswordWithValidCredentials();
            cy.get("#successMessage").should("contain", "Password recovered successfully!");
        });
        it('should give the error message "Invalid data." when username is invalid', () => {
            cy.recoverPasswordWithInvalidUsername();
            cy.get("#errorMessage").should("contain", "Invalid data.");
        });
        it('should give the error message "Invalid data." when email is invalid', () => {
            cy.recoverPasswordWithInvalidEmail();
            cy.get("#errorMessage").should("contain", "Invalid data.");
        });
    });


    describe("User list", () => {
        it("should display the user list", () => {
            cy.validLogin();
            cy.get(".header > h4").should("contain.text", "Registered Users");
            cy.get("#usersContainer").should("exist");
            cy.get('.preloader-wrapper', { timeout: 5000 }).should('not.be.visible');

            cy.fixture('credentials').then(credentials => {
                const userList = cy.get("#usersContainer > .user-card");
                userList.each((user) => {
                    if (cy.wrap(user).find("span")?.value == credentials.valid.username)
                        cy.wrap(user).should("have.text", credentials.valid.username);
                });
            })
        });
    });
});