"use client";

import React from "react";
import lottie from "lottie-web";

const Loading: React.FC = () => {
  const animationRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const instance = lottie.loadAnimation({
      container: animationRef?.current!,
      renderer: "svg",

      autoplay: true,
      path: "/splash.json",
    });

    return () => instance.destroy();
  }, []);

  return (
    <div className="grid h-screen place-content-center">
      <div className="w-40" ref={animationRef}></div>
    </div>
  );
};

export default Loading;
