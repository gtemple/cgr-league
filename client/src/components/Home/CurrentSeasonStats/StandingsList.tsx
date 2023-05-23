import * as _ from "../../../helpers/sumSeasonPoints";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';

import '../home.css';

type ScoreTuple = [number, string, string];
//@ts-expect-error

const StandingsList = (props: { seasonData: ObjectType }) => {
  const [showTopRows, setShowTopRows] = useState(true);
//@ts-expect-error
  const results = (results: ObjectType) => {
    const totalInfo = _.totalSeasonScore(results);
    const totalInfoArray: ScoreTuple[] = [];

    for (let i in totalInfo) {
      totalInfoArray.push([
        totalInfo[i].totalPoints,
        i,
        [totalInfo[i].first_name, totalInfo[i].last_name].join(' '),
      ]);
    }

    const sortedScores = totalInfoArray.sort(
      (a: ScoreTuple, b: ScoreTuple) => b[0] - a[0]
    );

    let displayedScores: ScoreTuple[];
    if (showTopRows) {
      displayedScores = sortedScores.slice(0, 10);
    } else {
      displayedScores = sortedScores.slice(-10);
    }

    return displayedScores.map((score, index) => {
      const position = showTopRows
        ? index + 1
        : sortedScores.length - 10 + index + 1;

      return (
        <tr className="standings-cell" key={score[1]}>
          <th>{position}</th>
          <th>
            <Link to={`/drivers/${score[1]}`}>{score[2]}</Link>
          </th>
          <th>{score[0]}</th>
        </tr>
      );
    });
  };

  const toggleShowTopRows = () => {
    setShowTopRows((prevState) => !prevState);
  };

  return (
    <div>
      <div className="container">
        <table className="standings">
          <tbody>{props.seasonData && results(props.seasonData)}</tbody>
        </table>
        <button className="show-rows" onClick={toggleShowTopRows}>
          {showTopRows ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}
        </button>
      </div>
    </div>
  );
};

export default StandingsList;