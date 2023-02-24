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

    cy.viewport(500, 520);
    cy.mount(<NativeComponent />);

    cy.get('[data-cy="advertiser"]').should('have.text', 'Ledger');
    cy.get('[data-cy="headline"]').should('have.text', 'Store your crypto safely');
    cy.get('[data-cy="body"]').should(
      'have.text',
      'The smartest way to securely store your crypto. Ledger hardware wallets bring peace of mind to over 4 million users.'
    );
    cy.get('[data-cy="displayUrl"]').should('have.text', 'ledger.com');
    cy.get('[data-cy="ctaUrl"]')
      .invoke('attr', 'href')
      .should(
        'eq',
        'http://web.hypelab.com/click?campaign_slug=b33847379f&creative_set_slug=4cde3a5f3c&placement_slug=4cd3f56dc9'
      );
    cy.get('[data-cy="ctaText"]').should('have.text', 'Shop now');
    cy.get('[data-cy="video"]').should(
      'have.attr',
      'src',
      'https://di30gnjrtlisb.cloudfront.net/up/asset/a61703075a/199389cb82.mp4?tr=w-600'
    );
    cy.get('[data-cy="icon"]').should(
      'have.attr',
      'src',
      'https://di30gnjrtlisb.cloudfront.net/up/asset/cd7f4397e5/b83188c4f0.png?tr=w-100'
    );
  });
});
