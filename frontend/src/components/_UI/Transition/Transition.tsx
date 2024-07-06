"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const Transition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.main
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="bg-main z-[1] relative  min-h-dvh"
    >
      {children}
    </motion.main>
  );
};

export default Transition;
