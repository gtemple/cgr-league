import { useEffect, useState } from "react";
import convertTeam from "../../../helpers/convertTeam";
import { positionColor } from "../../../helpers/positionColor";
import './styles.css'

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
      raceData.previousRace.name = sprint
        ? "Sprint: " + tracks.name
        : tracks.name;
      raceData.previousRace.layout = tracks.layout;
      raceData.previousRace.img = tracks.img;
      raceData.previousRace.position[
        position
      ] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace - 4 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace5.name = sprint
        ? "Sprint: " + tracks.name
        : tracks.name;
      raceData.previousRace5.position[
        position
      ] = `${users.first_name[0]}. ${users.last_name}`;
    }
    if (result.race_order === firstRace - 3 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace4.name = sprint
        ? "Sprint: " + tracks.name
        : tracks.name;
      raceData.previousRace4.position[
        position
      ] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace - 2 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace3.name = sprint
        ? "Sprint: " + tracks.name
        : tracks.name;
      raceData.previousRace3.position[
        position
      ] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace - 1 && result.position !== 0) {
      const { tracks, users, position, sprint } = result;
      raceData.previousRace2.name = sprint
        ? "Sprint: " + tracks.name
        : tracks.name;
      raceData.previousRace2.position[
        position
      ] = `${users.first_name[0]}. ${users.last_name}`;
    }

    if (result.race_order === firstRace + 1 && result.position === 0) {
      const { tracks, sprint } = result;
      raceData.currentRace = sprint ? "Sprint: " + tracks.name : tracks.name;
    }

    if (result.race_order === firstRace + 2 && result.position === 0) {
      const { tracks, sprint } = result;
      raceData.nextRace = sprint ? "Sprint: " + tracks.name : tracks.name;
    }
  });

  return raceData;
}

const ScheduleTicker = (props: {
  seasonData: any[];
  currentSeason: number;
}) => {
  //@ts-expect-error
  const [raceOrder, setRaceOrder] = useState<IRaceOrder>({});

  useEffect(() => {
    if (props.seasonData) {
      const newRaceOrder = createRaceOrder(props.seasonData);
      setRaceOrder(newRaceOrder);
    }
  }, [props.seasonData]);

  const previousRaces = [
    raceOrder.previousRace5,
    raceOrder.previousRace4,
    raceOrder.previousRace3,
    raceOrder.previousRace2,
  ];

  return (
    <div className="ticker-container">
      {Object.keys(raceOrder).length !== 0 && (
        <>
          <div>
              {previousRaces.map(
                (race) =>  
                  race.name && (
                    <div className="race-info-box" key={race.name}>
                        <div className="info-header">
                          {race.name?.substring(0, race.name.length - 11)} GP
                        </div>
                        <div>
                          {Object.entries(race.position).map(
                            ([position, name]) => {
                              const parsedPosition = parseInt(position, 10);
                              const pc = positionColor(parsedPosition)
                              if (parsedPosition <= 3) {
                                return (
                                  <div key={position} className="podiums">
                                    <span className={`${pc} position-container`}>{parsedPosition}</span> <span className="position-name">{name}</span>
                                  </div>
                                );
                              }
                              return null;
                            }
                          )}
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="race-info-box">
                <div className="info-header">
                  {raceOrder.currentRace?.substring(
                    0,
                    raceOrder.currentRace.length - 11
                  )}{" "}
                  GP
                </div>{" "}
            </div>
        </>
      )}
    </div>
  );
};

export default ScheduleTicker;
