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
    cy.visit("http://localhost:3000/");
    cy.wait(5000);
    cy.get(":nth-child(1) > .MuiButtonBase-root").click();
    cy.wait(5000);
    cy.get("#\\:r1\\:").type("postmaster@gmail.com");
    cy.get("#\\:r3\\:").type("123");
    cy.get(":nth-child(5) > .MuiButtonBase-root").click();
  });
});
