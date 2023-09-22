import { jsx as _jsx } from "react/jsx-runtime";
import "./index.scss";
export default function Avatar({ imgSrc }) {
    return (_jsx("div", { children: _jsx("img", { src: imgSrc, className: `w-8 h-8 rounded-full shadow` }) }));
}
