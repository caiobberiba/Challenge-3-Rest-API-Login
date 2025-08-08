describe("User", () => {

    beforeEach(() => {
        cy.visit('/')
    });

    describe("Register", () => {
        it('should create a new user', () => {
            cy.registerUser();
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
        it('should give the error message "Password recovery failed. Please check your credentials."', () => {
            cy.recoverPasswordWithInvalidUsername();
            cy.get("#errorMessage").should("contain", "Invalid data.");
        });
        it('should give the error message "Please enter a valid email address."', () => {
            cy.recoverPasswordWithInvalidEmail();
            cy.get("#errorMessage").should("contain", "Invalid data.");
        });
    });
});