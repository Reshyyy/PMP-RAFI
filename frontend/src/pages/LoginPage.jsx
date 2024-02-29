import React, { useEffect, useState } from 'react';
import SignInButton from '../components/SignInButton';
import { useIsAuthenticated } from "@azure/msal-react";
import SignOutButton from '../components/SignOutButton';
import { Box, Typography } from '@mui/material';
import axios from 'axios'
import dotenv from 'dotenv'

const LoginPage = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <Box sx={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src='src/assets/rafiLogo.png' style={{ width: '450px', height: '300px', position: 'absolute', top: 0, left: 0 }} alt="RAFI Logo" />

            <Box sx={{ backgroundColor: '#fff', p: 4, textAlign: 'center', borderRadius: 4 }}>
                <Box mb={4}>
                    <img style={{ width: '150px', height: '50px' }} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" alt="Azure Logo" />
                </Box>
                <Typography variant="h5" fontWeight="bold" mb={4}>Sign In to Microsoft</Typography>
                <Box>
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </Box>
            </Box>
        </Box>
    );
}

export default LoginPage;
