import { useEffect, useState } from "react";
import * as _ from '../../../helpers/sumSeasonPoints';
import '../home.css';

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
  seasonData: RaceData[]
}

interface Person {
  points: number;
  firstName: string;
  lastName: string;
}

interface Human {
  points: number;
  firstName: string;
  lastName: string;
}

interface Humans {
  [key: number]: Human;
}

const getUserData = (raceData: RaceData[]) => {
  let humans: Humans = {};

  raceData.forEach((race: RaceData) => {
    if (race.human) {
      if (humans[race.user_id] === undefined) {
        humans[race.user_id] = {
          points: _.positionScore(race.position, race.fastest_lap),
          firstName: race.first_name,
          lastName: race.last_name
        };
      } else {
        humans[race.user_id].points += _.positionScore(race.position, race.fastest_lap);
      }
    }
  });

  return humans;
};

function sortPeopleByPoints(people: {[key: number]: Person}): Person[] {
  const sortedPeople = Object.values(people).sort((a, b) => b.points - a.points);
  return sortedPeople;
}

const UserList = (props: Props) => {
  const [userData, setUserData] = useState<Person[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const result = getUserData(props.seasonData);
    const sortedUserData = sortPeopleByPoints(result);
    setUserData(sortedUserData);
    setLoaded(true);
  }, [props.seasonData]);

  const calculateChartSize = (activeValue: number, valueB: number, valueC: number): number => {
    let result = activeValue / (activeValue + valueB + valueC) * 300;
    return result
  }

  return (
    <div>
      CGR Standings:
      {userData.length > 0 && (
        <div className='chart'>
          <div className='stat'>
            <div className='bar silver-chart' style={{height: `${calculateChartSize(userData[1].points, userData[0].points, userData[2].points)}px`}}>{userData[1].points}</div>
            <div>{userData[1].firstName.slice(-0, 1) + '.'} {userData[1].lastName}</div>
          </div>
          <div className='stat'>
            <div className='bar gold-chart' style={{height: `${calculateChartSize(userData[0].points, userData[1].points, userData[2].points)}px`}}>{userData[0].points}</div>
            <div>{userData[0].firstName.slice(-0, 1) + '.'} {userData[0].lastName}</div>
          </div>
          <div className='stat'>
            <div className='bar bronze-chart' style={{height: `${calculateChartSize(userData[2].points, userData[1].points, userData[0].points)}px`}}>{userData[2].points}</div> 
            <div>{userData[2].firstName.slice(-0, 1) + '.'} {userData[2].lastName}</div>
          </div>
        </div>
      )} 
      <div></div>
    </div>
  )
}

export default UserList;