describe('Blog app', () => {
  beforeEach( () => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress User',
      username: 'cypressuser',
      password: 'cypresspass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:5173')
  })

  it('login form is shown', () => {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('cypressuser')
      cy.get('#password').type('cypresspass')
      cy.contains('login').click()
      cy.contains('Cypress User logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('abcd')
      cy.get('#password').type('1234')
      cy.contains('login').click()
      cy.contains('wrong login credentials')
    })
  })
})