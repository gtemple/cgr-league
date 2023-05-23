import { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { positionScore } from "../../helpers/sumSeasonPoints";

interface RaceData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  pole_position: boolean | null;
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
  const [sortColumn, setSortColumn] = useState<string>(""); // State to track the sorted column
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // State to track the sort direction

  // Calculate the sums for each category
  const userStats: {
    [key: string]: {
      points: number;
      fastestLap: number;
      dotd: number;
      dnf: number;
      polePosition: number;
    };
  } = {};

  seasonData.forEach((data) => {
    const {
      users,
      position,
      fastest_lap,
      dnf,
      dotd,
      pole_position,
    } = data;
    const { first_name, last_name } = users;
    const driverName = `${first_name} ${last_name}`;

    if (!userStats[driverName]) {
      userStats[driverName] = {
        points: positionScore(position, fastest_lap),
        fastestLap: fastest_lap ? 1 : 0,
        dotd: dotd ? 1 : 0,
        dnf: dnf ? 1 : 0,
        polePosition: pole_position ? 1 : 0,
      };
    } else {
      userStats[driverName].points += positionScore(position, fastest_lap);
      userStats[driverName].fastestLap += fastest_lap ? 1 : 0;
      userStats[driverName].dotd += dotd ? 1 : 0;
      userStats[driverName].dnf += dnf ? 1 : 0;
      userStats[driverName].polePosition += pole_position ? 1 : 0;
    }
  });

  // Sort the user stats by the selected column
  const sortedUserStats = Object.entries(userStats).sort(
    ([name1, stats1], [name2, stats2]) => {
      let comparison = 0;

      if (sortColumn === "points") {
        comparison = stats2.points - stats1.points;
      } else if (sortColumn === "fastestLap") {
        comparison = stats2.fastestLap - stats1.fastestLap;
      } else if (sortColumn === "dotd") {
        comparison = stats2.dotd - stats1.dotd;
      } else if (sortColumn === "dnf") {
        comparison = stats2.dnf - stats1.dnf;
      } else if (sortColumn === "polePosition") {
        comparison = stats2.polePosition - stats1.polePosition;
      }

      // Adjust the comparison based on sort direction
      if (sortDirection === "desc") {
        comparison *= -1;
      }

      return comparison;
    }
  );

  // Function to handle column header click and toggle sort direction
  const handleColumnHeaderClick = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Function to render the arrow icon based on sort direction
  const renderSortArrow = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        return <BsFillCaretDownFill />;

      } else {
        return <BsFillCaretUpFill />;
      }
    }
    return null;
  };

  return (
    <div className="season-records">
      <div>
        <h2 className="season-records-title">Season Records</h2>
        <table className="container2" style={{ width: "70vw" }}>
          <thead>
            <tr>
              <th onClick={() => handleColumnHeaderClick("name")}>
                Name {renderSortArrow("name")}
              </th>
              <th onClick={() => handleColumnHeaderClick("points")}>
                Total Points {renderSortArrow("points")}
              </th>
              <th onClick={() => handleColumnHeaderClick("fastestLap")}>
                Fastest Laps {renderSortArrow("fastestLap")}
              </th>
              <th onClick={() => handleColumnHeaderClick("dotd")}>
                Driver of the Day {renderSortArrow("dotd")}
              </th>
              <th onClick={() => handleColumnHeaderClick("dnf")}>
                DNFs* {renderSortArrow("dnf")}
              </th>
              <th onClick={() => handleColumnHeaderClick("polePosition")}>
                Pole Positions** {renderSortArrow("polePosition")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUserStats.map(([name, stats]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{stats.points}</td>
                <td>{stats.fastestLap}</td>
                <td>{stats.dotd}</td>
                <td>{stats.dnf}</td>
                <td>{stats.polePosition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{color: 'yellow'}}>*Tracked as of Season 5</div>
        <div style={{color: 'yellow'}}>**Tracked as of Season 3</div>
      </div>
    </div>
  );
};

export default SeasonRecords;