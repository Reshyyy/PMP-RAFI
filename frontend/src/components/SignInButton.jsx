import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { Button } from '@mui/material';
import axios from 'axios';

const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = async () => {
        try {
            await instance.loginPopup({
                scopes: ["user.read"],
            });

            fetchToken();
        } catch (error) {
            console.log(error);
        }
    }

    const fetchToken = async () => {
        const form = {
            client_id: import.meta.env.VITE_RAFI_CLIENT_ID,
            grant_type: import.meta.env.VITE_RAFI_GRANT_TYPE,
            client_secret: import.meta.env.VITE_RAFI_CLIENT_SECRET,
            resource: import.meta.env.VITE_RAFI_RESOURCE
        };
        try {
            const response = await axios.post('/rafi.ph/oauth2/token', new URLSearchParams(form), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            const data = response.data;
            console.log(data);

            // Set token to local storage or state
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('expiresOn', data.expires_on);
            localStorage.setItem('notBefore', data.not_before);

            const expiresIn = parseInt(data.expires_on) * 1000; // Convert Unix timestamp to milliseconds
            const currentTime = Date.now();
            const refreshTime = expiresIn - currentTime - (5 * 60 * 1000); // Refresh 5 minutes before expiration
            console.log(refreshTime);

            if (refreshTime > 0) {
                setTimeout(fetchToken, refreshTime); // Refresh token 5 minutes before expiration
            } else {
                console.log("Token already expired");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Button variant="contained" size="small" onClick={handleLogin}>
                Sign in
            </Button>
        </div>
    );
}

export default SignInButton;
