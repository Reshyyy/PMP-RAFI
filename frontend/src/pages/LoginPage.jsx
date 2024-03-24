import React from 'react';
import SignInButton from '../components/SignInButton';
import { useIsAuthenticated } from "@azure/msal-react";
import SignOutButton from '../components/SignOutButton';
import { Box, Typography } from '@mui/material';
import pmpLogo2 from './../assets/pmpLogo2.png'
import microsoftLogo from './../assets/microsoft.png'

const LoginPage = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <Box sx={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src='src/assets/rafiLogo.png' style={{ width: '450px', height: '300px', position: 'absolute', top: 0, left: 0 }} alt="RAFI Logo" />
            <img src={pmpLogo2} style={{ width: '350px', height: '400px', position: 'absolute', top: -20, right: 0}} alt="RAFI Logo" />
            <Box sx={{ backgroundColor: '#fff', p: 4, textAlign: 'center', borderRadius: 4 }}>
                <Box mb={4}>
                    <img style={{ width: '80px', height: '50px' }} src={microsoftLogo} alt="Azure Logo" />
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
