describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const user = {
      name: 'testuser',
      username: 'testuser',
      password: 'password',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);

    const secondUser = {
      name: 'testuser2',
      username: 'testuser2',
      password: 'password',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser);

    cy.visit('');
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
      cy.login({ username: 'testuser', password: 'password' });
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

      it('it can be deleted by the user who created it', function () {
        cy.get('#view-button').click();
        cy.get('#delete-button').click();
        cy.get('Ursula Poznanski').should('not.exist');
      });
    });

    describe('and a blog by a different user exists', function () {
      beforeEach(function () {
        cy.contains('create Blog').click();

        cy.get('#title').type('Erebos');
        cy.get('#author').type('Ursula Poznanski');
        cy.get('#url').type('www.ere.bos');

        cy.get('#create-blog-button').click();

        cy.get('#logout-button').click();

        cy.login({ username: 'testuser2', password: 'password' });
      });

      it('it can only be deleted by the creator', function () {
        cy.get('#view-button').click();
        cy.get('#delete-button').should('not.exist');
      });
    });
  });
});
