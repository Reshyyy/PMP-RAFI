import React from 'react'
import { useMsal } from '@azure/msal-react';
import { Button } from '@mui/material';


const SignInButton = () => {
    const { instance } = useMsal();
    const handleLogin = () => {
        instance.loginPopup({
            scopes: ["user.read"],
        })
    }
    return (
        <div>
            <Button variant="contained" size="small" onClick={handleLogin}>
                Sign in
            </Button>
        </div>
    )
}

export default SignInButton
