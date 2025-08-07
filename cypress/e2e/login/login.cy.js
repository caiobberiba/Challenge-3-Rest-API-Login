describe("Login", () => {
    it("should login with valid credentials", () => {
        cy.visit("http://localhost:3001");
        cy.get("label[for='username']").type("shanks");
        cy.get("label[for='password']").type("123456");
        cy.get("button[type='submit']").click();
    });
});