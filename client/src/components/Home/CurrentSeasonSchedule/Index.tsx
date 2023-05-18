import { useEffect, useState } from 'react';
import useGetImage from '../../../Hooks/useGetImage'


type IRaceOrder = {
  previousRace2: {
    name: string | null;
    position: { [key: number]: string };
  };
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
  let firstRace = 0
  let raceData = {
    previousRace2: {
      name: null,
      position: {}
    },
    previousRace: {
      name: null,
      img: null,
      layout: null,
      position: {}
    },
    currentRace: null,
    nextRace: null,
  }

  data.forEach((result) => {
    if (result.race_order >= firstRace && result.position !== null) {
      firstRace = result.race_order
      raceData.previousRace.name = result.tracks.name
      raceData.previousRace.layout = result.tracks.layout
      raceData.previousRace.img = result.tracks.img
      //@ts-expect-error
      raceData.previousRace.position[result.position] = `${result.users.first_name} ${result.users.last_name}`
    }

    if (result.race_order == firstRace - 1 && result.position !== null) {
      raceData.previousRace2.name = result.tracks.name
      //@ts-expect-error
      raceData.previousRace2.position[result.position] = `${result.users.first_name} ${result.users.last_name}`
    }
    if (result.race_order == firstRace + 1 && result.position === null) {
      raceData.currentRace = result.tracks.name
    }
    if (result.race_order == firstRace + 2 && result.position === null) {
      raceData.currentRace = result.tracks.name
    }
    
  })
  return raceData;
}

//@ts-expect-error
const CurrentSeasonSchedule = (props: { seasonData: ObjectType; currentSeason: number }) => {
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
    <div className='schedule-container'>
      {Object.keys(raceOrder).length !== 0 && (
        <>
          <div className='previous-race'>
            <div className='track-info track-name'>{raceOrder.previousRace2.name}</div>
            <div className='positions'>
              <div>1. {raceOrder.previousRace2.position[1]}</div><div> 2. {raceOrder.previousRace2.position[2]} </div> <div>3. {raceOrder.previousRace2.position[3]} </div>
            </div>
          </div>
          <div className='previous-race'>
            <div className='track-info'>
              <div>Last Race</div>
            {loading ? (
                <div>Loading image...</div>
              ) : (
                <img src={img} className='track-image' alt="Track Image" />
              )}
            <div className='track-name'>{raceOrder.previousRace.name} </div>
            </div>
            <div>
              <div>{raceOrder.previousRace.position[1]}</div>
              <div>{raceOrder.previousRace.position[2]}</div>
              <div>{raceOrder.previousRace.position[3]}</div>
            </div>
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
    </div>);
};

export default CurrentSeasonSchedule;
