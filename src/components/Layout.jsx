import PropTypes from "prop-types";
import "./styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";

function Layout({ children }) {
  return (
    <>
      <Toaster richColors position="top-right" />
      <div id="app">
        <div className="grid-layout">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

// We use this to ensure that the children prop is passed to the Layout component.
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
