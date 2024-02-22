import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from 'react'
import React from 'react'
import Profile from "../pages/Profile";
import { Link } from "react-router-dom";


const WelcomeName = () => {
    const { instance } = useMsal();
    const [username, setUsername] = useState('')

    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if (currentAccount) {
            setUsername(currentAccount.username)
        }
    }, [instance])

  return (
    <div>
      <p>Welcome, {username}</p>
        <Profile />
    </div>
  )
}

export default WelcomeName
