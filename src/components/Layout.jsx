import PropTypes from "prop-types";
import "./styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div id="app" className="dark">
      <div className="grid-layout">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}

// We use this to ensure that the children prop is passed to the Layout component.
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
