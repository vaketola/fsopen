describe('Blog app', () => {
  beforeEach( () => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress User',
      username: 'cypressuser',
      password: 'cypresspass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Cypress 2User',
      username: 'cypress2user',
      password: 'cypresspass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('cypressuser')
      cy.get('#password').type('cypresspass')
      cy.contains('login').click()
    })

    it('a blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#title').type('Cypress Test Title')
      cy.get('#author').type('Author Test')
      cy.get('#url').type('https://docs.cypress.io/')
      cy.get('#createButton').click()
      cy.contains('a new blog Cypress Test Title by Author Test was created')
      cy.contains('Cypress Test Title Author Test')
    })
  })

  describe('When a blog exists', function() {
    beforeEach(function() {
      cy.get('#username').type('cypressuser')
      cy.get('#password').type('cypresspass')
      cy.contains('login').click()
      cy.contains('create new').click()
      cy.get('#title').type('Cypress Test Title')
      cy.get('#author').type('Author Test')
      cy.get('#url').type('https://docs.cypress.io/')
      cy.get('#createButton').click()
    })

    it('a blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('the delete button can be seen', function() {
      cy.contains('logout').click()
      cy.get('#username').type('cypressuser')
      cy.get('#password').type('cypresspass')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.contains('remove')
    })

    it('the delete button is not seen by another user', function() {
      cy.contains('logout').click()
      cy.get('#username').type('cypress2user')
      cy.get('#password').type('cypresspass')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('the original user can still delete the blog', function() {
      cy.contains('logout').click()
      cy.get('#username').type('cypressuser')
      cy.get('#password').type('cypresspass')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('Cypress Test Title').should('not.exist')
    })
  })

  describe('When multiple blogs exist', function() {
    beforeEach(function() {
      cy.get('#username').type('cypressuser')
      cy.get('#password').type('cypresspass')
      cy.contains('login').click()

      cy.contains('create new').click()
      cy.get('#title').type('Cypress Test Title 1')
      cy.get('#author').type('Author Test 1')
      cy.get('#url').type('https://docs.cypress.io/')
      cy.get('#createButton').click()

      cy.contains('create new').click()
      cy.get('#title').type('Cypress Test Title 2')
      cy.get('#author').type('Author Test 2')
      cy.get('#url').type('https://docs.cypress.io/')
      cy.get('#createButton').click()

      cy.contains('create new').click()
      cy.get('#title').type('Cypress Test Title 3')
      cy.get('#author').type('Author Test 3')
      cy.get('#url').type('https://docs.cypress.io/')
      cy.get('#createButton').click()
    })

    it('blogs will be sorted by likes', function() {
      cy.get('.blog').eq(1).find('button').contains('view').click()
      cy.get('.blog').eq(1).find('button').contains('like').click()
      cy.contains('likes 1')
      cy.get('.blog').eq(1).find('button').contains('like').click()
      cy.contains('likes 2')
      cy.get('.blog').eq(1).find('button').contains('hide').click()

      cy.get('.blog').eq(2).find('button').contains('view').click()
      cy.get('.blog').eq(2).find('button').contains('like').click()
      cy.contains('likes 1')
      cy.get('.blog').eq(2).find('button').contains('hide').click()

      cy.reload()

      cy.get('.blog').eq(0).should('contain', 'Cypress Test Title 2')
      cy.get('.blog').eq(1).should('contain', 'Cypress Test Title 3')
      cy.get('.blog').eq(2).should('contain', 'Cypress Test Title 1')
    })
  })
})
