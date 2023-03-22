describe('Banner', () => {
  beforeEach(() => {
    cy.interceptAdRequest('medium_rectangle.json');
    cy.interceptFragmentRequest('medium_rectangle.json', 'banner.hype');
  });

  it('renders a clickable banner image', () => {
    cy.visit('http://localhost:3000/banner');
    cy.get('img')
      .invoke('attr', 'src')
      .should('eq', 'https://di30gnjrtlisb.cloudfront.net/up/asset/bd84407042/a6b54dc0b3.png?tr=n-medium_rectangle');
    cy.get('a')
      .invoke('attr', 'href')
      .should(
        'eq',
        'http://web.hypelab-staging.com/click?campaign_slug=7b2dac4cfe\u0026creative_set_slug=df73049914\u0026placement_slug=38331eab13'
      );
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

    cy.visit('http://localhost:3000/banner');
    cy.wait('@impressionUrl');
  });

  it('should auto-refresh after 30 seconds', () => {
    cy.visit('http://localhost:3000/banner');
    cy.wait('@matchedRequest');

    cy.fixture('medium_rectangle').then((formatResponse) => {
      cy.get('img').invoke('attr', 'src').should('eq', formatResponse.data.creative_set.image);
      cy.get('a').invoke('attr', 'href').should('eq', formatResponse.data.cta_url);
    });

    cy.interceptAdRequest('medium_rectangle_2.json');
    cy.wait('@matchedRequest', { timeout: 31000 });

    cy.fixture('medium_rectangle_2').then((formatResponse) => {
      cy.get('img').invoke('attr', 'src').should('eq', formatResponse.data.creative_set.image);
      cy.get('a').invoke('attr', 'href').should('eq', formatResponse.data.cta_url);
    });
  });
});
