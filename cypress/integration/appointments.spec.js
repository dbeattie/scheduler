describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday");
  });
 
  it("should book an interview", () => {
   cy.get("[alt=Add]")
    .first()
    .click();
 
   cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
   cy.get('[alt="Sylvia Palmer"]').click();
 
   cy.contains("Save").click();
 
   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
   cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
   
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
  
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
  
    cy.contains("Save").click();
  
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {   
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
    });

 });


// THREE CORE TESTS:
// "should book an interview"
// "should edit an interview"
// "should cancel an interview"

// FOR BOOKING
// 1. Visits the root of our web server
// 2. Clicks on the "Add" button in the second appointment
// 3. Enters their name
// 4. Chooses an interviewer
// 5. Clicks the save button
// 6. Sees the booked appointment

// FOR EDITING
// 1. Visits the root of our web server
// 2. Clicks the edit button for the existing appointment
// 3. Changes the name and interviewer
// 4. Clicks the save button
// 5. Sees the edit to the appointment

// FOR CANCELING
// 1. Visits the root of our web server
// 2. Clicks the delete button for the existing appointment
// 3. Clicks the confirm button
// 4. Sees that the appointment slot is empty