describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'testuser',
      username: 'testuser',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('password');
      cy.get('#login-button').click();

      cy.contains('Login successful for user "testuser"');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.contains('invalid username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      cy.contains('create Blog').click();

      cy.get('#title').type('Erebos');
      cy.get('#author').type('Ursula Poznanski');
      cy.get('#url').type('www.ere.bos');

      cy.get('#create-blog-button').click();

      cy.contains('A new blog Erebos by Ursula Poznanski added');
      cy.contains('Ursula Poznanski');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('create Blog').click();

        cy.get('#title').type('Erebos');
        cy.get('#author').type('Ursula Poznanski');
        cy.get('#url').type('www.ere.bos');

        cy.get('#create-blog-button').click();
      });

      it('it can be liked by the user', function () {
        cy.get('#view-button').click();
        cy.get('#like-button').click();
        cy.contains('likes 1');
      });
    });
  });
});
