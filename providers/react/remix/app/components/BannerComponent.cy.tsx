import React from "react";
import { BannerComponent } from "./BannerComponent";

describe("<BannerComponent />", () => {
  it("renders a clickable banner image", () => {
    cy.interceptWithFile(
      {
        method: "POST",
        url: "https://api.hypelab-staging.com/v1/requests",
      },
      "medium_rectangle"
    );

    cy.viewport(300, 250);
    cy.mount(<BannerComponent />);
    cy.get("img")
      .invoke("attr", "src")
      .should(
        "eq",
        "https://di30gnjrtlisb.cloudfront.net/up/asset/bd84407042/a6b54dc0b3.png?tr=n-medium_rectangle"
      );
    cy.get("a")
      .invoke("attr", "href")
      .should(
        "eq",
        "http://web.hypelab-staging.com/click?campaign_slug=7b2dac4cfe\u0026creative_set_slug=df73049914\u0026placement_slug=563c92a85b"
      );
  });
});
