import { enableAllPlugins } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/index.scss';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './tailwind.css';

enableAllPlugins();

reportWebVitals();
serviceWorkerRegistration.register();

// React 18 (but using legacy render API for Router v5 compatibility)
const container = document.getElementById('app'); // MUST match index.html
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
