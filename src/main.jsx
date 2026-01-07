import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App-new.jsx'

import ErrorBoundary from './components/ErrorBoundary.jsx'

console.log('Starting app render...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

console.log('App render called.');
