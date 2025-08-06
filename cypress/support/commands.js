// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy=email]').type(email)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=login-button]').click()
})

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=logout-button]').click()
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.wait(1000) // Wait for any animations or async operations
}) 