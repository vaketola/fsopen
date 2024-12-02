describe('Blog app', () => {
  beforeEach( () => {
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', () => {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
  })
})
