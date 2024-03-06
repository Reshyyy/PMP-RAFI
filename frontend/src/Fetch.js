export const retrieveData = (endpoint, accessToken) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    }

    return fetch(endpoint, options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

const handleClaims = (response) => {
    if (response.status === 200) {
      return response.json(); // If the response status is 200 (OK), parse it as JSON and return the result.
    } else if (response.status === 401) {
      if (response.headers.get("www-authenticate")) {
        const authenticateHeader = response.headers.get("www-authenticate");
        const claimsChallenge = authenticateHeader
          .split(" ")
          .find((entry) => entry.includes("claims=")) // Find the entry in the authenticateHeader that contains "claims=".
          .split('claims="')[1] // Extract the part of the entry after 'claims="'.
          .split('",')[0]; // Extract the part before the next '"'.
        sessionStorage.setItem("claimsChallenge", claimsChallenge); // Store the claims challenge in session storage.
        return; // Return without further processing.
      }
      throw new Error(`Error $(response.status)`); // If there's no 'www-authenticate' header, throw an error.
    } else {
      throw new Error(`Error $(response.status)`); // If the response status is neither 200 nor 401, throw an error.
    }
  };