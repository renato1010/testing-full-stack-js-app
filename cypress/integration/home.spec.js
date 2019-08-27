describe('The home page', () => {
  it('should display page tile', () => {
    cy.visit('/');
    cy.get('.text-xl').should('contain', 'FULLSTACK-JS MERN STARTER');
  });

  it('should have sign in and join now buttons', () => {
    cy.visit('/');

    cy.get('a[href="/auth/login"]').should('contain', 'Sign In');

    cy.get('a[href="/auth/register"]').should('contain', 'Join Now');
  });

  it('should route to sign-in form when click', () => {
    cy.visit('/');

    cy.get('a[href="/auth/login"]').click();
    cy.url().should('contain', 'auth/login');
  });

  it('should route to register form when click[Join now btn]', () => {
    cy.visit('/');

    cy.get('a[href="/auth/register"]').click();
    cy.url().should('contain', 'auth/register');
  });
});
