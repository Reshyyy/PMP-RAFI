import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import HomePage from './HomePage'
import NavBar from '../components/NavBar'
import LoginPage from './LoginPage'
import NavBar2 from '../components/NavBar2'
import NavbarMUI from '../components/NavbarMUI'
import { Box } from '@mui/material'


const Home = () => {
    return (
        <Box sx={{backgroundPosition: 'center', position: 'sticky' }} style={{ backgroundImage: "url('src/assets/rafiBG.png')", backgroundSize: "cover" }}>
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
