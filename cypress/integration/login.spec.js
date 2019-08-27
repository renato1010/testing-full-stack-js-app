describe('The login successful process', () => {

  it('should display page tile', () => {
    cy.visit('/');

    // click the Sign In button
    cy.get('a[href="/auth/login"]').click();

    cy.url().should('contain', 'http://localhost:4001/auth/login');

    //fill the form

    cy.get('input[name="email"]').type('renatoperezc@gmail.com');
    cy.get('input[name="password"]').type('rp101010');
    cy.get('button.rounded-sm[type="submit"]').click();

    // check for landing page dom
    cy.get('.flex.items-center span.cursor-pointer strong').should(
      'contain',
      'CARDENAS FUENTES'
    );

    cy.get('.flex.items-center span.ml-8').should('contain', 'Logout');

    cy.get('nav.items-center a.text-gold').should('contain', 'FULLSTACK-JS');
  });
});
