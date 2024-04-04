import { useCallback, useEffect, useState } from "react";
import "../styles/ThemeModal.css";
import { Palette } from "../../assets/icons/FooterIcons";
import { themesMap } from "../../utils/themesMap";
export default function ThemeModal() {
  const [modal, setModal] = useState(false);
  const [oldTheme, setOldTheme] = useState("");
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setCurrentTheme(theme);
      document.documentElement.classList.add(theme);
    }
  }, []);

  const closeModal = useCallback(() => {
    setAnimationClass("");
    setTimeout(() => {
      setAnimationClass(
        "animate-fade animate-once animate-duration-200 animate-ease-out animate-reverse "
      );
    }, 10);

    setTimeout(() => {
      setModal(false);
      setAnimationClass("");
    }, 300);
  }, []);

  const toggleModal = useCallback(() => {
    if (modal) {
      closeModal();
    } else {
      setModal(true);
      setAnimationClass(
        "animate-fade-up animate-once animate-duration-300 animate-ease-out animate-normal"
      );
    }
  }, [modal, closeModal]);

  // Initial theme
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setOldTheme("dark");
    } else {
      document.documentElement.classList.add("light");
      setOldTheme("light");
    }
  }, []);

  const switchTheme = useCallback(
    (theme) => {
      return () => {
        const root = document.documentElement;
        root.classList.remove(oldTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
        setOldTheme(theme);
        setCurrentTheme(theme);
        toggleModal();
      };
    },
    [oldTheme, toggleModal]
  );

  const mouseEnter = (theme) => {
    const root = document.documentElement;
    root.classList.remove(oldTheme);
    root.classList.add(theme);
  };

  const mouseLeave = (theme) => {
    const root = document.documentElement;
    root.classList.remove(theme);
    root.classList.add(oldTheme);
  };

  return (
    <>
      <button onClick={toggleModal}>
        <div className="theme-button group">
          <Palette />
          <p className="footer-theme-text">{currentTheme}</p>
        </div>
      </button>

      {modal && (
        <div className={`theme-modal-body ${animationClass}`}>
          <div onClick={toggleModal} className="theme-background"></div>
          <div className="theme-modal-content">
            <h2>Select your theme!</h2>
            <div className="theme-modal-buttons">
              {themesMap.map((theme, index) => (
                <button
                  key={`colors-${theme.name}-${index}`}
                  onClick={switchTheme(theme.name)}
                  onMouseEnter={() => mouseEnter(theme.name)}
                  onMouseLeave={() => mouseLeave(theme.name)}
                  className="theme-modal-button"
                >
                  <div className="theme-info">
                    <p>{theme.name}</p>
                    <div
                      id={`colors-${theme.name}`}
                      className={`circles ${theme.name}`}
                    >
                      <div className={`first-circle`}></div>
                      <div className={`second-circle`}></div>
                      <div className={`third-circle`}></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
