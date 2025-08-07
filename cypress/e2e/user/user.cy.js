describe("User", () => {
    it('should create a new user', () => {
        cy.visit("http://localhost:3001");
        cy.get("#createAccount").click();
        cy.get("label[for='username']").type("shanks");
        cy.get("label[for'email']").type("shanks@teste.com")
        cy.get("label[for='password']").type("123456");
        cy.get("label[for='confirmPassword']").type("123456");
        cy.get("#createAccount").click();
    });
});