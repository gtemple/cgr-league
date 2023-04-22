import { useState, useEffect } from 'react'
import axios from 'axios'
import useSeasonStandings from '../Hooks/useSeasonStandings'



const CurrentSeason = () => {
  const { raceResults, drivers, seasonStandings, totalSeasonScore, setSeasonStandings, currentSeasonStandings } = useSeasonStandings();

  return (
    <div></div>
  )
}

export default CurrentSeason