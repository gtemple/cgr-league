import { useParams } from 'react-router-dom';
import useGetSeason from '../../Hooks/useGetSeason';

type SeasonData = {
  user_id: number;
  human: boolean;
  first_name: string;
  last_name: string;
  initials: string;
  profile_image: null;
  id: number;
  dnf: boolean;
  fastest_lap: boolean;
  sprint: boolean;
  position: number;
  dotd: boolean;
  race_order: number;
  created_at: string;
  team_name: string;
  name: string;
  game: string;
  season_id: number;
};

const SeasonTable = () => {
  const { id } = useParams();
  const { seasonData } = useGetSeason(id);

  if (!seasonData) return null;

  const rows: { name: string; cells: { initial: string; position: number }[] }[] = [];

  // Group the data by name and initials
  seasonData.forEach((data) => {
    const { name, initials, position } = data;

    const row = rows.find((r) => r.name === name);

    if (!row) {
      rows.push({
        name,
        cells: [{ initial: initials, position }],
      });
    } else {
      row.cells.push({ initial: initials, position });
    }
  });

  // Sort the rows by race_order
  rows.sort((a, b) => {
    const aRaceOrder = a.cells[0].position;
    const bRaceOrder = b.cells[0].position;
    return bRaceOrder - aRaceOrder;
  });

  // Get the initials to use as column headers
  const initials = Array.from(new Set(seasonData.map((data) => data.initials)));

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {initials.map((initial) => (
            <th key={initial}>{initial}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            {initials.map((initial) => {
              const cell = row.cells.find((c) => c.initial === initial);
              const position = cell ? cell.position : '-';
              return <td key={initial}>{position}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SeasonTable;