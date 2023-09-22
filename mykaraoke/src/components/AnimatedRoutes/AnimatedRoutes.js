import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import MockPage from "@/pages/MockPage/MockPage";
import RegisterPage from "@/pages/RegisterPage";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
export default function AnimatedRoutes() {
    const location = useLocation();
    return (_jsx(AnimatePresence, { children: _jsxs(Routes, { location: location, children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/mock", element: _jsx(MockPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) })] }, location.pathname) }));
}
