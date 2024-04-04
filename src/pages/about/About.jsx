import AboutText from "../../components/About/AboutText";
import Created from "../../components/About/Created";
import InfoAndChart from "../../components/About/InfoAndChart";
import "./../../components/styles/About.css";

const About = () => {
  return (
    <div className="about">
      <Created />
      <InfoAndChart />
      <AboutText />
    </div>
  );
};

export default About;
