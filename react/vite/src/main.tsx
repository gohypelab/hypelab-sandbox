import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HypeLab, HypeLabContext, Environment } from 'hypelab-react';
import { NativeComponent } from './components/NativeComponent';

const client = new HypeLab({
  URL: 'https://api.hypelab-staging.com',
  propertySlug: 'dripdripdrip',
  environment: Environment.Development,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HypeLabContext client={client}>
      <NativeComponent />
    </HypeLabContext>
  </React.StrictMode>
);
