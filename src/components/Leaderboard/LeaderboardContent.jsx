import { useEffect, useState } from "react";
import "./../styles/Leaderboard.css";
import {
  getLeaderboardScores,
  getUserTopScore,
} from "../../utils/serverFunctions";
import { format, parseISO } from "date-fns";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../Loader";

const LeaderboardContent = () => {
  const [scores15, setScores15] = useState([]);
  const [scores60, setScores60] = useState([]);
  const [isLoadingScores, setIsLoadingScores] = useState(true);

  const [userTopScore15, setUserTopScore15] = useState(null);
  const [userTopScore60, setUserTopScore60] = useState(null);
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
        setIsLoadingScores(false);
      })
      .catch((error) => console.error("Failed to fetch scores", error));

    // If the user is authenticated, fetch the user's top scores
    Promise.all([getUserTopScore("time 15"), getUserTopScore("time 60")])
      .then(([resultUserTopScore15, resultUserTopScore60]) => {
        setUserTopScore15(resultUserTopScore15);
        setUserTopScore60(resultUserTopScore60);
      })
      .catch((error) =>
        console.error("Failed to fetch user top scores", error)
      );

    console.log(userTopScore15, userTopScore60);
    console.log(authUser);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Date unavailable"; // or return ""; for an empty string
    }

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
          <p className="scores-gamemode">
            Time 15
            {isLoadingScores && <Loader />}
          </p>
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
                <>
                  {userTopScore15?.message ? (
                    <tr className="actual-user-score">
                      <td colSpan={5} className="not-qualified">
                        Not qualified
                      </td>
                    </tr>
                  ) : (
                    <tr className="actual-user-score">
                      <td className="th-number">{userTopScore15?.position}</td>
                      <td className="th-name">You</td>
                      <td>{userTopScore15?.wpm}</td>
                      <td>{userTopScore15?.accuracy}%</td>
                      <td>{formatDate(userTopScore15?.test_date)}</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="scores">
          <p className="scores-gamemode">
            Time 60
            {isLoadingScores && <Loader />}
          </p>
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
                <>
                  {userTopScore60?.message ? (
                    <tr className="actual-user-score">
                      <td colSpan={5} className="not-qualified">
                        Not qualified
                      </td>
                    </tr>
                  ) : (
                    <tr className="actual-user-score">
                      <td className="th-number">{userTopScore60?.position}</td>
                      <td className="th-name">You</td>
                      <td>{userTopScore60?.wpm}</td>
                      <td>{userTopScore60?.accuracy}%</td>
                      <td>{formatDate(userTopScore60?.test_date)}</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardContent;
