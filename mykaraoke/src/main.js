import { jsx as _jsx } from "react/jsx-runtime";
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
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
