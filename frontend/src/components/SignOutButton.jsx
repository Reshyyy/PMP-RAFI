import React from 'react'
import { useMsal } from '@azure/msal-react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SignOutButton = () => {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const handleLogout = () => {
        instance.logoutPopup();
        navigate('/');
        localStorage.clear();
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
