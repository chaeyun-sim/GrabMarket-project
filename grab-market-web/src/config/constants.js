// export const API_URL = 'https://grab-market-server.onrender.com';
// production API

export const API_URL = process.env.NODE_ENV === 'production' ? 'https://grab-market-server.onrender.com' : 'http://localhost:8080'