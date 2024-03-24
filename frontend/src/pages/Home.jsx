import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import NavbarMUI from '../components/NavbarMUI'
import './../pages/home.css'

const Home = () => {

    return (
        <div className='custom-div'>
            <NavbarMUI />
            <AuthenticatedTemplate>
                <HomePage />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <LoginPage />
            </UnauthenticatedTemplate>
        </div>


    )
}

export default Home
