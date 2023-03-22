function setUpVideo() {
  cy.visit('../../rewarded.html');
  cy.get('._hypelab_rewarded_modal', { timeout: 1000 });
}

function speedUpVideo() {
  cy.get('video').then(($video) => {
    $video[0].playbackRate = 10;
    $video[0].play();
  });
}

describe('Rewarded', () => {
  beforeEach(() => {
    cy.interceptAdRequest('rewarded.json');
    cy.interceptFragmentRequest('rewarded.json', 'rewarded.hype');
  });

  it('the rewarded modal should initially not be visible', () => {
    setUpVideo();

    cy.fixture('rewarded').then((formatResponse) => {
      cy.get('._hypelab_rewarded_headline').should('have.text', formatResponse.data.headline);
      cy.get('._hypelab_rewarded_displayUrl').should('have.text', formatResponse.data.display_url);
      cy.get('._hypelab_rewarded_cta').should('have.text', formatResponse.data.cta_text);
      cy.get('a').invoke('attr', 'href').should('eq', formatResponse.data.cta_url);
      cy.get('a').invoke('attr', 'target').should('eq', '_blank');
      cy.get('video').invoke('attr', 'src').should('eq', formatResponse.data.creative_set.video);
    });

    cy.get('._hypelab_rewarded_modal').should('not.be.visible');
  });

  it('the rewarded modal should automatically reload after video is complete', () => {
    setUpVideo();
    cy.get('[data-cy=button]').click('center');

    cy.get('._hypelab_rewarded_countdownText').should('be.visible');
    cy.get('._hypelab_rewarded_countdownIcon').should('not.be.visible');

    speedUpVideo();

    cy.get('._hypelab_rewarded_countdownText', { timeout: 10000 }).should('not.be.visible');
    cy.get('._hypelab_rewarded_countdownIcon', { timeout: 10000 }).should('be.visible').click('center');

    cy.get('._hypelab_rewarded_modal').should('not.be.visible');

    cy.wait(500);

    cy.get('[data-cy=button]').click('center');

    cy.get('._hypelab_rewarded_countdownText').should('be.visible');
    cy.get('._hypelab_rewarded_countdownIcon').should('not.be.visible');

    speedUpVideo();

    cy.get('._hypelab_rewarded_countdownText', { timeout: 10000 }).should('not.be.visible');
    cy.get('._hypelab_rewarded_countdownIcon', { timeout: 10000 }).should('be.visible').click('center');
  });

  it('should render a close option after the playback period', () => {
    setUpVideo();
    speedUpVideo();

    cy.get('[data-cy=button]').click('center');
    cy.get('._hypelab_rewarded_countdownIcon', { timeout: 10000 }).should('be.visible');
    cy.get('._hypelab_rewarded_countdownIcon').click('center');
    cy.get('._hypelab_rewarded_modal').should('not.be.visible');
  });

  describe('Events', () => {
    it('fires the event pings', () => {
      let interceptCount = 0;
      const eventProperties = {
        campaign_slug: 'ed0427151e',
        creative_set_slug: 'fcd9f99545',
        placement_slug: 'f31318b055',
        property_slug: '3eb413c650',
        wids: ['0x123'],
      };

      cy.intercept('POST', 'https://api.hypelab-staging.com/v1/events', (req) => {
        if (interceptCount === 0) {
          expect(req.body).to.deep.include({
            ...eventProperties,
            type: 'impression',
          });
        } else if (interceptCount === 1) {
          expect(req.body).to.deep.include({
            ...eventProperties,
            type: 'click',
          });
        }

        expect(req.body.provider_name).to.eq('vanilla');
        expect(req.body.provider_version).to.match(/\d+\.\d+\.\d+/);
        expect(req.body.sdk_version).to.match(/\d+\.\d+\.\d+/);
        expect(req.body.uuid).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);

        interceptCount += 1;
      });

      setUpVideo();
      speedUpVideo();

      cy.get('[data-cy=button]').click('center');
      cy.get('a').invoke('removeAttr', 'target');
      cy.get('._hypelab_rewarded_cta').click();
    });
  });
});
