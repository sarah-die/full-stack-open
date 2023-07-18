// mocha (which is used under hood) recommends not to use arrow functions

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('front page can be opened', function () {
    // searches for string on the page
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    );
  });

  it('user can log in', function () {
    cy.contains('log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen' + '');
    cy.get('#login-button').click();
    cy.contains('Matti Luukkainen logged in');
  });

  // test new note functionality
  describe('when logged in', function () {
    beforeEach(function () {
      // cy.contains('log in').click();
      // cy.get('#username').type('mluukkai');
      // cy.get('#password').type('salainen');
      // cy.get('#login-button').click();

      // using commands when code repeats
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });
    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      // save new note
      beforeEach(function () {
        // using custom command
        cy.createNote({ content: 'another note cypress', important: true });
      });

      it('it can be made not important', function () {
        // searching for note and "make not important" within this note
        cy.contains('another note cypress')
          .parent()
          .find('button')
          .as('theButton');
        cy.get('@theButton').click();

        // text changed after clicking button
        cy.get('@theButton').should('contain', 'make not important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        // // when chained the second contains-command continues to search from within the component found by the first command
        // cy.contains('second note').contains('make important').click();
        //
        // // this would be an entirely different result
        // // cy.contains('second note')
        // // cy.contains('make important').click()
        //
        // cy.contains('second note').contains('make not important');

        // when note is surrounded by a span
        // use parent-command to access the parent element containing second note and find the button within in
        // imp! cy.get searches whole page
        // use find-command instead
        // cy.contains('seconscontain', 'make not important');

        // to not repeat code
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });

  // when adding new test write it.only(...)
  // only this test is run, if test succeeds remove "only"
  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    // cy.contains('wrong credentials');
    // search for error-class then check that error message can be found from this component
    cy.get('.error').contains('wrong credentials');
    // alternative
    // cy.get('.error').should('contain', 'wrong credentials');

    cy.get('.error').should('contain', 'wrong credentials');
    // colors have to be given in rgb
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('.error').should('have.css', 'border-style', 'solid');

    // chain these tests:
    // cy.get('.error')
    //   .should('contain', 'wrong credentials')
    //   .and('have.css', 'color', 'rgb(255, 0, 0)')
    //   .and('have.css', 'border-style', 'solid');

    // get("html") = visible content of entire app
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
    // alternative
    // cy.contains('Matti Luukkainen logged in').should('not.exist')
  });

  it('then example', function () {
    cy.get('button').then((buttons) => {
      // print to console
      console.log('number of buttons', buttons.length);
      cy.wrap(buttons[0]).click();
    });
  });
});
