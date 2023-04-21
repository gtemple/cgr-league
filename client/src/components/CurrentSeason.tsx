import { useState, useEffect } from 'react'
import axios from 'axios'
import totalSeasonScore from '../helpers/totalSeasonScore';



const CurrentSeason = () => {

  const [raceResults, setRaceResults] = useState<boolean | ObjectType>(false);
  let racer = 0;


  useEffect(() => {

    axios
    .get('/api/race-results')
    .then(res => setRaceResults(res.data['raceResults']))
  }, [])

  if(raceResults) {
    console.log(raceResults)
    racer = totalSeasonScore(raceResults);
  }

  return (
    <div>{racer}</div>
  )
}

export default CurrentSeason