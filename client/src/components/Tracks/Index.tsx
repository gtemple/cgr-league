import React from 'react'
import { useParams } from 'react-router-dom'
import useGetTrack from '../../Hooks/useGetTrackData'

type Data = {
  user_id: number,
  human: boolean,
  first_name: string,
  last_name: string,
  initials: string,
  profile_image: string | null,
  id: number,
  dnf: boolean,
  fastest_lap: boolean,
  sprint: boolean,
  position: number,
  dotd: boolean,
  race_order: number,
  created_at: string,
  team_name: string,
  name: string,
  game: string,
  season_id: number
}

type Result = {
  [season_id: number]: {
    [user_id: number]: {
      first_name: string,
      last_name: string,
      position: number,
      fastest_lap: boolean,
      sprint: boolean,
      dnf: boolean,
      dotd: boolean
    }
  }
}

const Tracks= () => {
  const { id } = useParams();
  const { trackData } = useGetTrack(id);

  
  function groupDataBySeasonAndUser(data: Data[]): Result {
    const result: Result = {};
  
    data.forEach((item) => {
      if (!result[item.season_id]) {
        result[item.season_id] = {};
      }
      if (!result[item.season_id][item.user_id]) {
        result[item.season_id][item.user_id] = {
          first_name: item.first_name,
          last_name: item.last_name,
          position: item.position,
          fastest_lap: item.fastest_lap,
          sprint: item.sprint,
          dnf: item.dnf,
          dotd: item.dotd
        };
      }
    });
  
    return result;
  }

  
  function sortRaceResultsByPosition(raceResults: RaceResult): Array<RaceResult[keyof RaceResult]> {
    // convert the object of objects to an array of objects
    const raceResultsArray = Object.values(raceResults);
  
    // sort the array by position
    raceResultsArray.sort((a, b) => a.position - b.position);
  
    return raceResultsArray;
  }

  const groupData = trackData ? groupDataBySeasonAndUser(trackData) : null;

  return (
    <div>
      traaaacks {id}
      {groupData && (
        <div>
          {/* or render some component instead of console.log */}
          <div>Grouped data by season and user</div>
        </div>
      )}
    </div>
  )
}

export default Tracks