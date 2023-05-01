import { useEffect, useState } from "react"
import * as _ from '../../../helpers/sumSeasonPoints'

type RaceData = {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  first_name: string;
  game: string;
  human: boolean;
  id: number;
  initials: string;
  last_name: string;
  name: string;
  position: number;
  profile_image: string | null;
  race_order: number;
  season_id: number;
  sprint: boolean;
  team_name: string;
  user_id: number;
}

type Props = {
  seasonData: RaceData
}

interface Person {
  points: number;
  firstName: string;
  lastName: string;
}


const UserList = (props: Props) => {
  const [userData, setUserData] = useState<boolean | Person[]>(false)
  const [loaded, setLoaded] = useState(false)

  const  getUserData = (raceData: RaceData[]) => {
    let humans = {}

    raceData.forEach((race:RaceData) => {

      if (race.human) {
        console.log('aaa', humans)
        if (humans[race.user_id] === undefined) {

          humans[race.user_id] = {
            points: _.positionScore(race.position, race.sprint),
            firstName: race.first_name,
            lastName: race.last_name
          } 
        } else {
          humans[race.user_id].points += _.positionScore(race.position, race.sprint)
        }
      }
    })

    return humans
  }
  
  function sortPeopleByPoints(people: {[key: number]: Person}): Person[] {
    const sortedPeople = Object.values(people).sort((a, b) => a.points - b.points);
    return sortedPeople;
  }


  
  useEffect(() => {
    const result = props.seasonData !== [] ? getUserData(props.seasonData) : null;
    if (result) {
      const sortedUserData = sortPeopleByPoints(result)
      setUserData(sortedUserData)
      setLoaded(true)
      console.log(userData)
    }

  }, [loaded])


  return (
    <div>

      {userData.length > 0 && (
        <div>
          {console.log(userData)}
          <div>{userData[2].points} {userData[1].firstName} {userData[1].lastName}</div>
          <div></div>
          <div></div>
        </div>
      )} 
      <div></div>
      
    </div>
  )
}

export default UserList