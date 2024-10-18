describe("Receptionist tasks", () => {
  it("Login", () => {
    cy.viewport(1640, 1000);
    //landing page
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    //click on admin login button
    cy.get(":nth-child(1) > .MuiButtonBase-root").click();
    cy.wait(1000);

    //entering email and password
    cy.get("#\\:r1\\:").type("receptionist1@gmail.com");
    cy.get("#\\:r3\\:").type("123");
    //clicking sign in button
    cy.get(":nth-child(5) > .MuiButtonBase-root").click();
    cy.wait(1000);
    //bulk mail
    cy.get(":nth-child(3) > :nth-child(1) > .link_name").click();
    cy.wait(1000);
    //money orders
    cy.get(":nth-child(4) > :nth-child(1) > .link_name").click();
    cy.wait(1000);

    //customer info
    cy.get(":nth-child(5) > :nth-child(1) > .link_name").click();
    cy.wait(1000);
    //searching customer by id
    cy.get(".border").type("2");
    cy.get(".bg-red-900").click();

    //sign out
    //cy.get("#headlessui-menu-item-:r6h:").click();
    //cy.get("#headlessui-menu-item-\\:r6h:").click();
  });
});
