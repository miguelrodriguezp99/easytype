import html2canvas from "html2canvas";
import { toast } from "sonner";
import { GAME_MODE } from "./constants";

export const takeScreenshot = () => {
  // const animationClasses = "animate-fade animate-once animate-duration-[800ms] animate-normal animate-fill-both";
  const element = document.getElementById("results-info-section");
  element.classList.add("cancel-animations");

  if (!element) return;
  console.log("takeScreenshot");

  setTimeout(() => {
    html2canvas(element, {
      logging: true, // Para depuración, muestra mensajes en la consola
      useCORS: true, // Permite cargar recursos externos dentro del canvas
      width: window.innerWidth, // Captura el ancho completo del viewport
      height: window.innerHeight, // Captura el alto completo del viewport

      scrollX: 0, // Ajustes de desplazamiento, si es necesario
      scrollY: 0, // Ajustes de desplazamiento, si es necesario
      // Puedes ajustar scale según sea necesario para mejorar la calidad o el rendimiento
    })
      .then((canvas) => {
        // element.classList.add(...animationClasses.split(" "));
        canvas.toBlob((blob) => {
          try {
            navigator.clipboard
              .write([
                new ClipboardItem({
                  "image/png": blob,
                }),
              ])
              .then(() => {
                toast.success("Screenshot copied to clipboard");
              })
              .catch(() => {
                toast.error("Error copying screenshot to clipboard");
              });
          } catch (error) {
            toast.error("Error copying screenshot to clipboard");
          } finally {
            element.classList.remove("cancel-animations");
          }
        });
      })
      .catch(() => toast.error("Error copying screenshot to clipboard"));
  }, 500);
};

export const getTestType = (gameMode, timeSelected, numberOfWords) => {
  if (gameMode === GAME_MODE.TIME) {
    return `time ${timeSelected} english`;
  } else if (gameMode === GAME_MODE.WORDS) {
    return `words ${numberOfWords} english`;
  } else if (gameMode === GAME_MODE.QUOTE) {
    return `quote`;
  } else if (gameMode === GAME_MODE.ZEN) {
    return `zen`;
  }
};
