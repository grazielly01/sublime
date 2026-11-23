import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // vai direto pro topo sem arrastar visualmente
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;