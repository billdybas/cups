export const config =
  typeof window !== 'undefined'
    ? {
        // Client
        API_URL: window.env.API_URL,
      }
    : {
        // Server
        API_URL: process.env.API_URL,
      }
