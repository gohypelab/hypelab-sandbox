import { Banner, HypeLabContext, Environment, HypeLab } from "hypelab-react";

const client = new HypeLab({
  URL: "https://api.hypelab-staging.com",
  propertySlug: "3eb413c650", // gallery
  environment: Environment.Development,
});

function BannerComponent() {
  return (
    <HypeLabContext client={client}>
      <Banner placement="38331eab13" />
    </HypeLabContext>
  );
}

export { BannerComponent };
