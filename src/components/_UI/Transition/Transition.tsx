"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Transition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [animKey, setAnimKey] = useState(pathname);

  useEffect(() => {
    setAnimKey(pathname);
  }, [pathname]);

  return (
    <main key={animKey} className="relative z-[1] min-h-dvh animate-fade-in bg-main">
      {children}
    </main>
  );
};

export default Transition;
