import React from 'react';
import { NativeComponent } from './NativeComponent';

describe('<NativeComponent />', () => {
  it('renders a clickable native ad', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.hypelab-staging.com/v1/requests',
      },
      {
        fixture: 'native.json',
      }
    ).as('matchedUrl');

    cy.mount(<NativeComponent />);
    cy.get('[data-cy="ctaUrl"]').should(
      'have.href',
      'http://web.hypelab.com/click?campaign_slug=b33847379f&creative_set_slug=4cde3a5f3c&placement_slug=4cd3f56dc9'
    );
    cy.get('[data-cy="displayUrl"]').should('have.text', 'ledger.com');
    cy.get('[data-cy="advertiser"]').should('have.text', 'Ledger');
    cy.get('[data-cy="ctaText"]').should('have.text', 'Shop Now');
  });
});
