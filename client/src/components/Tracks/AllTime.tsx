import { positionScore } from "../../helpers/sumSeasonPoints";
import TrackData from "../../classes/TrackData";

import './tracks.css'

interface Props {
  trackData: TrackData[];
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
    return userData.reduce(
      (acc, data) => acc + positionScore(data.position, data.fastest_lap),
      0
    );
  };

  // Calculate the count of DNF for each user
  const calculateDNFCount = (userId: number): number => {
    const userData = trackData.filter((data) => data.users.id === userId);
    return userData.reduce((acc, data) => acc + (data.dnf ? 1 : 0), 0);
  };

  // Calculate the count of Pole Position for each user
  const calculatePolePositionCount = (userId: number): number => {
    const userData = trackData.filter((data) => data.users.id === userId);
    return userData.reduce((acc, data) => acc + (data.pole_position ? 1 : 0), 0);
  };

  // Calculate the count of DOTD for each user
  const calculateDOTDCount = (userId: number): number => {
    const userData = trackData.filter((data) => data.users.id === userId);
    return userData.reduce((acc, data) => acc + (data.dotd ? 1 : 0), 0);
  };

  // Extract unique user IDs
  const uniqueUserIds = Array.from(
    new Set(trackData.map((data) => data.users.id))
  );

// Sort the user IDs by average position in ascending order for the first table
const sortedUserIdsAverage = [...uniqueUserIds].sort(
  (a, b) => calculateAveragePosition(a) - calculateAveragePosition(b)
);

// Sort the user IDs by sum of positions in ascending order for the second table
const sortedUserIdsSum = [...uniqueUserIds].sort(
  (a, b) => calculateSumOfPositions(b) - calculateSumOfPositions(a)
);

// Sort the user IDs by DNF count in descending order for the third table
const sortedUserIdsDNF = [...uniqueUserIds].sort(
  (a, b) => calculateDNFCount(b) - calculateDNFCount(a)
);

// Sort the user IDs by Pole Position count in descending order for the fourth table
const sortedUserIdsPolePosition = [...uniqueUserIds].sort(
  (a, b) => calculatePolePositionCount(b) - calculatePolePositionCount(a)
);

// Sort the user IDs by DOTD count in descending order for the fifth table
const sortedUserIdsDOTD = [...uniqueUserIds].sort(
  (a, b) => calculateDOTDCount(b) - calculateDOTDCount(a)
);

  // Get the first 10 user IDs for each table
  const first10UserIdsAverage = sortedUserIdsAverage.slice(0, 10);
  const first10UserIdsSum = sortedUserIdsSum.slice(0, 10);
  const first10UserIdsDNF = sortedUserIdsDNF.slice(0, 5);
  const first10UserIdsPolePosition = sortedUserIdsPolePosition.slice(0, 5);
  const first10UserIdsDOTD = sortedUserIdsDOTD.slice(0, 5);

  return (
    <div className='all-time-stats'>
      <div>
        <h2>Best Average Position</h2>
        <table className='container2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Average Position</th>
            </tr>
          </thead>
          <tbody>
            {first10UserIdsAverage.map((userId) => {
              const userData = trackData.find(
                (data) => data.users.id === userId
              );
              if (userData) {
                return (
                  <tr key={userId}>
                    <td>
                      {userData.users.first_name} {userData.users.last_name}
                    </td>
                    <td>{calculateAveragePosition(userId).toFixed(1)}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
       </div>
      
      <div>
        <h2>All-time points</h2>
        <table className='container2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {first10UserIdsSum.map((userId) => {
              const userData = trackData.find(
                (data) => data.users.id === userId
              );
              if (userData) {
                return (
                  <tr key={userId}>
                    <td>
                      {userData.users.first_name} {userData.users.last_name}
                    </td>
                    <td>{calculateSumOfPositions(userId)}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h2>DNF</h2>
        <table className='container2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>DNF Count</th>
            </tr>
          </thead>
          <tbody>
            {first10UserIdsDNF.map((userId) => {
              const userData = trackData.find(
                (data) => data.users.id === userId
              );
              if (userData) {
                return (
                  <tr key={userId}>
                    <td>
                      {userData.users.first_name} {userData.users.last_name}
                    </td>
                    <td>{calculateDNFCount(userId)}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Pole Position</h2>
        <table className='container2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Pole Position Count</th>
            </tr>
          </thead>
          <tbody>
            {first10UserIdsPolePosition.map((userId) => {
              const userData = trackData.find(
                (data) => data.users.id === userId
              );
              if (userData) {
                return (
                  <tr key={userId}>
                    <td>
                      {userData.users.first_name} {userData.users.last_name}
                    </td>
                    <td>{calculatePolePositionCount(userId)}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
       </div>

      <div>
      <h2>Driver of the Days</h2>
      <table className='container2'>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOTD Count</th>
          </tr>
        </thead>
        <tbody>
          {first10UserIdsDOTD.map((userId) => {
            const userData = trackData.find(
              (data) => data.users.id === userId
            );
            if (userData) {
              return (
                <tr key={userId}>
                  <td>
                    {userData.users.first_name} {userData.users.last_name}
                  </td>
                  <td>{calculateDOTDCount(userId)}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllTime;