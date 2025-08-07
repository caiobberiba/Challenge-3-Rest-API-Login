describe("User", () => {
    describe("Register", () => {
        it('should create a new user', () => {
            cy.visit("http://localhost:3001");
            cy.get("#createAccount").click();
            cy.get("label[for='username']").type("shanks");
            cy.get("label[for'email']").type("shanks@teste.com")
            cy.get("label[for='password']").type("123456");
            cy.get("label[for='confirmPassword']").type("123456");
            cy.get("#createAccount").click();
            cy.get("#successMessage").should("contain", "Account created successfully! You can now sign in.");
        });
        it('should give the error message "User already exists."', () => {
            cy.visit("http://localhost:3001");
            cy.get("#createAccount").click();
            cy.get("label[for='username']").type("shanks");
            cy.get("label[for'email']").type("shanks@teste.com")
            cy.get("label[for='password']").type("123456");
            cy.get("label[for='confirmPassword']").type("123456");
            cy.get("#createAccount").click();
            cy.get("#errorMessage").should("contain", "User already exists.");
        });
    });

    describe("Recover Password", () => {
        it('should recover the password', () => {
            cy.visit("http://localhost:3001");
            cy.get("#forgotPassword").click();
            cy.get("label[for='username']").type("shanks");
            cy.get("label[for'email']").type("shanks@teste.com")
            cy.get("#recoverPassword").click();
            cy.get("#successMessage").should("contain", "Password recovered successfully!");
        });
        it('should give the error message "User already exists."', () => {
            cy.visit("http://localhost:3001");
            cy.get("#forgotPassword").click();
            cy.get("label[for='username']").type("shanks123");
            cy.get("label[for'email']").type("shanks123@teste.com")
            cy.get("#recoverPassword").click();
            cy.get("#errorMessage").should("contain", "Password recovery failed. Please check your credentials.");
        });
    });
});