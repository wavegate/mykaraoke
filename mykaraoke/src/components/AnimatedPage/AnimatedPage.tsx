import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IAnimatedPage {
	children: ReactNode;
	positionAbsolute?: boolean;
}

export default function AnimatedPage({
	children,
	positionAbsolute = true,
}: IAnimatedPage) {
	return (
		<motion.div
			className={`${positionAbsolute ? "absolute" : ""} p-4`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</motion.div>
	);
}
