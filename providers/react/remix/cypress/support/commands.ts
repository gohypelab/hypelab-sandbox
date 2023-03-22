/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('interceptWithFile', (routeMatcher: RouteMatcher, filePath: string) => {
  return cy.readFile(filePath).then((contents) => {
    return cy.intercept(routeMatcher, {
      body: contents,
    });
  });
});

// Intercepts the ad request with the specified format response
Cypress.Commands.add('interceptAdRequest', (formatFixture: string) => {
  cy.interceptWithFile(
    {
      method: 'POST',
      url: 'https://api.hypelab-staging.com/v1/requests',
    },
    `cypress/fixtures/${formatFixture}`
  ).as('matchedRequest');
});

// Looks up the CDN URL returned in the format response and intercepts it with the specified fragment file
Cypress.Commands.add('interceptFragmentRequest', (formatFixture: string, fragmentFile: string) => {
  cy.fixture(formatFixture).then((formatResponse) => {
    cy.interceptWithFile(
      {
        method: 'GET',
        url: formatResponse.data.fragment.url,
      },
      `cypress/fixtures/fragments/${fragmentFile}`
    ).as('matchedFragment');
  });
});
