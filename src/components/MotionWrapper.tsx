import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <Box p={4} pt={20}>
        {children}
      </Box>
    </motion.div>
  );
};

export default MotionWrapper;
