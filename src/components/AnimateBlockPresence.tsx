import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimateBlockPresenceProps {
  children: React.ReactNode;
}

const AnimateBlockPresence = ({ children }: AnimateBlockPresenceProps) => {
  return (
    <AnimatePresence>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {child}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default AnimateBlockPresence;
