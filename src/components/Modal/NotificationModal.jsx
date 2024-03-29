import { useCallback, useState } from "react";
import "../styles/NotificationModal.css";
import { Bell } from "../../assets/icons/HeaderIcons";
import { Announcement, Notification } from "../../assets/icons/NotificationModal";

export default function NotificationModal() {
  const [modal, setModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("");

  // Necesitamos hacer un timeout para poder hacer la animacion de salida sin que desaparezca el modal de golpe
  const closeModal = useCallback(() => {
    setAnimationClass("modalOut");
    setBackgroundClass("");
    // Aplica la clase para animar hacia fuera
    setTimeout(() => {
      setBackgroundClass(
        "animate-fade animate-once animate-duration-300 animate-ease-linear animate-reverse animate-fill-both"
      );
    }, 10);

    // Aplica la clase para animar el fondo
    setTimeout(() => {
      setModal(false);
      setAnimationClass("");
      setBackgroundClass("");
    }, 300);
  }, []);

  const toggleModal = useCallback(() => {
    if (modal) {
      closeModal();
    } else {
      setModal(true);
      setAnimationClass("translated"); // Clase para animar hacia dentro
      setBackgroundClass(
        "animate-fade animate-once animate-duration-300 animate-ease-linear animate-fill-both"
      );
    }
  }, [modal, closeModal]);

  return (
    <>
      <div className="button-div">
        <button onClick={toggleModal} className="p-3 group">
          <Bell />
        </button>
      </div>

      {modal && (
        <>
          {/* Background */}
          <div onClick={toggleModal} className={`modal-background ${backgroundClass}`}></div>

          {/* Modal Content */}
          <div className={`modal-body ${animationClass}`}>
            <section className="modal-section ">
              <h2>
                <Announcement />
                Announcements
              </h2>
              <div>
                <p>Nothing to show</p>
              </div>
            </section>

            {/* Divider */}
            <div className="divider"></div>

            <section className="modal-section">
              <h2>
                <Notification />
                Notifications
              </h2>
              <div>
                <p>Nothing to show</p>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
