Cypress.Commands.add('registerUser', (isBlocked) => {
    cy.fixture('credentials').then(credentials => {
        cy.get("#createAccount").click();
        cy.get("label[for='username']").click().type(credentials.valid.username);
        cy.get("label[for='email']").click().type(credentials.valid.email);
        cy.get("label[for='password']").click().type(credentials.valid.password);
        cy.get("label[for='confirmPassword']").click().type(credentials.valid.password);
    })
    cy.get("#createAccount").click();
})

Cypress.Commands.add('registerUserToBeBlocked', () => {
    cy.fixture('credentials').then(credentials => {
        cy.get("#createAccount").click();
        cy.get("label[for='username']").click().type(credentials.validButBlocked.username);
        cy.get("label[for='email']").click().type(credentials.validButBlocked.email);
        cy.get("label[for='password']").click().type(credentials.validButBlocked.password);
        cy.get("label[for='confirmPassword']").click().type(credentials.validButBlocked.password);
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

    Cypress.Commands.add('validLogin', () => {
        cy.fixture('credentials').then(credentials => {
            cy.get("label[for='username']").type(credentials.valid.username);
            cy.get("label[for='password']").type(credentials.valid.password);
        })

        cy.get("button[type='submit']").click();
        cy.wait(1000);
        cy.url().should("contain", "/users");
        cy.get('.header > h4').should("contain.text", "Registered Users");

    })
})

