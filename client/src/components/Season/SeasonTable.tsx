import { useParams } from 'react-router-dom';
import useGetSeason from '../../Hooks/useGetSeason';
import './season.css'

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
  pole_position: boolean;
};

const SeasonTable = () => {
  const { id } = useParams();
  const { seasonData = [] } = useGetSeason(id);

  if (!seasonData) return null;

  const rows: { name: string; cells: { initial: string; position: number, dnf: boolean, fastest_lap: boolean, pole_position: boolean, dotd: boolean }[] }[] = [];

  // Group the data by name and initials
  seasonData.forEach((data) => {
    const { name, initials, position, dnf, fastest_lap, pole_position, dotd } = data;

    const row = rows.find((r) => r.name === name);

    if (!row) {
      rows.push({
        name,
        cells: [{ initial: initials, position, dnf, fastest_lap, pole_position, dotd }],
      });
    } else {
      row.cells.push({ initial: initials, position, dnf, fastest_lap, pole_position, dotd });
    }
  });

  // Sort the rows by race_order
  rows.sort((a, b) => a.cells[0].position - b.cells[0].position);

  // Get the initials to use as column headers
  const initials = Array.from(new Set(seasonData.map((data) => data.initials)));

  // Calculate the average position for each column
  const avgPositions: { [initial: string]: number } = {};
  initials.forEach((initial) => {
    const positions = rows.flatMap((row) =>
      row.cells.filter((cell) => cell.initial === initial).map((cell) => cell.position)
    );
    const avgPosition = positions.reduce((sum, pos) => sum + pos, 0) / positions.length;
    avgPositions[initial] = avgPosition;
  });

  return (
    <table> 
      <thead>
        <tr className='season-table'>
          <th></th>
          {initials.map((initial) => (
            <th key={initial}>{initial}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr className='season-table' key={row.name}>
            <td>{row.name}</td>
            {initials.map((initial) => {
              const cell = row.cells.find((c) => c.initial === initial);
              const position = cell ? cell.position.toFixed(0) : '-';
              const classes: string[] = [];
              if (cell?.fastest_lap) classes.push('fastest-lap');
              if (cell?.pole_position) classes.push('pole-position');
              if (cell?.dnf) classes.push('dnf');
              if (cell?.dotd) classes.push('dotd');

              return (
                <td key={initial} className={classes.join(' ')}>
                  {position}
                </td>
              );
            })}
          </tr>
        ))}
        <tr>
          <td>Average Finish Position</td>
          {initials.map((initial) => {
            const avgPosition = avgPositions[initial];
            return (
              <td key={initial}>
                {avgPosition ? avgPosition.toFixed(1) : '-'}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default SeasonTable;