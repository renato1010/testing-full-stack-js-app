describe('The login successful process mocking server', () => {
  it('should login a user, flash a message, and redirect to home', () => {
    cy.server();

    // use fixture
    cy.fixture('user').as('user');

    cy.route('POST', '/api/v1/auth/login', '@user');

    // to to login page
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('doctor@strange.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button.rounded-sm[type="submit"]').click();

    // check for landing page dom
    cy.get('.flex.items-center span.cursor-pointer strong').should(
      'contain',
      'doctor'
    );

    cy.get('.flex.items-center span.ml-8').should('contain', 'Logout');

    cy.get('nav.items-center a.text-gold').should('contain', 'FULLSTACK-JS');
  });
});
