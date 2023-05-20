import { positionScore } from "../../helpers/sumSeasonPoints";

interface RaceData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  poll_position: boolean | null;
  race_distance: number;
  race_order: number;
  seasons: {
    id: number;
  };
  sprint: boolean;
  teams: {
    team_name: string;
  };
  tracks: {
    distance: number;
    img: string | null;
    layout: string | null;
    name: string;
  };
  users: {
    country_of_representation: string;
    first_name: string;
    human: boolean;
    id: number;
    initials: string;
    last_name: string;
    profile_image: string;
  };
}

interface SeasonRecordsProps {
  seasonData: RaceData[];
}

const SeasonRecords: React.FC<SeasonRecordsProps> = ({ seasonData }) => {
  // Calculate the sums for each category
  const fastestLapSums: { [key: string]: number } = {};
  const dnfSums: { [key: string]: number } = {};
  const dotdSums: { [key: string]: number } = {};
  const polePositionSums: { [key: string]: number } = {};

  seasonData.forEach((data) => {
    const { users, fastest_lap, dnf, dotd, poll_position } = data;
    const { first_name, last_name } = users;

    // Increment the count for each category
    const incrementCount = (category: { [key: string]: number }) => {
      if (category[`${first_name} ${last_name}`]) {
        category[`${first_name} ${last_name}`]++;
      } else {
        category[`${first_name} ${last_name}`] = 1;
      }
    };

    if (fastest_lap) {
      incrementCount(fastestLapSums);
    }

    if (dnf) {
      incrementCount(dnfSums);
    }

    if (dotd) {
      incrementCount(dotdSums);
    }

    if (poll_position) {
      incrementCount(polePositionSums);
    }
  });

  // Sorting function for descending order
  const descendingSort = ([, sum1]: [string, number], [, sum2]: [string, number]) =>
    sum2 - sum1;

  // Sort the sums in descending order
  const sortedFastestLapSums = Object.entries(fastestLapSums).sort(descendingSort);
  const sortedDnfSums = Object.entries(dnfSums).sort(descendingSort);
  const sortedDotdSums = Object.entries(dotdSums).sort(descendingSort);
  const sortedPolePositionSums = Object.entries(polePositionSums).sort(
    descendingSort
  );

  // Get the top 5 entries for each category
  const top5FastestLap = sortedFastestLapSums.slice(0, 5);
  const top5Dnf = sortedDnfSums.slice(0, 5);
  const top5Dotd = sortedDotdSums.slice(0, 5);
  const top5PolePosition = sortedPolePositionSums.slice(0, 5);

  const lowestPositionSums: { [key: string]: number } = {};
  const teamPositionSums: { [key: string]: number } = {};

  seasonData.forEach((data) => {
    const { users, position, fastest_lap, teams } = data;
    const { first_name, last_name } = users;
    const teamName = teams.team_name;

    const driverName = `${first_name} ${last_name}`;

    if (lowestPositionSums[driverName]) {
      lowestPositionSums[driverName] += positionScore(position, fastest_lap);
    } else {
      lowestPositionSums[driverName] = positionScore(position, fastest_lap);
    }

    if (teamPositionSums[teamName]) {
      teamPositionSums[teamName] += positionScore(position, fastest_lap);
    } else {
      teamPositionSums[teamName] = positionScore(position, fastest_lap);
    }
  });

  // Sort the lowest position sums in ascending order
  const sortedLowestPositionSums = Object.entries(lowestPositionSums).sort(
    ([, sum1], [, sum2]) => sum2 - sum1
  );

  // Sort the team position sums in descending order
  const sortedTeamPositionSums = Object.entries(teamPositionSums).sort(
    ([, sum1], [, sum2]) => sum2 - sum1
  );

  // Get the top 5 entries for lowest position sums
  const top5LowestPositionSums = sortedLowestPositionSums.slice(0, 20);

  // Get the top 5 entries for team position sums
  const top5TeamPositionSums = sortedTeamPositionSums.slice(0, 10);

  // Calculate the sum of drivers with the most race wins
  const winsSums: { [key: string]: number } = {};

  seasonData.forEach((data) => {
    const { users, position } = data;
    const { first_name, last_name } = users;

    if (position === 1) {
      const driverName = `${first_name} ${last_name}`;

      if (winsSums[driverName]) {
        winsSums[driverName]++;
      } else {
        winsSums[driverName] = 1;
      }
    }
  });

  // Sort the drivers with the most wins in descending order
  const sortedWinsSums = Object.entries(winsSums).sort(descendingSort);

  // Get the top 5 drivers with the most wins
  const top5WinsSums = sortedWinsSums.slice(0, 5);

  return (
    <div>
      {/* Render each category with the corresponding table */}
      <div>
        <h2>Top 5 Fastest Laps</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {top5FastestLap.map(([name, count]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Top 5 DNFs</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {top5Dnf.map(([name, count]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Top 5 Driver of the Day</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {top5Dotd.map(([name, count]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Top 5 Pole Positions</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {top5PolePosition.map(([name, count]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Top 5 Lowest Position Sums</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position Sum</th>
            </tr>
          </thead>
          <tbody>
            {top5LowestPositionSums.map(([name, positionSum]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{positionSum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Team Position Sums</h2>
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Position Sum</th>
            </tr>
          </thead>
          <tbody>
            {top5TeamPositionSums.map(([teamName, positionSum]) => (
              <tr key={teamName}>
                <td>{teamName}</td>
                <td>{positionSum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Top 5 Drivers with Most Race Wins</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {top5WinsSums.map(([name, wins]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeasonRecords;