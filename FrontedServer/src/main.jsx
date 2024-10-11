import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain="dev-zcplul73i4mb36q1.us.auth0.com"
  clientId="AiBzYMmMhYCvTC0bYmhDT1nYs8pXEy64"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}> 

<React.StrictMode>
  <App />
</React.StrictMode>,
  </Auth0Provider>
)
