/*describe("Login Functionality", () => {
  it("Login", () => {
    cy.visit("http://localhost:3000/");
    cy.get(":nth-child(1) > .MuiButtonBase-root").click();
    cy.get('[data-cy="email-input"]').type("postmaster@gmail.com");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="login-button"]').click();
  });
});*/
describe("Login Functionality", () => {
  it("Login", () => {
    cy.viewport(1440, 1000);
    cy.visit("http://localhost:3000/");
    //cy.wait(5000);
    cy.get(":nth-child(1) > .MuiButtonBase-root").click();
    //cy.wait(5000);
    cy.get("#\\:r1\\:").type("postmaster@gmail.com");
    cy.get("#\\:r3\\:").type("123");
    //clicking sign in button
    cy.get(":nth-child(5) > .MuiButtonBase-root").click();
    cy.wait(1000);
    //statistics
    cy.get(":nth-child(2) > :nth-child(1) > .bx").click();
    cy.wait(1000);
    //mailrecieved per month
    cy.get(":nth-child(1) > :nth-child(1) > .card > .card-body").click();
    //listemployee
    //cy.get(":nth-child(6) > :nth-child(1) > .bx").click();
    //cy.get("#headlessui-menu-item-:r87:").click();
  });
});
/*describe("Login Functionality", () => {
  it("Login", () => {
    cy.wait(2000);
    cy.visit("http://localhost:3000/");

    // Use a more stable selector, like a data attribute
    cy.get("[data-testid='login-button']").click();

    // Replace problematic selectors with more stable ones
    cy.get("[data-testid='email-input']").type("postmaster@gmail.com");
    cy.get("[data-testid='password-input']").type("123");

    cy.get("[data-testid='submit-button']").click();
  });
});*/
