import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import './App.css'
import { msalInstance } from './msalInstance';
import { MsalProvider } from "@azure/msal-react";
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Upload from './pages/Upload';
import CssBaseline from "@mui/material/CssBaseline";
import UploadTest from './pages/UploadTest';
import FullFeaturedCrudGrid from './components/FullFeatureCrudGrid';
import ModalAddCOmponent from './components/ModalAddComponent';


function App({ msalInstance }) {
  return (
    <div>
      <MsalProvider instance={msalInstance}>
        {/* <NavBar /> */}
        <BrowserRouter>
          <Routes>
            {/* Routes */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            {/* <Route exact path="/" element={<LoginPage />} /> */}

            {/* Tests */}
            {/* <Route exact path="/test" element={<PageLayout />} />
            <Route exact path="/uploadtest" element={<UploadTest />} />
            <Route exact path="/crudtest" element={<FullFeaturedCrudGridTest />} />
            <Route exact path="/modal" element={<ModalAddCOmponent />} /> */}
            
          </Routes>
        </BrowserRouter>

      </MsalProvider>
    </div>

  )
}

export default App
