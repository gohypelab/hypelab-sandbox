import React from 'react';
import { BannerComponent } from '../components/BannerComponent';

describe('<BannerComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BannerComponent />);
  });

  it('assigns the src link to the image asset', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.hypelab-staging.com/v1/requests',
      },
      {
        fixture: 'medium_rectangle.json',
      }
    ).as('matchedUrl');
    cy.mount(<BannerComponent />);
  });
});
