import PropTypes from "prop-types";
import "./../styles/Footer.css";
const GuideKeys = ({ text }) => {
  return (
    <div className="guide-key" style={{ width: "fit-content" }}>
      <p>{text}</p>
    </div>
  );
};

GuideKeys.propTypes = {
  text: PropTypes.string.isRequired,
};
export default GuideKeys;
