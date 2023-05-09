import { useEffect, useState } from 'react';
import useGetSeason from '../../../Hooks/useGetSeason';

function createRaceOrder(data: any[]): IRaceOrder {
  let firstRace = 0
  let raceData = {
    previousRace2: {
      name: null,
      position: {}
    },
    previousRace: {
      name: null,
      position: {}
    },
    currentRace: null,
    nextRace: null,
  }

  data.forEach((result) => {
    if (result.race_order >= firstRace && result.position !== null) {
      firstRace = result.race_order
      raceData.previousRace.name = result.name
      raceData.previousRace.position[result.position] = `${result.first_name} ${result.last_name}`
    }

    if (result.race_order == firstRace - 1 && result.position !== null) {
      raceData.previousRace2.name = result.name
      raceData.previousRace2.position[result.position] = `${result.first_name} ${result.last_name}`
    }
    if (result.race_order == firstRace + 1 && result.position === null) {
      raceData.currentRace = result.name
    }
    if (result.race_order == firstRace + 2 && result.position === null) {
      raceData.currentRace = result.name
    }
    
  })
  return raceData;
}


const CurrentSeasonSchedule = () => {
  const { seasonData } = useGetSeason(1);
  const [raceOrder, setRaceOrder] = useState<IRaceOrder>({});

  useEffect(() => {
    if (seasonData) {
      const newRaceOrder = createRaceOrder(seasonData);
      setRaceOrder(newRaceOrder);
      console.log(raceOrder)
    }
  }, [seasonData]);

  return (
    <>
      {Object.keys(raceOrder).length !== 0 && (
        <>
          <div>
            {raceOrder.previousRace2.name} {raceOrder.previousRace2.position[1]} {raceOrder.previousRace2.position[2]} {raceOrder.previousRace2.position[3]}
          </div>
          <div>
            {raceOrder.previousRace.name} {raceOrder.previousRace.position[1]} {raceOrder.previousRace.position[2]} {raceOrder.previousRace.position[3]}
          </div>
          <div>
            {raceOrder.currentRace}
          </div>
          <div>
            {raceOrder.nextRace}
          </div>
        </>
        )
      }
    </>);
};

export default CurrentSeasonSchedule;
