import useGetUserRaces from "../../Hooks/useGetUserRaces";
import RaceResults from "../../classes/RaceResults";

interface Props {
  id: number;
  userId: string | undefined;
}

const Season = (props: Props) => {
  const { id, userId } = props;
  const { userData } = useGetUserRaces(userId);

  const printSeason = (races: Array<RaceResults>) => {
    const filteredRaces = races.filter((race: RaceResults) => race.seasons.id === id);
    if (userData && userData.length > 0 && filteredRaces.length > 0) {
      return (
        <div>
          <div>Season {id}</div>
          <table className="container2">
            <tbody>
              <tr>
                <th>Track</th>
                <th>Position</th>
              </tr>
              {filteredRaces.map((race: RaceResults) => (
                <tr key={race.id}>
                  <td>{race.sprint ? 'Sprint: ' : null} {race.tracks.name}</td>
                  <td>
                    <div>
                      {race.position ? race.position : '-'}
                      {race.fastest_lap && <div>Yes, it's the fastest lap</div>}
                      {race.dnf && <div>Yes, it's a DNF</div>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  };

  const seasonContent = printSeason(userData);
  return seasonContent ? <div>{seasonContent}</div> : null;
};

export default Season;