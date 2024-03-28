import GuideKeys from "./GuideKeys";

const Guide = () => {
  return (
    <>
      <div id="guide">
        <div className="guide-text">
          <GuideKeys text="tab" /> - <p>restart test</p>
        </div>

        <div className="guide-text under">
          <GuideKeys text="esc" /> or <GuideKeys text="ctrl" /> +
          <GuideKeys text="shift" /> + <GuideKeys text="p" /> - command line
        </div>
      </div>
    </>
  );
};

export default Guide;
