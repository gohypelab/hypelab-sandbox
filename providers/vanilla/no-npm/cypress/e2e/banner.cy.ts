describe('Banner', () => {
  beforeEach(() => {
    cy.interceptAdRequest('medium_rectangle.json');
    cy.interceptFragmentRequest('medium_rectangle.json', 'banner.hype');
  });

  it('renders a clickable banner image', () => {
    cy.visit('../../banner.html');
    cy.viewport(300, 250);
    cy.wait('@matchedRequest');

    cy.fixture('medium_rectangle').then((formatResponse) => {
      console.log(formatResponse);
      cy.get('img').invoke('attr', 'src').should('eq', formatResponse.data.creative_set.image);
      cy.get('a').invoke('attr', 'href').should('eq', formatResponse.data.cta_url);
    });
  });

  it('fires the impression ping', () => {
    cy.intercept('POST', 'https://api.hypelab-staging.com/v1/events', (req) => {
      expect(req.body).to.deep.include({
        campaign_slug: '7b2dac4cfe',
        creative_set_slug: 'df73049914',
        placement_slug: '38331eab13',
        property_slug: '3eb413c650',
        type: 'impression',
        wids: ['0x123'],
      });

      expect(req.body.uuid).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      req.reply({ status: 'success' });
    }).as('impressionUrl');

    cy.viewport(300, 250);
    cy.visit('../../banner.html');
    cy.wait('@matchedRequest');
    cy.wait('@impressionUrl');
  });

  it('should auto-refresh after 30 seconds', () => {
    cy.clock();
    cy.visit('../../banner.html');
    cy.viewport(300, 250);
    cy.wait('@matchedRequest');
    cy.wait(100);

    cy.fixture('medium_rectangle').then((formatResponse) => {
      cy.tick(1);
      cy.get('img').invoke('attr', 'src').should('eq', formatResponse.data.creative_set.image);
      cy.get('a').invoke('attr', 'href').should('eq', formatResponse.data.cta_url);
    });

    cy.interceptAdRequest('medium_rectangle_2.json');
    cy.tick(30000);
    cy.clock().invoke('restore');
    cy.wait('@matchedRequest', { timeout: 30000 });

    cy.fixture('medium_rectangle_2').then((formatResponse) => {
      cy.get('img').invoke('attr', 'src').should('eq', formatResponse.data.creative_set.image);
      cy.get('a').invoke('attr', 'href').should('eq', formatResponse.data.cta_url);
    });
  });
});
