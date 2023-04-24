import { useState, useEffect } from "react";
import axios from 'axios';

export default function useSeasonStandings() {
  const [raceResults, setRaceResults] = useState<boolean | ObjectType>(false)
  const [drivers, setDrivers] = useState<boolean | ObjectType>(false)
  
  const [driversScores, setDriversScores] = useState<boolean | ObjectType>(false)
  const [seasonStandings, setSeasonStandings] = useState<boolean | ObjectType>(false)

  //

  const positionScore = (position: string, fastestLap: boolean):number => {
    let finalScore = 0
    const scores: ObjectType = {
      '1': 25,
      '2': 18,
      '3': 15,
      '4': 12,
      '5': 10,
      '6': 8,
      '7': 6,
      '8': 4,
      '9': 2,
      '10': 1,
    }

    if (fastestLap) {
      finalScore += 1;
    }

    finalScore += scores[position as keyof ObjectType]

    return finalScore;
  }

  const totalSeasonScore = (races:ArrayType, season: number): ObjectType => {

    const allScores: ObjectType = {};

    races.forEach((race:ObjectType) => {
      const user_id = race['user_id'];
      if (allScores[user_id] === undefined) {
        allScores[user_id] = 0;
      }
      if (race['user_id'] && race['season'] === season) {
        allScores[user_id] += positionScore(race['position' as keyof ObjectType], race['fastest_lap' as keyof ObjectType])
      }
    })

    return allScores
  }

  const currentSeasonStandings = (totalSeasonScore: ObjectType, driverInfo: ObjectType): ObjectType => {

    const driverScores: ObjectType = {};
    console.log('yo', totalSeasonScore)
    for (let driver of driverInfo) {
      driverScores[driver.id] = [driver, totalSeasonScore[driver.id]]
    }
    return driverScores
  }



  useEffect(() => {
    //gets all race result data
    axios
    .get('/api/race-results')
    .then(res => setRaceResults(res.data['raceResults']))
    .then(() => {
      axios
      .get('/api/users')
      .then(res => setDrivers(res.data['users']))
    })

    if (raceResults && drivers) {
      setDriversScores(totalSeasonScore(raceResults, 1));
      setSeasonStandings(currentSeasonStandings(driversScores, drivers))
      console.log(seasonStandings)
    }
  }, [])


  return { raceResults, drivers, seasonStandings, totalSeasonScore, setSeasonStandings, currentSeasonStandings }

}