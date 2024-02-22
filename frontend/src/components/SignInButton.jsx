import React from 'react'
import { useMsal } from '@azure/msal-react';


const SignInButton = () => {
    const { instance } = useMsal();
    const handleLogin = () => {
        instance.loginPopup({
            scopes: ["user.read"],
        })
    }
    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleLogin}>
                Sign in
            </button>
        </div>
    )
}

export default SignInButton
