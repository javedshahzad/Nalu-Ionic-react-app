import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import axios from "axios";


// axios.interceptors.request.use(config => {
//   const storedToken = localStorage.getItem('jwtToken');
//   if (storedToken) {
//     config.headers.Authorization = `Bearer ${storedToken}`;
//   }
//   return config;
// });

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);