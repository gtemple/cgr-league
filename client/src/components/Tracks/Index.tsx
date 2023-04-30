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

  const groupData = trackData ? groupDataBySeasonAndUser(trackData) : null;

  return (
    <div>
      traaaacks {id}
      {groupData && (
        <div>
          {console.log(groupData)}
          {/* or render some component instead of console.log */}
          <div>Grouped data by season and user</div>
        </div>
      )}
    </div>
  )
}

export default Tracks