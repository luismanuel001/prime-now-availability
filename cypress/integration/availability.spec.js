/// <reference types="cypress" />

// var telegram = require('telegram-bot-api');
// var api = new telegram({
//   token: Cypress.env('TELEGRAM_BOT_TOKEN')
// });

context('PrimeNow Availability', () => {
  beforeEach(() => {
    cy.visit('https://primenow.amazon.es');
    cy.get('#lsPostalCode').type('28050');
    cy.get('.a-button-input').click();
    cy.visit('https://primenow.amazon.es/signin?returnUrl=https%3A%2F%2Fprimenow.amazon.es%2Fhome');
    cy.get('#ap_email').type(Cypress.env('AMAZON_EMAIL'), { log: false });
    cy.get('#ap_password').type(Cypress.env('AMAZON_PASSWORD'), { log: false });
    cy.get('#signInSubmit').click();
  })

  it('check availability', () => {
    const noDeliveryAvailableMessage = '!Actualmente no hay ventanas de entrega disponibles para hoy ni mañana. Nuevas franjas de entrega se abren a lo largo de todo el día.';
    cy.visit('https://primenow.amazon.es/cart?ref_=pn_gw_nav_cart');
    cy.get('.cart-checkout-box').contains('a', 'Tramitar el pedido').click();
    cy.get('#delivery-slot-form > .a-section')
      .then(result => {
        if (!result.text().includes(noDeliveryAvailableMessage)) {
          cy.screenshot('availability', { clip: { x: 0, y: 0, width: 1000, height: 800 } });
        }
      })
  })
})
