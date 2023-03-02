import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { HypeLabContext, Environment, HypeLab, useNative } from "hypelab-react";
import tailwindStylesheetUrl from "./styles/tailwind.css";

const client = new HypeLab({
  URL: "https://api.hypelab-staging.com",
  propertySlug: "dripdripdrip",
  environment: Environment.Development,
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <HypeLabContext client={client}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </HypeLabContext>
      </body>
    </html>
  );
}
