describe('Native', () => {
  beforeEach(() => {
    cy.interceptAdRequest('native.json');
  });

  it('renders a clickable native ad', () => {
    cy.visit('http://localhost:3000/native');

    cy.get('[data-cy="advertiser"]').should('have.text', 'Ledger');
    cy.get('[data-cy="headline"]').should('have.text', 'Store your crypto safely');
    cy.get('[data-cy="body"]').should(
      'have.text',
      'The smartest way to securely store your crypto. Ledger hardware wallets bring peace of mind to over 4 million users.'
    );
    cy.get('[data-cy="displayUrl"]').should('have.text', 'ledger.com');
    cy.get('[data-cy="ctaLink"]')
      .invoke('attr', 'href')
      .should(
        'eq',
        'http://web.hypelab.com/click?campaign_slug=b33847379f&creative_set_slug=4cde3a5f3c&placement_slug=4cd3f56dc9'
      );
    cy.get('[data-cy="ctaText"]').should('have.text', 'Shop now');
    cy.get('[data-cy="mediaContent"]')
      .children('video')
      .should('have.attr', 'src', 'https://di30gnjrtlisb.cloudfront.net/up/asset/a61703075a/199389cb82.mp4?tr=w-600');
    cy.get('[data-cy="icon"]').should(
      'have.attr',
      'src',
      'https://di30gnjrtlisb.cloudfront.net/up/asset/cd7f4397e5/b83188c4f0.png?tr=w-100'
    );
  });

  it('fires the impression ping', () => {
    cy.intercept('POST', 'https://api.hypelab-staging.com/v1/events', (req) => {
      expect(req.body).to.deep.include({
        campaign_slug: 'b33847379f',
        creative_set_slug: '4cde3a5f3c',
        placement_slug: '5d788944b1',
        property_slug: '3eb413c650',
        type: 'impression',
        wids: ['0x123'],
      });
      expect(req.body.uuid).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      req.reply({ status: 'success' });
    }).as('impressionUrl');

    cy.visit('http://localhost:3000/native');

    cy.wait('@impressionUrl');
  });
});
