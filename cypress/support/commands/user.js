Cypress.Commands.add('registerUser', () => {
    cy.fixture('credentials').then(credentials => {
        cy.get("#createAccount").click();
        cy.get("label[for='username']").click().type(credentials.valid.username);
        cy.get("label[for='email']").click().type(credentials.valid.email);
        cy.get("label[for='password']").click().type(credentials.valid.password);
        cy.get("label[for='confirmPassword']").click().type(credentials.valid.password);
    })
    cy.get("#createAccount").click();
})

Cypress.Commands.add('recoverPasswordWithValidCredentials', () => {
    cy.fixture('credentials').then(credentials => {
        cy.get("#forgotPassword").click();
        cy.get("label[for='username']").type(credentials.valid.username);
        cy.get("label[for='email']").type(credentials.valid.email);
        cy.get("#recoverPassword").click();
    })
    cy.get("#recoverPassword").click();
})

Cypress.Commands.add('recoverPasswordWithInvalidUsername', () => {
    cy.fixture('credentials').then(credentials => {
        cy.get("#forgotPassword").click();
        cy.get("label[for='username']").type(credentials.invalid_username.username);
        cy.get("label[for='email']").type(credentials.valid.email);
        cy.get("#recoverPassword").click();
    })
    cy.get("#recoverPassword").click();
})

Cypress.Commands.add('recoverPasswordWithInvalidEmail', () => {
    cy.fixture('credentials').then(credentials => {
        cy.get("#forgotPassword").click();
        cy.get("label[for='username']").type(credentials.valid.username);
        cy.get("label[for='email']").type(credentials.invalid_email.email);
        cy.get("#recoverPassword").click();
    })
    cy.get("#recoverPassword").click();
})