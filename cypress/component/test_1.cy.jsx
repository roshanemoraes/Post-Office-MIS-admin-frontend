import AddEmployee from "../../src/containers/Postmaster/AddEmployee";
import PostmasterDashboard from "../../src/containers/Postmaster/Dashboard";
import ReceptionistDashboard from "../../src/containers/Receptionist/Dashboard";
import ManagerDashboard from "../../src/containers/DeliveryManager/Dashboard";
import Invoice from "../../src/components/Forms/Invoice/Invoice";
import NormalMailReceipt from "./../../src/components/Receipts/NormalMailReceipt";
import PersonalMail from "../../src/containers/Receptionist/PersonalMail";
import BulkMailHome from "../../src/containers/Receptionist/BulkMailMgmt/BulkMailHome";
import ReturnMailMgmt from "../../src/containers/DeliveryManager/ReturnMailMgmt";
import InArea from "./../../src/containers/DeliveryManager/MailSortMgmt/InArea";

describe("postmaster - AddEmployee", () => {
  it("form", () => {
    cy.viewport(1024, 800);
    cy.mount(<AddEmployee />);
  });
});
describe("postmaster - Dashboard", () => {
  it("dashboard", () => {
    cy.viewport(1440, 1000);

    cy.mount(<PostmasterDashboard />);
  });
});
describe("receptionist - Dashboard", () => {
  it("dashboard", () => {
    cy.viewport(1440, 1000);

    cy.mount(<ReceptionistDashboard />);
  });
});
describe("delivery-manager - Dashboard", () => {
  it("dashboard", () => {
    cy.viewport(1440, 1000);
    cy.mount(<ManagerDashboard />);
  });
});
describe("delivery-manager - Return Mail", () => {
  it("return-mail", () => {
    cy.viewport(1440, 1000);
    cy.mount(<ReturnMailMgmt />);
  });
});
describe("delivery-manager - Mail Sort", () => {
  it("mail-sorting", () => {
    cy.viewport(1440, 1000);
    cy.mount(<InArea />);
  });
});
describe("receptionist - Mail Registration", () => {
  it("mail-registration", () => {
    cy.viewport(1440, 1000);
    cy.mount(<PersonalMail />);
  });
});
describe("receptionist - BUlk Mail", () => {
  it("Bulk-mail", () => {
    cy.viewport(1440, 1000);
    cy.mount(<BulkMailHome />);
  });
});
describe("reports - Receipt", () => {
  it("receipt", () => {
    cy.viewport(1440, 1000);
    cy.mount(<NormalMailReceipt />);
  });
});
describe("reports - Invoice", () => {
  it("invoice", () => {
    cy.viewport(850, 1000);

    // Mock data for props
    const mockDiscount = 10;
    const mockCustomerInfo = {
      senderName: "John Doe",
      senderAddress: "123 Main St, Anytown, USA",
      mailCount: 5, // Ensure this property is defined
    };
    const mockInvoiceInfo = {
      invoiceNumber: "INV-12345",
    };

    // Mount the component with props
    cy.mount(
      <Invoice
        discount={mockDiscount}
        customerInfo={mockCustomerInfo}
        invoiceInfo={mockInvoiceInfo}
      />
    );
  });
});
