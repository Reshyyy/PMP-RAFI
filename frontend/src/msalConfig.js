// src/msalConfig.js
export const msalConfig = {
    auth: {
      clientId: import.meta.env.VITE_RAFI_CLIENT_ID,
      tenantId: import.meta.env.VITE_RAFI_TENANT_ID,
      authority: import.meta.env.VITE_RAFI_AUTHORITY,
      redirectUri: '/home',
    },
};
  