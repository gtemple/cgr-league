import { positionScore } from "../../helpers/sumSeasonPoints";

interface TrackData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  race_distance: number;
  race_order: number;
  seasons: { id: number; game: string};
  pole_position: boolean | undefined;
  sprint: boolean;
  teams: { team_name: string };
  tracks: { distance: number; img: null; layout: null; name: string };
  users: {
    country_of_representation: string;
    first_name: string;
    human: true;
    id: number;
    initials: string;
    last_name: string;
    profile_image: string;
  };
}

interface Props {
  trackData: TrackData[]
}


const AllTime: React.FC<Props> = ({ trackData }) => {
  // Calculate the average position for each user
  const calculateAveragePosition = (userId: number): number => {
    const userData = trackData.filter((data) => data.users.id === userId);
    const sum = userData.reduce((acc, data) => acc + data.position, 0);
    return sum / userData.length;
  };

  // Calculate the sum of positions for each user
  const calculateSumOfPositions = (userId: number): number => {
    const userData = trackData.filter((data) => data.users.id === userId);
    return userData.reduce((acc, data) => acc + positionScore(data.position, data.fastest_lap), 0);
  };

  // Extract unique user IDs
  const uniqueUserIds = Array.from(new Set(trackData.map((data) => data.users.id)));

  // Sort the user IDs by average position in ascending order for the first table
  const sortedUserIdsAverage = uniqueUserIds.sort((a, b) => calculateAveragePosition(a) - calculateAveragePosition(b));

  // Sort the user IDs by sum of positions in ascending order for the second table
  const sortedUserIdsSum = uniqueUserIds.sort((a, b) => calculateSumOfPositions(b) - calculateSumOfPositions(a));

  // Get the first 10 user IDs for each table
  const first10UserIdsAverage = sortedUserIdsAverage.slice(0, 10);
  const first10UserIdsSum = sortedUserIdsSum.slice(0, 10);

  return (
    <div>
      <h2>Average Position</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Average Position</th>
          </tr>
        </thead>
        <tbody>
          {first10UserIdsAverage.map((userId) => {
            const userData = trackData.find((data) => data.users.id === userId);
            if (userData) {
              return (
                <tr key={userId}>
                  <td>{userData.users.first_name} {userData.users.last_name}</td>
                  <td>{calculateAveragePosition(userId).toFixed(1)}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <h2>Sum of Positions</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sum of Positions</th>
          </tr>
        </thead>
        <tbody>
          {first10UserIdsSum.map((userId) => {
            const userData = trackData.find((data) => data.users.id === userId);
            if (userData) {
              return (
                <tr key={userId}>
                  <td>{userData.users.first_name} {userData.users.last_name}</td>
                  <td>{calculateSumOfPositions(userId)}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllTime;

