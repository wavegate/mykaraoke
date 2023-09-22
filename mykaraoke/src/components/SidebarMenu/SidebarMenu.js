import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faClipboardQuestion, faComments, faHouse, faUser, } from "@fortawesome/free-solid-svg-icons";
import SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import "./index.scss";
import { useEffect, useRef } from "react";
export default function SidebarMenu({ setSideBarMenuMeasure }) {
    const ref = useRef(null);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            // for (const entry of entries) {
            if (ref.current) {
                const width = ref.current.getBoundingClientRect().width;
                setSideBarMenuMeasure(width);
            }
            // }
        });
        if (ref.current) {
            resizeObserver.observe(ref.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, [ref, setSideBarMenuMeasure]);
    return (_jsxs("div", { className: `flex flex-col gap-1 max-w-xs p-2 shadow basis-56 overflow-x-hidden w-[240px] fixed h-full top-[56px]`, ref: ref, children: [_jsx(SidebarMenuItem, { link: "/", label: "Dashboard", icon: faHouse }), _jsx(SidebarMenuItem, { link: "/mock", label: "Mock Interview", icon: faClipboardQuestion }), _jsx(SidebarMenuItem, { link: "/profile", label: "Profile", icon: faUser }), _jsx(SidebarMenuItem, { link: "/discussion", label: "Discussion", icon: faComments })] }));
}
