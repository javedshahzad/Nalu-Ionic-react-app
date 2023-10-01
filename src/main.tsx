import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import './i18n';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
