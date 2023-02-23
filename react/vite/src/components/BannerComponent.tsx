import { Banner, HypeLabContext, Environment, HypeLab } from 'hypelab-react';

const client = new HypeLab({
  URL: 'https://api.hypelab-staging.com',
  propertySlug: 'dripdripdrip',
  environment: Environment.Development,
});

function BannerComponent() {
  return (
    <HypeLabContext client={client}>
      <Banner placement="563c92a85b" />
    </HypeLabContext>
  );
}

export { BannerComponent };
