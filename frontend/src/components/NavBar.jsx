import React, { useEffect, useState } from 'react';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import WelcomeName from './WelcomeName';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import HomePage from '../pages/HomePage';
import Profile from '../pages/Profile';
import rafiLogo from './../assets/rafiLogo.png'

const NavBar = () => {
    const isAuthenticated = useIsAuthenticated(); // Get the authentication status

    return (
        // <div>
        //     {/* Conditional rendering: Display the WelcomeName component only if isAuthenticated is true. */}
        //     {isAuthenticated ? <WelcomeName /> : null}

        //     {/* Display the SignOutButton if isAuthenticated is true, otherwise display the SignInButton. */}
        //     {isAuthenticated ? <SignOutButton /> : <SignInButton /> }
        //     {isAuthenticated ?  <HomePage /> : null}

        // </div>
        <nav className="bg-white top-0">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-start">
                    <div>
                        <img style={{ width: '100px', height: '50px' }} src={rafiLogo} alt='RAFI Logo' />
                    </div>
                    <div className=''>
                        <div>
                            <h1 className='font-bold font-sans text-xs'>PROCUREMENT MANAGEMENT PLAN</h1>
                        </div>
                        <div>
                            <h2 className='font-medium font-helvetica text-xs'>RAFI - RAMON ABOITIZ FOUNDATION INC.</h2>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
                        {isAuthenticated ? <SignOutButton /> : null }
                    </div>

                </div>
            </div>
        </nav>

    );
}

export default NavBar;
