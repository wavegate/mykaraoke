import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IAnimatedPage {
  children: ReactNode;
}

export default function AnimatedPage({ children }: IAnimatedPage) {
  return (
    <motion.div
      className={`absolute top-0 left-0 p-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
