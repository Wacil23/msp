"use client";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import("./Loading"), { ssr: false });

const LoadingManager = ({ children }: { children: ReactNode }) => {
  const [showSlpash, setShowSlpash] = React.useState<boolean>(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSlpash(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return showSlpash ? <DynamicLoading /> : <>{children}</>;
};

export default LoadingManager;
