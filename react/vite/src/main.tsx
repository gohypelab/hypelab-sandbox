import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HypeLab, HypeLabContext, Environment } from 'hypelab-react';

const client = new HypeLab({
  URL: 'https://api.hypelab-staging.com',
  propertySlug: 'dripdripdrip',
  environment: Environment.Development,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HypeLabContext client={client}>
      <div></div>
    </HypeLabContext>
  </React.StrictMode>
);
