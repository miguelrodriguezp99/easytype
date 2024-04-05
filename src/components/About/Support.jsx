import {
  AboutCode,
  AboutDiscord,
  AboutMail,
  AboutSupport,
  AboutX,
} from "../../assets/icons/AboutIcons";

const Support = () => {
  return (
    <>
      <section className="about-content">
        <h2>support</h2>
        <p>
          Thanks to everyone who has supported this project. It would not be
          possible without you and your continued support.
        </p>
        <button className="about-button">
          <AboutSupport />
          Support
        </button>
      </section>

      <section className="about-content">
        <h2>support</h2>
        <p>
          Thanks to everyone who has supported this project. It would not be
          possible without you and your continued support.
        </p>
        <div className="contact-buttons">
          <button className="about-button">
            <AboutMail />
            Mail
          </button>
          <button className="about-button">
            <AboutX />
            Twitter
          </button>
          <button className="about-button">
            <AboutDiscord />
            Discord
          </button>
          <button className="about-button">
            <AboutCode />
            GitHub
          </button>
        </div>
      </section>
    </>
  );
};

export default Support;
