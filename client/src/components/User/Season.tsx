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

    return races.map((race: RaceResults) => {
      if (race.season_id === id) {
        return (
        <tr key={race.id}>
          <th>{race.name}</th>
          <th>
            <div>
              {race.position}
              {race.fastest_lap && (
              <div>
                Yes its fastest
              </div>
            )}
            {race.dnf && (
              <div>
                Yes its DNF
              </div>
            )}
            </div>

          </th>
        </tr>
        )
      }
    })
  
  }

  return (

    <div>
      {userData && (
        <div>
          Season {id}
          <table>
            <tbody>
              {printSeason(userData)}
            </tbody>
          </table>
        </div>
        )}
    </div>
  )
}

export default Season