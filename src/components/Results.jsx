import { useWordsStore } from "../store/useWords";
import { APP_STATE } from "../utils/constants";
import ChartComp from "./Chart/Chart";
import "./styles/Results.css";

import { resultIconsButtons } from "../utils/constants";

const Results = () => {
  const { appState } = useWordsStore();
  return (
    <section
      id="results-info-section"
      className={`${appState !== APP_STATE.FINISHED && "hidden"}`}
    >
      <div className={`results `}>
        <div className="stats">
          <div className="acc-wpm">
            <p className="acc-wpm-title">wpm</p>
            <p className="acc-wpm-value">120</p>
          </div>

          <div className="acc-wpm">
            <p className="acc-wpm-title">acc</p>
            <p className="acc-wpm-value">10%</p>
          </div>
        </div>

        <div className="chart">
          <ChartComp />
        </div>

        <div className="morestats">
          <div className="">
            <div className="stats-top">test type</div>
            <div className="stats-bottom">words 10 spanish</div>
          </div>
          <div>
            <div className="stats-top">other</div>
            <div className="stats-bottom">invalid (accuracy)</div>
          </div>
          <div>
            <div className="stats-top">raw</div>
            <div className="stats-bottom text-size">56</div>
          </div>
          <div>
            <div className="stats-top">characters</div>
            <div className="stats-bottom text-size">0/0/0/0</div>
          </div>
          <div>
            <div className="stats-top">consistency</div>
            <div className="stats-bottom text-size">26%</div>
          </div>
          <div>
            <div className="stats-top">time</div>
            <div className="stats-bottom text-size">5s</div>
          </div>
        </div>
      </div>
      <div className="result-buttons">
        {resultIconsButtons.map((resultButton, index) => (
          <button
            key={index}
            className="result-button"
            onClick={resultButton.fn}
          >
            <resultButton.icon />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Results;
