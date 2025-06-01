// components/AOSInitializer.tsx
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: false,
      mirror: false,
      offset: 0,
    });
     AOS.refresh();
  }, []);

  return null;
}
