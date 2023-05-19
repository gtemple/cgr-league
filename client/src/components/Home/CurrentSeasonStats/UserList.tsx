import { useEffect, useState } from "react";
import * as _ from '../../../helpers/sumSeasonPoints';
import background from '../../../assets/background/ferrari-mclaren.jpg'

import '../home.css';

type RaceData = {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  race_distance: number;
  race_order: number;
  seasons: {
    id: number;
  };
  sprint: boolean;
  teams: {
    team_name: string;
  };
  tracks: {
    distance: number;
    img: string | null;
    layout: string | null;
    name: string;
  };
  users: {
    country_of_representation: string;
    first_name: string;
    human: boolean;
    id: number;
    initials: string;
    last_name: string;
    profile_image: string;
  };
};


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
    if (race.users.human) {
      if (humans[race.users.id] === undefined) {
        humans[race.users.id] = {
          points: _.positionScore(race.position, race.fastest_lap),
          firstName: race.users.first_name,
          lastName: race.users.last_name
        };
      } else {
        humans[race.users.id].points += _.positionScore(race.position, race.fastest_lap);
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
      <img src={background} className="background-image2"/>
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