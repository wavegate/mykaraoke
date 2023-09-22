import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import Subtitle from "../Subtitle/Subtitle";
import Title from "../Title/Title";
import "./index.scss";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { forwardRef, useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../ui/dropdown-menu";
const Header = forwardRef((_, ref) => {
    const globalContext = useContext(GlobalContext);
    const user = globalContext?.user;
    return (_jsxs("nav", { className: `w-full px-6 py-3 bg-[#ffffffcc] fixed z-10 top-0 shadow flex justify-between items-center`, ref: ref, children: [_jsxs("div", { className: `flex gap-5 items-center`, children: [_jsx(Title, {}), _jsx(Subtitle, { children: "Job Application Manager" })] }), _jsxs("div", { className: `flex items-center gap-4`, children: [_jsx(NavMenuItem, { icon: faMoon }), user?.username, _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { children: _jsx(Avatar, { imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&usqp=CAU" }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(Link, { to: "/login", children: _jsx(DropdownMenuItem, { children: "Login" }) }), _jsx(Link, { to: "/register", children: _jsx(DropdownMenuItem, { children: "Register" }) })] })] })] })] }));
});
export default Header;
