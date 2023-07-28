// better to log in via HTTP request and not via the form
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body));
    cy.visit('');
  });
});
