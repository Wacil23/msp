"use client";
import React, { ReactNode } from "react";
import Loading from "./Loading";

const LoadingManager = ({ children }: { children: ReactNode }) => {
  const [showSlpash, setShowSlpash] = React.useState<boolean>(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSlpash(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return showSlpash ? <Loading /> : children;
};

export default LoadingManager;
