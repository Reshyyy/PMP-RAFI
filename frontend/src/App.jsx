import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { MsalProvider } from "@azure/msal-react";
import Home from './pages/Home';


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
