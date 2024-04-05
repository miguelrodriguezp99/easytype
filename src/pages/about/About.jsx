import AboutText from "../../components/About/AboutText";
import Created from "../../components/About/Created";
import Credits from "../../components/About/Credits";
import InfoAndChart from "../../components/About/InfoAndChart";
import Support from "../../components/About/Support";
import "./../../components/styles/About.css";

const About = () => {
  return (
    <div className="about">
      <Created />
      <InfoAndChart />
      <AboutText />
      <Support />
      <Credits />
    </div>
  );
};

export default About;
