import { useParams } from 'react-router-dom';
import useGetSeason from '../../Hooks/useGetSeason';
import './season.css';


const SeasonTable = () => {
  const { id } = useParams();
  const { seasonData = [] } = useGetSeason(id);
  if (!seasonData) return null;

  const rows: { name: string; cells: { initial: string; position: number }[] }[] = [];

  // Group the data by name and initials
  seasonData.forEach((data) => {
    const name = data.tracks.name;
    const initials = data.users.initials;
    const { position } = data;

    let row = rows.find((r) => r.name === name);

    if (!row) {
      row = { name, cells: [] };
      rows.push(row);
    }

    row.cells.push({ initial: initials, position });
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
              return <td key={initial}>{position}</td>;
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