import React, { useState } from "react";
import { positionScore } from "../../helpers/sumSeasonPoints";
import TrackData from "../../classes/TrackData";
import "./tracks.css";

interface Props {
  trackData: TrackData[];
}

const AllTime: React.FC<Props> = ({ trackData }) => {
  const [sortColumn, setSortColumn] = useState<string>("averagePosition");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSort = (column: string) => {
    setSortColumn(column);
    toggleSortOrder();
  };

  // Calculate the average position for each user
  const calculateAveragePosition = (userId: number): number => {
    const userData = trackData.filter((data) => data.users.id === userId && data.position !== 0);
    const sum = userData.reduce((acc, data) => acc + data.position, 0);
    //@ts-expect-error
    return (sum / userData.length).toFixed(1);
  };

  // Calculate the sum of positions for each user
  const calculateSumOfPositions = (userId: number): number => {
    const userData = trackData.filter((data) => data.users.id === userId);
    return userData.reduce(
      (acc, data) => acc + positionScore(data.position, data.fastest_lap, data.sprint),
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

  const uniqueUserIds = Array.from(
    new Set(trackData.map((data) => data.users.id))
  );

  let sortedUserIds: number[] = [];
  switch (sortColumn) {
    case "averagePosition":
      sortedUserIds = [...uniqueUserIds].sort(
        (a, b) => calculateAveragePosition(a) - calculateAveragePosition(b)
      );
      break;
    case "allTimePoints":
      sortedUserIds = [...uniqueUserIds].sort(
        (a, b) => calculateSumOfPositions(b) - calculateSumOfPositions(a)
      );
      break;
    case "dnfCount":
      sortedUserIds = [...uniqueUserIds].sort(
        (a, b) => calculateDNFCount(b) - calculateDNFCount(a)
      );
      break;
    case "polePositionCount":
      sortedUserIds = [...uniqueUserIds].sort(
        (a, b) => calculatePolePositionCount(b) - calculatePolePositionCount(a)
      );
      break;
    case "dotdCount":

    default:
      sortedUserIds = uniqueUserIds;
  }

  if (sortOrder === "desc") {
    sortedUserIds.reverse();
  }

  return (
    <div className="all-time-stats">
      <table className="container2 track-table">
        <thead>
          <tr>
            <th>User</th>
            <th onClick={() => handleSort("averagePosition")}>
              Avg. Position
            </th>
            <th onClick={() => handleSort("allTimePoints")}>
              All Time Points
            </th>
            <th onClick={() => handleSort("dnfCount")}>DNF Count</th>
            <th onClick={() => handleSort("polePositionCount")}>
              Pole Position Count
            </th>
            <th onClick={() => handleSort("dotdCount")}>DOTD Count</th>
          </tr>
        </thead>
        <tbody>
          {sortedUserIds.map((userId) => (
            <tr key={userId}>
              <td>{trackData.find((data) => data.users.id === userId)?.users.first_name} {trackData.find((data) => data.users.id === userId)?.users.last_name}</td>
              <td>{calculateAveragePosition(userId)}</td>
              <td>{calculateSumOfPositions(userId)}</td>
              <td>{calculateDNFCount(userId)}</td>
              <td>{calculatePolePositionCount(userId)}</td>
              <td>{calculateDOTDCount(userId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTime;