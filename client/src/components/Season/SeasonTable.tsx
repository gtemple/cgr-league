import { useParams } from 'react-router-dom';
import useGetSeason from '../../Hooks/useGetSeason';
import './season.css';


const SeasonTable = () => {
  const { id } = useParams();
  const { seasonData = [] } = useGetSeason(id);

  if (!seasonData) return null;

  const rows: { name: string; cells: { initial: string; position: number; fastest_lap: boolean; dnf: boolean; dotd: boolean }[] }[] = [];

  // Group the data by name and initials
  seasonData.forEach((data) => {
    const name = data.tracks.name;
    const initials = data.users.initials;
    const { position, fastest_lap, dnf, dotd } = data;

    let row = rows.find((r) => r.name === name);

    if (!row) {
      row = { name, cells: [] };
      rows.push(row);
    }

    row.cells.push({ initial: initials, position, fastest_lap, dnf, dotd });
  });

  // Sort the rows by race_order
  rows.sort((a, b) => {
    const raceOrderA = a.cells[0].position;
    const raceOrderB = b.cells[0].position;
    return raceOrderA - raceOrderB;
  });

  // Get the initials to use as column headers
  const initials = Array.from(new Set(seasonData.map((data) => data.users.initials)));

  // Calculate the average position for each column
  const avgPositions: { [initial: string]: number } = {};
  initials.forEach((initial) => {
    const positions = rows.flatMap((row) =>
      row.cells
        .filter((cell) => cell.initial === initial)
        .map((cell) => cell.position)
    );
    const avgPosition =
      positions.reduce((sum, pos) => sum + pos, 0) / positions.length;
    avgPositions[initial] = avgPosition;
  });

  return (
    <table>
      <thead>
        <tr className="season-table">
          <th></th>
          {initials.map((initial) => (
            <th key={initial}>{initial}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr className="season-table" key={row.name}>
            <td>{row.name}</td>
            {initials.map((initial) => {
              const cell = row.cells.find((c) => c.initial === initial);
              const position = cell ? cell.position.toFixed(0) : '-';
              const classes: string[] = [];
              if (cell?.fastest_lap) classes.push('fastest-lap');
              if (cell?.dotd) classes.push('dotd');
              if (cell?.dnf) classes.push('dnf');



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
};

export default SeasonTable;