import { positionScore } from "../../helpers/sumSeasonPoints";

    //@ts-expect-error

const AllTime: React.FC<Props> = ({ trackData }) => {
  // Calculate the average position for each user
  const calculateAveragePosition = (userId: number): number => {
    //@ts-expect-error
    const userData = trackData.filter((data) => data.users.id === userId);
    //@ts-expect-error
    const sum = userData.reduce((acc, data) => acc + data.position, 0);
    return sum / userData.length;
  };

  // Calculate the sum of positions for each user
  const calculateSumOfPositions = (userId: number): number => {
    //@ts-expect-error
    const userData = trackData.filter((data) => data.users.id === userId);
    //@ts-expect-error
    return userData.reduce((acc, data) => acc + positionScore(data.position, data.fastest_lap), 0);
  };

  // Extract unique user IDs
    //@ts-expect-error

  const uniqueUserIds = Array.from(new Set(trackData.map((data) => data.users.id)));

  // Sort the user IDs by average position in ascending order for the first table
    //@ts-expect-error

  const sortedUserIdsAverage = uniqueUserIds.sort((a, b) => calculateAveragePosition(a) - calculateAveragePosition(b));

  // Sort the user IDs by sum of positions in ascending order for the second table
    //@ts-expect-error

  const sortedUserIdsSum = uniqueUserIds.sort((a, b) => calculateSumOfPositions(a) - calculateSumOfPositions(b));

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
    //@ts-expect-error
            const userData = trackData.find((data) => data.users.id === userId);
            if (userData) {
              return (
                //@ts-expect-error
                
                <tr key={userId}>
                  <td>{userData.users.first_name} {userData.users.last_name}</td>
                  {/*// @ts-ignore */}
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
            //@ts-expect-error
            const userData = trackData.find((data) => data.users.id === userId);
            if (userData) {
              return (
                //@ts-expect-error
                <tr key={userId}>
                  <td>{userData.users.first_name} {userData.users.last_name}</td>
                  {/*// @ts-ignore */}
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

