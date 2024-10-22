import { MemoryRouter } from "react-router-dom";
import Home from "../../src/containers/Customer/Home";
import CustomerLogin from "../../src/screens/Common/CustomerLogin";
import TestLogin from "../../src/screens/Common/TestLogin";
import NavBar from "../../src/containers/Customer/NavBar";
import Profile from "../../src/containers/Customer/Profile";
import UpdateProfile from "../../src/containers/Customer/UpdateProfile";

let allTestsPassed = true; // Track if all tests passed

describe("customer - Login, View Pending Mails, and Logout", () => {
  afterEach(function () {
    // Check if the current test failed
    if (this.currentTest.state === "failed") {
      allTestsPassed = false;
    }
  });

  after(() => {
    if (allTestsPassed) {
      cy.log("All tests passed successfully!").then(() => {
        console.log("All tests passed successfully!");
      });
    } else {
      cy.log("Testing failed for one or more test cases!").then(() => {
        console.error("Testing failed for one or more test cases!");
      });
    }
  });
  it("should display login form", () => {
    cy.viewport(1024, 800);

    cy.mount(
      <MemoryRouter>
        <TestLogin />
      </MemoryRouter>
    );
    //clicking customer login section
    cy.contains("Customer Portal").click();

    // Mount the login component wrapped in MemoryRouter
    // Wrap the login component in MemoryRouter to provide routing context
    cy.mount(
      <MemoryRouter>
        <CustomerLogin />
      </MemoryRouter>
    );
  });
  it("should login and navigate to home", () => {
    cy.viewport(1440, 1000);

    // Mock login credentials
    const mockEmail = "customer2@gmail.com";
    const mockPassword = "123";

    // Mount the login component wrapped in MemoryRouter
    cy.mount(
      <MemoryRouter>
        <CustomerLogin />
      </MemoryRouter>
    );

    cy.get("body").then(($body) => {
      if ($body.find('input[name="email"]').length === 0) {
        throw new Error("Email input not found");
      }
    });
    // Wait for the email input to appear before typing
    /*cy.get('input[name="email"]', { timeout: 150000 }) // wait up to 150 seconds
      .should("be.visible") // Ensure the email input is visible
      .type(mockEmail);*/ // Simulate typing the email
    cy.get('input[name="email"]', { timeout: 150000 }) // wait up to 150 seconds for the email input
      .should("be.visible") // Ensure the email input is visible
      .type(mockEmail) // Type the mock email
      .then(() => {
        cy.get(".flex > .MuiButtonBase-root", { timeout: 150000 }) // wait up to 150 seconds for the button
          .should("be.visible") // Ensure the button is visible
          .click(); // Click the button
      });

    // Wait for the password input to appear before typing
    cy.get('input[name="password"]')
      .should("be.visible") // Ensure the password input is visible
      .type(mockPassword); // Simulate typing the password

    // Simulate clicking the login button
    cy.get('button[type="submit"]').click();

    // After login, mount the home component wrapped in MemoryRouter
    cy.mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    cy.contains("OUR THEME", { timeout: 10000 })
      .should("exist")
      .and("be.visible");
  });
  it("should update the profile", () => {
    cy.viewport(1440, 1000);

    //cy.intercept('GET', '/api/customer/list/delivered/*').as('getDeliveredMails');
    // After login, simulate navigating to the Pending Mails page wrapped in MemoryRouter
    cy.mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    cy.mount(
      <MemoryRouter>
        <NavBar role="admin" />
      </MemoryRouter>
    );

    cy.get('img[alt=""]').click({ force: true });
    cy.contains("Profile").click();
    cy.mount(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    cy.contains("Update").should("be.visible");
    cy.mount(
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    );

    cy.get('input[name="fullName"]').clear().type("William Alson");

    cy.get('input[name="address"]')
      .clear()
      .type("12,Pallansena South, Kochchikade");

    cy.get('input[name="contact"]').clear().type("0764421872");

    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    //cy.get('input[name="fullName"]');//.should('have.value', '');
    //cy.get('input[name="address"]');//.should('have.value', '');

    cy.contains("Save");

    //cy.wait('@getDeliveredMails').then((interception) => {
    // Log the response data for debugging purposes
    ///console.log('API Response:', interception.response.body);
    //});

    // Assert that pending mail items are visible
    // cy.get('.pending-mail-item', { timeout: 10000 });//.should('have.length.greaterThan', 0); // Assuming the mail items have this class
  });
  it("should log out", () => {
    cy.viewport(1440, 1000);

    // Mount the profile menu for logout wrapped in MemoryRouter
    cy.mount(
      <MemoryRouter>
        <NavBar role="admin" />
      </MemoryRouter>
    );

    cy.get('img[alt=""]').click({ force: true });

    // Simulate clicking the sign-out button
    cy.contains("Signout").click();

    // After logging out, assert the user is returned to the login page wrapped in MemoryRouter
    cy.mount(
      <MemoryRouter>
        <CustomerLogin />
      </MemoryRouter>
    );
    cy.contains("POST OFFICE MIS").should("be.visible");
  });
});
