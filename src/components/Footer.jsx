import { links } from "../utils/footerLinks";
import Guide from "./Footer/Guide";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <Guide />
      <div className="flex">
        <div className="footer-links">
          {links.map((link, index) => (
            <a key={index} href={link.href} className=" group " target="_blank" rel="noreferrer">
              <link.icon {...link.props} className="icons-footer group" />
              <p className="footer-icon-text">{link.text}</p>
            </a>
          ))}
        </div>
        <div className="footer-modals">
          <div>Sound</div>
          <div>Theme</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
