import { useWordsStore } from "../store/useWords";
import { APP_STATE } from "../utils/constants";
import ChartComp from "./Chart/Chart";
import "./styles/Results.css";

import { resultIconsButtons } from "../utils/constants";
import { getTestType } from "../utils/resultFunctions";

const Results = () => {
  const {
    appState,
    restart,
    correctLetters,
    incorrectLetters,
    wpm,
    accuracy,
    timeUsed,
    gameMode,
    timeSelected,
    selectedWords,
  } = useWordsStore();

  const bottomButtons = resultIconsButtons({ restart });
  const testType = getTestType(gameMode, timeSelected, selectedWords);

  return (
    <div
      className={`results-wrapper ${
        appState === APP_STATE.FINISHED ? "show-results" : "hide-results"
      }`}
    >
      <section id="results-info-section" className={`results-info-section `}>
        <div className={`results`}>
          <div className="stats">
            <div className="acc-wpm">
              <p className="acc-wpm-title">wpm</p>
              <p className="acc-wpm-value">{wpm}</p>
            </div>

            <div className="acc-wpm">
              <p className="acc-wpm-title">acc</p>
              <p className="acc-wpm-value">{accuracy}%</p>
            </div>
          </div>

          <div className="chart">
            {appState === APP_STATE.FINISHED && <ChartComp />}
          </div>

          <div className="morestats">
            <div className="">
              <div className="stats-top">test type</div>
              <div className="stats-bottom">{testType}</div>
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
              <div className="stats-bottom text-size">
                {correctLetters}/{incorrectLetters}/0/0
              </div>
            </div>
            <div>
              <div className="stats-top">consistency</div>
              <div className="stats-bottom text-size">90%</div>
            </div>
            <div>
              <div className="stats-top">time</div>
              <div className="stats-bottom text-size">{timeUsed}s</div>
            </div>
          </div>
        </div>
        <div className="result-buttons">
          {bottomButtons.map((resultButton, index) => (
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
    </div>
  );
};

export default Results;
