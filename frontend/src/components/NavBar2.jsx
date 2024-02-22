import React, { useEffect, useState } from 'react';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import WelcomeName from './WelcomeName';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import HomePage from '../pages/HomePage';
import Profile from '../pages/Profile';
import rafiLogo from './../assets/rafiLogo.png'

const NavBar2 = () => {
    const isAuthenticated = useIsAuthenticated(); // Get the authentication status

    return (
        <nav className="bg-white">
            <div className='grid grid-cols-12 items-center'>
                <div className='col-span-1'>
                    <img src={rafiLogo} style={{ width: '100px', height: '50px' }} />
                </div>
                <div className='col-span-8 justify-end'>
                    <p className='font-bold font-sans text-xs'>PROCUREMENT MANAGEMENT PLAN</p>
                    <p className='font-medium font-helvetica text-xs'>RAFI - RAMON ABOITIZ FOUNDATION INC.</p>
                </div>
                <div className="col-span-3 flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
                    {isAuthenticated ? <SignOutButton /> : null}
                </div>
            </div>
        </nav>

    );
}

export default NavBar2;
