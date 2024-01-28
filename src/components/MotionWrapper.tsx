import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionWrapper = ({
  children,
  duration,
}: {
  children: React.ReactNode;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration ?? 0.15 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <Box p={4} pt={20}>
        {children}
      </Box>
    </motion.div>
  );
};

export default MotionWrapper;
