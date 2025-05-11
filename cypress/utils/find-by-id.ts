import Chainable = Cypress.Chainable


export function findById(id: string): Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-cy=${id}]`)
}
