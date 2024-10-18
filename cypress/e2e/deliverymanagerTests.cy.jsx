describe("Delivery manager functionalities", () => {
  it("Login", () => {
    cy.viewport(1440, 1000);
    //landing page
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    //click on admin login button
    cy.get(":nth-child(1) > .MuiButtonBase-root").click();
    cy.wait(1000);

    //entering email and password
    cy.get("#\\:r1\\:").type("deliverymanager1@gmail.com");
    cy.get("#\\:r3\\:").type("123");
    //clicking sign in button
    cy.get(":nth-child(5) > .MuiButtonBase-root").click();
    cy.wait(1000);

    //all mails to sort
    cy.get(":nth-child(2) > .sub-menu > :nth-child(2) > a").click();
    cy.wait(1000);

    //in area mail sort
    cy.get(":nth-child(2) > .sub-menu > :nth-child(3) > a").click();
    cy.wait(1000);

    //out area mails to sort
    cy.get(":nth-child(2) > .sub-menu > :nth-child(4) > a").click();
    cy.wait(1000);

    //live map
    cy.get(
      '[href="/admin/delivery-manager/route-allocation"] > .link_name'
    ).click();
    cy.wait(1000);

    //undelivered mails
    cy.get(":nth-child(4) > .sub-menu > :nth-child(2) > a").click();
    cy.wait(1000);
  });
});
