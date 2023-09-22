import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import AnimatedRoutes from "../AnimatedRoutes/AnimatedRoutes";
import Header from "../Header/Header";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import { Toaster } from "../ui/toaster";
import axios from "axios";
import { useContext, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import { API_URL } from "@/constants";
export default function Layout() {
    const globalContext = useContext(GlobalContext);
    useQuery({
        queryKey: ["userData"],
        queryFn: () => axios.get(`${API_URL}/user`).then((res) => {
            globalContext?.setUser(res.data);
            return res.data || null;
        }),
    });
    const [sidebarMenuMeasure, setSidebarMenuMeasure] = useState(null);
    return (_jsxs("div", { className: `relative flex flex-col min-h-screen`, children: [_jsx(Header, {}), _jsxs("div", { className: `flex items-stretch flex-1`, children: [_jsx(SidebarMenu, { expanded: false, setSideBarMenuMeasure: setSidebarMenuMeasure }), _jsx("div", { style: { width: `${sidebarMenuMeasure}px` } }), _jsx("div", { className: `relative flex-1`, children: _jsx(AnimatedRoutes, {}) }), _jsx(Toaster, {})] })] }));
}
