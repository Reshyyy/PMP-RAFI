import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { PublicClientApplication } from '@azure/msal-browser';

const pubClientApp = new PublicClientApplication({
  auth: {
    clientId: "970b549e-ec8c-4a59-97ac-69f35f7a8606",
    authority: "https://login.microsoftonline.com/4f2f5733-1a9d-48ac-98f4-a6c588424b7b/",
    redirectUri: "/",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <App msalInstance={pubClientApp}/>
  ,
)
