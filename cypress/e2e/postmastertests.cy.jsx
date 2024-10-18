describe("Login Functionality", () => {
  it("Login", () => {
    cy.viewport(1440, 1000);
    //landing page
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    //click on admin login button
    cy.get(":nth-child(1) > .MuiButtonBase-root").click();
    cy.wait(1000);

    //entering email and password
    cy.get("#\\:r1\\:").type("postmaster@gmail.com");
    cy.get("#\\:r3\\:").type("123");
    //clicking sign in button
    cy.get(":nth-child(5) > .MuiButtonBase-root").click();
    cy.wait(1000);

    //statistics page
    cy.get(":nth-child(2) > :nth-child(1) > .bx").click();
    cy.wait(1000);

    //mailrecieved per month[1st button of statistics page]
    cy.get(":nth-child(1) > :nth-child(1) > .card > .card-body").click();
    cy.wait(1000);

    //listemployee
    cy.get(":nth-child(6) > :nth-child(1) > .bx").click();
    cy.wait(1000);

    //signout
    //cy.get("#headlessui-menu-item-:r87:").click();
  });
});
