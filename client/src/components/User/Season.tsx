import { useEffect } from "react";

import useGetUserRaces from "../../Hooks/useGetUserRaces"
import RaceResults from "../../classes/RaceResults";

interface Props {
  'id': number,
  'userId': string | undefined
}
const Season = (props: Props) => {
  const { id, userId } = props;
  const { userData } = useGetUserRaces(userId);

  const printSeason = (races: Array<RaceResults>) => {
    if (userData && userData.length > 0) {
      return (
        <div>
          <table className="container2">
            <tbody>
              {races.map((race: RaceResults) => {
                if (race.seasons.id === id) {
                  return (
                    <tr key={race.id}>
                      <th>{race.tracks.name}</th>
                      <th>
                        <div>
                          {race.position}
                          {race.fastest_lap && (
                            <div>Yes, it's the fastest lap</div>
                          )}
                          {race.dnf && (
                            <div>Yes, it's a DNF</div>
                          )}
                        </div>
                      </th>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  };

  return <div>{printSeason(userData)}</div>;
};

export default Season;