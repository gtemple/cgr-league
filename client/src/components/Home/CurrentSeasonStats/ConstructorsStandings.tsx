import * as _ from "../../../helpers/sumSeasonPoints";
import "../home.css";

//@ts-expect-error
const ConstructorsStandings = (props: { seasonData: ObjectType }) => {
    //@ts-expect-error
  const results = (results: ObjectType) => {
    const totalInfo = _.totalConstructorScore(results);
    const infoArray = Object.keys(totalInfo)
      //@ts-expect-error
      .sort((teamA, teamB) => totalInfo[teamB] - totalInfo[teamA]); // sort by total points in descending order
    let position = 0;
    return infoArray.map((team, index) =>{
      position++
      return (
        <tr key={index}>
          <td>{position}</td>
          <td>{team}</td>
          <td>{(
            //@ts-expect-error
            totalInfo[team]
            )}</td>
        </tr>
      )
    })
  };

  return (
    <div>
      <table className="container2 standings">
        <tbody>
          {props.seasonData && results(props.seasonData)}
        </tbody>
      </table>
    </div>
  );
};

export default ConstructorsStandings;