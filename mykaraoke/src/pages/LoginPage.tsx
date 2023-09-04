import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <motion.div
      className={`absolute flex flex-col min-h-screen`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      test
    </motion.div>
  );
}
