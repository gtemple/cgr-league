import React from 'react';

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

    if (fastest_lap) {
      if (fastestLapSums[`${first_name} ${last_name}`]) {
        fastestLapSums[`${first_name} ${last_name}`]++;
      } else {
        fastestLapSums[`${first_name} ${last_name}`] = 1;
      }
    }

    if (dnf) {
      if (dnfSums[`${first_name} ${last_name}`]) {
        dnfSums[`${first_name} ${last_name}`]++;
      } else {
        dnfSums[`${first_name} ${last_name}`] = 1;
      }
    }

    if (dotd) {
      if (dotdSums[`${first_name} ${last_name}`]) {
        dotdSums[`${first_name} ${last_name}`]++;
      } else {
        dotdSums[`${first_name} ${last_name}`] = 1;
      }
    }

    if (poll_position) {
      if (polePositionSums[`${first_name} ${last_name}`]) {
        polePositionSums[`${first_name} ${last_name}`]++;
      } else {
        polePositionSums[`${first_name} ${last_name}`] = 1;
      }
    }
  });

  // Sort the sums in descending order
  const sortedFastestLapSums = Object.entries(fastestLapSums).sort(
    ([, sum1], [, sum2]) => sum2 - sum1
  );
  const sortedDnfSums = Object.entries(dnfSums).sort(
    ([, sum1], [, sum2]) => sum2 - sum1
  );
  const sortedDotdSums = Object.entries(dotdSums).sort(
    ([, sum1], [, sum2]) => sum2 - sum1
  );
  const sortedPolePositionSums = Object.entries(polePositionSums).sort(
    ([, sum1], [, sum2]) => sum2 - sum1
  );

  // Get the top 5 entries for each category
  const top5FastestLap = sortedFastestLapSums.slice(0, 5);
  const top5Dnf = sortedDnfSums.slice(0, 5);
  const top5Dotd = sortedDotdSums.slice(0, 5);
  const top5PolePosition = sortedPolePositionSums.slice(0, 5);

  return (
    <div>
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
    </div>
  );
};

export default SeasonRecords;
