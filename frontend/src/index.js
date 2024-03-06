import { PublicClientApplication, EventType } from "@azure/msal-browser";

// Add an MSAL event callback to set the active account
pubClientApp.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log(event);
        pubClientApp.setActiveAccount(event.payload.account);
    }
});

const pubClientApp = new PublicClientApplication({
    auth: {
      clientId: "Paste your client ID",
      authority: "https://login.microsoftonline.com/consumers",
      redirectUri: "/",
    },
});