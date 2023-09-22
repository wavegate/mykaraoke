import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.scss";
function positionIsTop(position) {
    if (position === "top" || position === "topLeft" || position === "topRight") {
        return true;
    }
    else {
        return false;
    }
}
export default function Dropdown({ trigger, content, gap, position = "bottomLeft", }) {
    const [showContent, setShowContent] = useState(false);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const handleMouseOut = () => {
        setShowContent(false);
    };
    const [triggerRect, setTriggerRect] = useState();
    const [contentRect, setContentRect] = useState();
    const positionMap = {
        bottomLeft: { top: (triggerRect?.height || 0) + (gap || 0), left: 0 },
        bottom: {
            top: (triggerRect?.height || 0) + (gap || 0),
            left: 0 - ((contentRect?.width || 0) - (triggerRect?.width || 0)) / 2,
        },
        top: {
            bottom: (gap || 0) + (triggerRect?.height || 0),
            left: 0 - ((contentRect?.width || 0) - (triggerRect?.width || 0)) / 2,
        },
        topLeft: {
            bottom: (gap || 0) + (triggerRect?.height || 0),
            left: 0,
        },
        topRight: {
            bottom: (gap || 0) + (triggerRect?.height || 0),
            right: 0,
        },
        bottomRight: {
            top: (triggerRect?.height || 0) + (gap || 0),
            right: 0,
        },
    };
    useLayoutEffect(() => {
        if (triggerRef.current) {
            setTriggerRect(triggerRef.current?.getBoundingClientRect());
        }
        if (contentRef.current) {
            setContentRect(contentRef.current?.getBoundingClientRect());
        }
    }, [showContent]);
    return (_jsx("div", { className: `relative`, onMouseLeave: handleMouseOut, style: {
            "--gap": `${gap}px`,
        }, children: _jsxs("div", { ref: triggerRef, onMouseEnter: () => setShowContent(true), className: `trigger inline relative ${showContent && "show-content"} ${positionIsTop(position) ? "top" : "bottom"}`, children: [trigger, _jsx(AnimatePresence, { children: showContent && (_jsx(motion.div, { ref: contentRef, className: `absolute rounded-md shadow px-3 py-1 bg-white`, style: {
                            top: positionMap[position].top,
                            left: positionMap[position].left,
                            bottom: positionMap[position].bottom,
                            right: positionMap[position].right,
                        }, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, children: content })) })] }) }));
}
