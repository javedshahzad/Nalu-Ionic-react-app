import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";

// axios.interceptors.request.use(config => {
//   const storedToken = localStorage.getItem('jwtToken');
//   if (storedToken) {
//     config.headers.Authorization = `Bearer ${storedToken}`;
//   }
//   return config;
// });

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
