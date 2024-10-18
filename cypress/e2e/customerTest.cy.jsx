describe("customer tasks", () => {
  it("Login customer", () => {
    cy.viewport(1440, 1000);
    //landing page
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    //click on customer login button
    cy.get(":nth-child(2) > .MuiButtonBase-root").click();
    cy.wait(1000);

    //entering email and password
    cy.get("#email").type("customer2@gmail.com");
    cy.get("#password").type("123");
    //clicking sign in button
    cy.get(".flex > .MuiButtonBase-root").click();
    cy.wait(1000);
  });
});
