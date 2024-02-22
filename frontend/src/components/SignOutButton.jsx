import React from 'react'
import { useMsal } from '@azure/msal-react'
import { Button } from '@mui/material';


const SignOutButton = () => {
    const { instance } = useMsal();
    const handleLogout = () => {
        instance.logoutPopup();
    }
    
    return (
        <div>
            <Button variant="contained" size="small" onClick={handleLogout}>
                Sign out
            </Button>
        </div>
    )
}

export default SignOutButton
