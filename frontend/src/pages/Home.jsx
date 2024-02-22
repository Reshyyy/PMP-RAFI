import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import HomePage from './HomePage'
import NavBar from '../components/NavBar'
import LoginPage from './LoginPage'
import NavBar2 from '../components/NavBar2'


const Home = () => {
    return (
        <div className='h-screen bg-cover bg-center sticky' style={{ backgroundImage: "url('src/assets/rafiBG.png')" }}>
            <NavBar2 />
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
