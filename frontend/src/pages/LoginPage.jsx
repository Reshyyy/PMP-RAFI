import React, { useEffect, useState } from 'react';
import SignInButton from '../components/SignInButton';
import { useIsAuthenticated } from "@azure/msal-react";
import SignOutButton from '../components/SignOutButton';
import { Box, Typography } from '@mui/material';
import axios from 'axios'
import dotenv from 'dotenv'

const LoginPage = () => {
    const isAuthenticated = useIsAuthenticated();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchToken = async () => {
            const form = {
                client_id: import.meta.env.VITE_RAFI_CLIENT_ID,
                grant_type: import.meta.env.VITE_RAFI_GRANT_TYPE,
                client_secret: import.meta.env.VITE_RAFI_CLIENT_SECRET,
                resource: import.meta.env.VITE_RAFI_RESOURCE
            }
            axios.post('/rafi.ph/oauth2/token', new URLSearchParams(form), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
                .then(res => {
                    const data = res.data;
                    console.log(data);

                    // Set token to local storage or state
                    localStorage.setItem('accessToken', data.access_token);
                    localStorage.setItem('expiresOn', data.expires_on);
                    localStorage.setItem('notBefore', data.not_before);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fetchToken();
    }, []);

    // Axios interceptor for token refreshing
    useEffect(() => {
        const axiosInstance = axios.create();

        const requestInterceptor = axiosInstance.interceptors.request.use(
            async (config) => {
                const now = Math.floor(Date.now() / 1000);
                const notBefore = localStorage.getItem('notBefore');

                if (now >= notBefore) {
                    // Token is expired or about to expire, refresh token
                    await fetchToken();
                }

                const accessToken = localStorage.getItem('accessToken');
                config.headers.Authorization = `Bearer ${accessToken}`;

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        };
    }, []);


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
