import React, { useEffect, useState } from 'react'
import SignInButton from '../components/SignInButton'
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import SignOutButton from '../components/SignOutButton';
import axios from 'axios';

const LoginPage = () => {
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        const fetchToken = async () => {
            const formData = new FormData();
            formData.append('grant_type', 'client_credentials');
            formData.append('client_id', '970b549e-ec8c-4a59-97ac-69f35f7a8606');
            formData.append('client_secret', 'rNi8Q~MXtJH6u2291pPKjk0P6RWE.rMUsMGcPcmK');
            formData.append('resource', 'https://rafi-uat.sandbox.operations.dynamics.com');
            axios.post('http://localhost:5173/rafi.ph/oauth2/token', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
                .then(res => {
                    const data = res.data
                    console.log(data)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fetchToken();
    }, [])

    return (
        // <div className='container justify-center items-center flex'>
        //     <div className='flex justify-center items-center flex-col'>
        //         <div>
        //             <img src='src/assets/rafiLogo.png' style={{ width: '300px', height: '150px' }} />
        //         </div>
        //         <h1 className='font-bold mb-4'>Sign In to Microsoft</h1>
        //         {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        //     </div>
        // </div>

        <div className='relative flex justify-center'>
            <div className='absolute top-0 left-0'>
                <img src='src/assets/rafiLogo.png' style={{ width: '450px', height: '300px' }} />
            </div>
            <div className='absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[100%] bg-white p-12 rounded text-center'>
                <div>
                    <img style={{ width: '150px', height: '50px' }} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" />
                </div>
                <div>
                    <h1 className='font-bold mb-4'>Sign In to Microsoft</h1>
                </div>

                <div>
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </div>

            </div>

        </div>

    )
}

export default LoginPage
