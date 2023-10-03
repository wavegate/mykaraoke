import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
