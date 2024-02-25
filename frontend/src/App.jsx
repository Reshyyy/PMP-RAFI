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


function App({ msalInstance }) {
  return (
    <div>
      <MsalProvider instance={msalInstance}>
        {/* <NavBar /> */}
        <BrowserRouter>
          <Routes>
            {/* Routes */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<HomePage />} />

            {/* Tests */}
            <Route exact path="/test" element={<PageLayout />} />
            <Route exact path="/uploadtest" element={<UploadTest />} />
            <Route exact path="/crud" element={<FullFeaturedCrudGrid />} />
          </Routes>
        </BrowserRouter>

      </MsalProvider>

      {/* <MsalProvider instance={msalInstance}>


        <div className='h-screen bg-purple-500 flex justify-center items-center bg-gradient-to-r from-indigo-500'>
          <div className='bg-white p-10 flex justify-center items-center flex-col'>
            <div>
              <img style={{ width: '100px', height: '100px' }} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" />
            </div>
            <h1 className='font-bold mb-5 '>Sign In to Microsoft</h1>
            <NavBar />

          </div>

        </div>
      </MsalProvider> */}
    </div>

  )
}

export default App
