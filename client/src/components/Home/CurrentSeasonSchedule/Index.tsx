import { useEffect, useState } from 'react';
import useGetImage from '../../../Hooks/useGetImage';

type IRaceOrder = {
  previousRace5: { name: string | null; position: { [key: number]: string } };
  previousRace4: { name: string | null; position: { [key: number]: string } };
  previousRace3: { name: string | null; position: { [key: number]: string } };
  previousRace2: { name: string | null; position: { [key: number]: string } };
  previousRace: {
    name: string | null;
    img: string | null;
    layout: string | null;
    position: { [key: number]: string };
  };
  currentRace: string | null;
  nextRace: string | null;
};

function createRaceOrder(data: any[]): IRaceOrder {
  let firstRace = 0;
  const raceData: IRaceOrder = {
    previousRace5: { name: null, position: {} },
    previousRace4: { name: null, position: {} },
    previousRace3: { name: null, position: {} },
    previousRace2: { name: null, position: {} },
    previousRace: { name: null, img: null, layout: null, position: {} },
    currentRace: null,
    nextRace: null,
  };

  data.forEach((result) => {
    if (result.race_order >= firstRace && result.position !== 0) {
      firstRace = result.race_order;
      const { tracks, users, position, sprint } = result;
      raceData.previousRace.name = sprint ? 'Sprint: ' + tracks.name: tracks.name;
      raceData.previousRace.layout = tracks.layout;
      raceData.previousRace.img = tracks.img;
      raceData.previousRace.position[position] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace - 4 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace5.name = sprint ? 'Sprint: ' + tracks.name: tracks.name;
      raceData.previousRace5.position[position] = `${users.first_name[0]}. ${users.last_name}`;
    }
    if (result.race_order === firstRace - 3 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace4.name = sprint ? 'Sprint: ' + tracks.name: tracks.name;
      raceData.previousRace4.position[position] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace - 2 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace3.name = sprint ? 'Sprint: ' + tracks.name: tracks.name;
      raceData.previousRace3.position[position] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace - 1 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace2.name = sprint ? 'Sprint: ' + tracks.name: tracks.name;
      raceData.previousRace2.position[position] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace + 1 && result.position === 0) {
      const { tracks, sprint } = result;
      raceData.currentRace = sprint ? 'Sprint: ' + tracks.name: tracks.name;
    }

    if (result.race_order === firstRace + 2 && result.position === 0) {
      const { tracks, sprint } = result;
      raceData.nextRace = sprint ? 'Sprint: ' + tracks.name: tracks.name;
    }
  });

  return raceData;
}

const printGridCells = (raceOrder: IRaceOrder, start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const position = i + start;
    return (
      <div className="grid-cell" key={position}>
        <div className="grid-position">{position}</div>
        <div className="grid-name">{raceOrder.previousRace.position[position]}</div>
      </div>
    );
  });
};

const CurrentSeasonSchedule = (props: { seasonData: any[]; currentSeason: number }) => {
  //@ts-expect-error
  const [raceOrder, setRaceOrder] = useState<IRaceOrder>({});
  //@ts-expect-error
  const { img, loading } = useGetImage(raceOrder?.previousRace?.img, 'track-image' || '');

  useEffect(() => {
    if (props.seasonData) {
      const newRaceOrder = createRaceOrder(props.seasonData);
      setRaceOrder(newRaceOrder);
    }
  }, [props.seasonData]);

  return (
    <div className='current-season'>
      {Object.keys(raceOrder).length !== 0 && (
        <>
        <div className="schedule">
          <div className="previous-race">
            <div className="track-info">
              <div>Last Race</div>
              {loading ? (
                <div>Loading image...</div>
              ) : (
                <>
                  <div className="track-name">{raceOrder.previousRace.name} </div>
                  <img src={img} className="track-image" alt="Track Image" />
                </>
              )}
            </div>
            <div className="remaining-grid">{printGridCells(raceOrder, 1, 20)}</div>
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default CurrentSeasonSchedule;