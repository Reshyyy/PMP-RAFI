import React from 'react'
import { useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import { useEffect, useState } from 'react'
import { retrieveData } from "../Fetch";


const Profile = () => {
  const [displayData, setDisplayData] = useState(null)

  const { result, error } = useMsalAuthentication(InteractionType.Redirect , {
    scopes: ["user.read"],
  })

  useEffect(() => {
    if (!displayData) {
      return;
    }
    if (error) {
      console.log(error);
      return;
    }
    if (result) {
      const accessToken = result.accessToken;
      console.log(accessToken);
      retrieveData("https://graph.microsoft.com/v1.0/me", accessToken)
        .then((response) => setDisplayData(response))
        .catch((error) => console.log(error));
    }
  }, [displayData, error, result]);

  return <>{displayData ? <ProfileData displayData={displayData} /> : null}</>;
}

export default Profile
