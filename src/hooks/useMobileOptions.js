import { useEffect, useState } from "react";

const useMobileOptions = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 430);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export default useMobileOptions;
