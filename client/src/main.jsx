import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import this

// Replace with your actual Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "324139833256-ubqts78dlef7dgof7o93v6kbv5bjp3c9.apps.googleusercontent.com"; // client/src/main.jsx


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)