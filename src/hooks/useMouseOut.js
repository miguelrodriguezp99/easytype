import { useEffect, useState } from "react";
import { useWordsStore } from "../store/useWords";

const useMouseOut = () => {
  const [mouseOut, setMouseOut] = useState(false);
  const { setFocusedFalse, setFocusedTrue } = useWordsStore();

  useEffect(() => {
    // Función para manejar el evento de perder el foco
    const handleBlur = () => {
      setMouseOut(true);
    };

    // Función para manejar el evento de ganar el foco
    const handleFocus = () => {
      setMouseOut(false);
    };

    // Agregar event listeners al montar
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Limpiar event listeners al desmontar
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  //Cada vez que cambie el mouseOut se actualiza el estado de isFocused
  useEffect(() => {
    if (mouseOut) {
      setFocusedFalse();
    }
  }, [mouseOut, setFocusedFalse, setFocusedTrue]);

  // UseEffect to know if the click is outside the grid-layout (main content app)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const gridLayout = document.querySelector(".grid-layout");
      if (gridLayout && !gridLayout.contains(event.target)) {
        setFocusedFalse();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFocusedFalse]);

  return mouseOut;
};

export default useMouseOut;
