import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from 'react'
import React from 'react'


const WelcomeName = () => {
  const { instance } = useMsal();
  const [username, setUsername] = useState('')

  useEffect(() => {
    const currentAccount = instance.getActiveAccount();
    if (currentAccount) {
      setUsername(currentAccount.username)
    }
  }, [instance])
  

  return <Typography variant="h6">Welcome, {username}</Typography>;
}

export default WelcomeName
