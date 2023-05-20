import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Card, Table } from 'react-bootstrap';

import useGetSeason from '../../Hooks/useGetSeason';

import './season.css';

interface Cell {
  initial: string;
  position: number;
  race_order: number;
  fastest_lap: boolean;
  dnf: boolean;
  dotd: boolean;
}

interface Row {
  name: string;
  cells: Cell[];
}

const SeasonTable = () => {
  const { id } = useParams();
  const { seasonData = [] } = useGetSeason(id);
  const [isViewportLessThan768, setIsViewportLessThan768] = useState(
    window.innerWidth < 800
  );

  if (!seasonData) return null;

  // Group the data by name and initials
  const rows: Row[] = [];
  seasonData.forEach((data) => {
    const name = data.tracks.name;
    const initials = data.users.initials;
    const { position, fastest_lap, dnf, dotd, race_order } = data;

    let row = rows.find((r) => r.name === name);
    if (!row) {
      row = { name, cells: [] };
      rows.push(row);
    }

    const cell = row.cells.find((c) => c.initial === initials);
    if (!cell) {
      row.cells.push({ initial: initials, position, race_order, fastest_lap, dnf, dotd });
    }
  });

  if (isViewportLessThan768) {
    // Sort the rows by position in ascending order for accordion mode
    rows.sort((a, b) => a.cells[0].position - b.cells[0].position);
  } else {
    // Sort the rows by race_order for regular table mode
    rows.sort((a, b) => a.cells[0].race_order - b.cells[0].race_order);
  }

  // Get the initials to use as column headers
  const initials = Array.from(
    new Set(seasonData.map((data) => data.users.initials))
  );

  // Calculate the average position for each column
  const avgPositions: { [initial: string]: number } = {};
  initials.forEach((initial) => {
    const positions = rows
      .flatMap((row) =>
        row.cells
          .filter((cell) => cell.initial === initial)
          .map((cell) => cell.position)
      )
      .filter((pos) => !isNaN(pos));
    const avgPosition =
      positions.reduce((sum, pos) => sum + pos, 0) / positions.length;
    avgPositions[initial] = avgPosition;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsViewportLessThan768(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isViewportLessThan768 ? (
        // Render accordion if viewport width is less than 768px
        <Accordion>
          {rows.map((row, index) => (
            <Accordion.Item key={index} eventKey={String(index)}>
              <Accordion.Header>{row.name}</Accordion.Header>
              <Accordion.Body>
                <Table>
                  <thead>
                    <tr className="season-table">
                      <th>Name</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.cells.map((cell, index) => (
                      <tr
                        key={index}
                        className={`${cell.dnf ? 'dnf' : ''} ${
                          cell.dotd ? 'dotd' : ''
                        }`}
                      >
                        <td>{cell.initial}</td>
                        <td>{cell.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        // Render regular table if viewport width is greater than or equal to 768px
        <table className="season-table">
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
      )}
    </div>
  );
};

export default SeasonTable;