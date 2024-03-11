import React, { useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import NavbarMUI from '../components/NavbarMUI'
import { Box } from '@mui/material'
import axios from 'axios'
import rafiBG from './../assets/rafiBG.png'

const Home = () => {

    return (
        <Box sx={{ backgroundPosition: 'center', position: 'sticky' }} style={{ backgroundImage: `url(${rafiBG})`, backgroundSize: "cover" }}>
            <NavbarMUI />
            <AuthenticatedTemplate>
                {/* <p>You are signed-in. Select profile to call Microsoft Graph.</p> */}
                <HomePage />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <LoginPage />
            </UnauthenticatedTemplate>
        </Box>


    )
}

export default Home
