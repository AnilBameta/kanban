import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/ErrorBoundaryMessage';
import LoadingComponent from './components/LoadingComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary FallbackComponent={fallbackRender} onReset={() => window.location.reload()} onError={(error, info) => console.log("Error happened:", error, info)}>
    <React.Suspense fallback={<LoadingComponent />}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </React.Suspense>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
