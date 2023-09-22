import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GlobalContext from "./context/GlobalContext";
import { useState } from "react";
const queryClient = new QueryClient();
export default function App() {
    const [user, setUser] = useState(null);
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(GlobalContext.Provider, { value: { user, setUser }, children: _jsx(Layout, {}) }) }) }));
}
