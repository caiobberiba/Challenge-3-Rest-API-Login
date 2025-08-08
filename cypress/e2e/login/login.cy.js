describe("Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001");
    });

    it("should login with valid credentials and redirect to registered users page", () => {
        cy.fixture('credentials').then(credentials => {
            cy.get("label[for='username']").type(credentials.valid.username);
            cy.get("label[for='password']").type(credentials.valid.password);
        })

        cy.get("button[type='submit']").click();
        cy.wait(1000);
        cy.url().should("contain", "/users");
        cy.get('.header > h4').should("contain.text", "Registered Users");
    });

    it("should login with invalid username", () => {
        cy.fixture('credentials').then(credentials => {
            cy.get("label[for='username']").type(credentials.invalid_username.username);
            cy.get("label[for='password']").type(credentials.valid.password);
        })
        cy.get("button[type='submit']").click();
        cy.wait(1000);
        cy.url().should("contain", "http://localhost:3001");
        cy.get("#errorMessage").should("contain.text", "Invalid username or password.");
    });

    it("should login with invalid password", () => {
        cy.fixture('credentials').then(credentials => {
            cy.get("label[for='username']").type(credentials.valid.username);
            cy.get("label[for='password']").type(credentials.invalid_password.password);
        })

        cy.get("button[type='submit']").click();
        cy.wait(1000);
        cy.url().should("contain", "http://localhost:3001");
        cy.get("#errorMessage").should("contain.text", "Invalid username or password.");
    });
    
    // it("should login 3 times with invalid password", () => {
    //     for (i=0; i < 3; i++)
    //     {
    //         cy.fixture('credentials').then(credentials => {
    //             cy.get("label[for='username']").type(credentials.validButBlocked.username);
    //             cy.get("label[for='password']").type(credentials.invalid_password.password);
    //         })

    //         cy.get("button[type='submit']").click();
    //         cy.wait(1000);
    //         cy.url().should("contain", "http://localhost:3001");
            
    //     }
        
        // cy.get("#errorMessage").should("contain.text", "'Account blocked due to too many attempts.'");
    // });

    it("should login with invalid username and password", () => {
        cy.fixture('credentials').then(credentials => {
            cy.get("label[for='username']").type(credentials.invalid_username.username);
            cy.get("label[for='password']").type(credentials.invalid_password.password);
        })
        cy.get("button[type='submit']").click();
        cy.wait(1000);
        cy.url().should("contain", "http://localhost:3001");
        cy.get("#errorMessage").should("contain.text", "Invalid username or password.");
    });
});