import React, { useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import NavbarMUI from '../components/NavbarMUI'
import { Box } from '@mui/material'
import axios from 'axios'
import rafiBG from './../assets/rafiBG.png'
import './../pages/home.css'

const Home = () => {

    return (
        <div className='custom-div'>
            <NavbarMUI />
            <AuthenticatedTemplate>
                {/* <p>You are signed-in. Select profile to call Microsoft Graph.</p> */}
                <HomePage />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <LoginPage />
            </UnauthenticatedTemplate>
        </div>


    )
}

export default Home
