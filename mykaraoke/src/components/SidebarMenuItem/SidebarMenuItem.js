import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";
import { NavLink } from "react-router-dom";
export default function SidebarMenuItem({ link, label, icon, }) {
    return (_jsxs(NavLink, { to: link, className: ({ isActive }) => `px-4 py-1.5 rounded-md flex items-center gap-3 ${isActive
            ? "bg-slate-100 font-medium text-slate-800"
            : "hover:bg-slate-50"} hover:cursor-pointer transition-all duration-200 text-slate-600 hover:text-slate-800 group`, children: [_jsx("div", { className: `w-6 h-6 flex items-center justify-center`, children: _jsx(FontAwesomeIcon, { icon: icon }) }), _jsx("div", { children: label })] }));
}
