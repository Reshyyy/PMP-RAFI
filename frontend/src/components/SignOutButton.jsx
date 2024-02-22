import React from 'react'
import { useMsal } from '@azure/msal-react'


const SignOutButton = () => {
    const { instance } = useMsal();
    const handleLogout = () => {
        instance.logoutPopup();
    }
    
    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleLogout}>
                Sign out
            </button>
        </div>
    )
}

export default SignOutButton
