import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HypeLab, HypeLabContext, Environment } from 'hypelab-react';
import { NativeComponent } from './components/NativeComponent';

const client = new HypeLab({
  URL: 'https://api.hypelab-staging.com',
  propertySlug: '3eb413c650',
  environment: Environment.Development,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HypeLabContext client={client}>
      <NativeComponent />
    </HypeLabContext>
  </React.StrictMode>
);
