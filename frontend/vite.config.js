import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from "https";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/rafi.ph': 'http://20.188.123.92:3000/',
    }
  },
  plugins: [react()],
  define: {
    'process.env.VITE_RAFI_REQ_ID':JSON.stringify(process.env.VITE_RAFI_REQ_ID),
    'process.env.VITE_RAFI_CLIENT_ID':JSON.stringify(process.env.VITE_RAFI_CLIENT_ID),
    'process.env.VITE_RAFI_CLIENT_SECRET':JSON.stringify(process.env.VITE_RAFI_CLIENT_SECRET),
    'process.env.VITE_RAFI_RESOURCE':JSON.stringify(process.env.VITE_RAFI_RESOURCE),
    'process.env.VITE_RAFI_GRANT_TYPE':JSON.stringify(process.env.VITE_RAFI_GRANT_TYPE),
    'process.env.VITE_RAFI_TENANT_ID':JSON.stringify(process.env.VITE_RAFI_TENANT_ID),
    'process.env.VITE_RAFI_AUTHORITY':JSON.stringify(process.env.VITE_RAFI_AUTHORITY)
  },
  build: {
    commonjsOptions: true
  }
})
