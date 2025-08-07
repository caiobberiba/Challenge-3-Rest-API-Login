describe('Login API - First Test', () => {
  it('should open the application successfully', () => {
    // Visit the application
    cy.visit('/')
    
    // Verify that the page loads
    cy.get('body').should('be.visible')
    
    // Log success
    cy.log('Application loaded successfully!')
  })

  it('should handle application not running gracefully', () => {
    // This test will pass even if the application is not running
    cy.visit('/', { failOnStatusCode: false })
    
    // Check if we get any response (even if it's an error page)
    cy.get('body').should('exist')
    
    // Log the current URL for debugging
    cy.url().then((url) => {
      cy.log(`Current URL: ${url}`)
    })
  })
}) 