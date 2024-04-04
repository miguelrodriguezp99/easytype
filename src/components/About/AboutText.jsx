const AboutText = () => {
  return (
    <div className="about-container">
      <section className="about-content">
        <h2>about</h2>
        <p>
          Easytype is a minimalistic and customizable typing test. It features
          many test modes, an account system to save your typing speed history,
          and user-configurable features such as themes, sounds, a smooth caret,
          and more. Monkeytype attempts to emulate the experience of natural
          keyboard typing during a typing test, by unobtrusively presenting the
          text prompts and displaying typed characters in-place, providing
          straightforward, real-time feedback on typos, speed, and accuracy.
          Test yourself in various modes, track your progress and improve your
          speed.
        </p>
        <br />
        <p>
          Test yourself in various modes, track your progress and improve your
          speed.
        </p>
      </section>

      <section className="about-content">
        <h3>word set</h3>
        <p>
          By default, this website uses the most common 200 words in the English
          language to generate its tests. You can change to an expanded set
          (1000 most common words) in the options, or change the language
          entirely.
        </p>
      </section>

      <section className="about-content">
        <h3>keybinds</h3>
        <p>
          You can use tab and enter (or just tab if you have quick tab mode
          enabled) to restart the typing test. Open the command line by pressing
          ctrl/cmd + shift + p or esc - there you can access all the
          functionality you need without touching your mouse
        </p>
      </section>

      <section className="about-content">
        <h3>stats</h3>
        <p>
          wpm - total number of characters in the correctly typed words
          (including spaces), divided by 5 and normalised to 60 seconds. raw wpm
          - calculated just like wpm, but also includes incorrect words. acc -
          percentage of correctly pressed keys. char - correct characters /
          incorrect characters. Calculated after the test has ended. consistency
          - based on the variance of your raw wpm. Closer to 100% is better.
          Calculated using the coefficient of variation of raw wpm and mapped
          onto a scale from 0 to 100.
        </p>
      </section>

      <section className="about-content">
        <h3>results screen</h3>
        <p>
          After completing a test you will be able to see your wpm, raw wpm,
          accuracy, character stats, test length, leaderboards info and test
          info. (you can hover over some values to get floating point numbers).
          You can also see a graph of your wpm and raw over the duration of the
          test. Remember that the wpm line is a global average, while the raw
          wpm line is a local, momentary value. (meaning if you stop, the value
          is 0)
        </p>
      </section>

      <section className="about-content">
        <h3>bug report or feature request</h3>
        <p>
          If you encounter a bug, or have a feature request - join the Discord
          server, send me an email, a direct message on Twitter or create an
          issue on GitHub.
        </p>
      </section>

      <section className="about-content">
        <h2>support</h2>
        <p>
          Thanks to everyone who has supported this project. It would not be
          possible without you and your continued support.
        </p>
        <button className="about-button">Support</button>
      </section>

      <section className="about-content">
        <h2>support</h2>
        <p>
          Thanks to everyone who has supported this project. It would not be
          possible without you and your continued support.
        </p>
        <div className="contact-buttons">
          <button className="about-button">Mail</button>
          <button className="about-button">Twitter</button>
          <button className="about-button">Discord</button>
          <button className="about-button">GitHub</button>
        </div>
      </section>

      <section className="about-content">
        <h2>credits</h2>
        <p>Thanks to @midudev for the inspiration and the initial codebase.</p>
      </section>
    </div>
  );
};

export default AboutText;
