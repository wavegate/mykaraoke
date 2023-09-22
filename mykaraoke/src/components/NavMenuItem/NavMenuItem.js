import { jsx as _jsx } from "react/jsx-runtime";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NavMenuItem({ icon }) {
    return (_jsx("div", { className: `inline-flex p-1 rounded-md items-center gap-3
      hover:bg-slate-100 hover:font-medium hover:text-slate-800 hover:cursor-pointer transition-all duration-200 text-slate-600`, children: _jsx("div", { className: `w-6 h-6 flex items-center justify-center`, children: _jsx(FontAwesomeIcon, { icon: icon }) }) }));
}
