import { useEffect, useState } from "react";
import "./../styles/Leaderboard.css";
import { getLeaderboardScores } from "../../utils/serverFunctions";
import { format, parseISO } from "date-fns";
import { useAuthContext } from "../../context/AuthContext";

const LeaderboardContent = () => {
  const [scores15, setScores15] = useState([]);
  const [scores60, setScores60] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Ejecuta ambas solicitudes de manera paralela y actualiza los estados cuando ambas promesas se resuelvan.
    Promise.all([
      getLeaderboardScores("time 15"),
      getLeaderboardScores("time 60"),
    ])
      .then(([resultScores15, resultScores60]) => {
        setScores15(resultScores15);
        setScores60(resultScores60);
      })
      .catch((error) => console.error("Failed to fetch scores", error));
  }, []);

  const formatDate = (dateString) => {
    // Parse the date string into a Date object
    const date = parseISO(dateString);
    // Format the date as "dd MMMM yyyy"
    return format(date, "dd MMMM yyyy");
  };

  return (
    <div className="lb-container">
      <h2 className="lb-title">All-Time English Leaderboards</h2>

      <div className="scores-container">
        <div className="scores">
          <p className="scores-gamemode">Time 15</p>
          {/* A TABLE */}
          <table className="table">
            <thead>
              <tr className="tr">
                <th className="th-number">#</th>
                <th className="th-name">name</th>
                <th>wpm</th>
                <th>acc</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {scores15.map((score, index) => (
                // Map of the table rows
                <tr key={index}>
                  <td className="th-number">{index + 1}</td>
                  <td className="th-name">{score.username}</td>
                  <td>{score.wpm}</td>
                  <td>{score.accuracy}%</td>
                  <td>{formatDate(score.test_date)}</td>
                </tr>
              ))}

              {authUser && (
                <tr className="actual-user-score">
                  <td className="th-number">-</td>
                  <td className="th-name">{authUser.username}</td>
                  <td>20</td>
                  <td>80</td>
                  <td>Your date</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="scores">
          <p className="scores-gamemode">Time 60</p>
          <table className="table">
            <thead>
              <tr className="tr">
                <th className="th-number">#</th>
                <th className="th-name">name</th>
                <th>wpm</th>
                <th>acc</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {scores60.map((score, index) => (
                // Map of the table rows
                <tr key={index}>
                  <td className="th-number">{index + 1}</td>
                  <td className="th-name">{score.username}</td>
                  <td>{score.wpm}</td>
                  <td>{score.accuracy}%</td>
                  <td>{formatDate(score.test_date)}</td>
                </tr>
              ))}
              {authUser && (
                <tr className="actual-user-score">
                  <td className="th-number">-</td>
                  <td className="th-name">{authUser.username}</td>
                  <td>20</td>
                  <td>80</td>
                  <td>Your date</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardContent;
