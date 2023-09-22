import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function AnimatedPage({ children }) {
    return (_jsx(motion.div, { className: `absolute p-4 top-[56px] w-full`, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: children }));
}
