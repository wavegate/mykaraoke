import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IAnimatedPage {
  children: ReactNode;
  positionAbsolute?: boolean;
}

export default function AnimatedPage({ children }: IAnimatedPage) {
  return (
    <motion.div
      className={`absolute top-[56px] w-full`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
