import React from 'react'
import NavBar from './NavBar'
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import HomePage from '../pages/HomePage';
import Home from '../pages/Home';
import rafiBG from '/src/assets/rafiBG.png';

const PageLayout = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className='h-screen bg-cover bg-center' style={{ backgroundImage: `url(${rafiBG})` }}>
      <div style={{ backgroundImage: "url('src/assets/rafiLogo.png')" }}>

      </div>
      <NavBar />
      {isAuthenticated ? <Home /> : null}
      <div className="h-screen bg-cover bg-center" >

      </div>
    </div>
  )
}

export default PageLayout
