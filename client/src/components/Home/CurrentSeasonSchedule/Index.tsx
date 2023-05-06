import React, { useEffect, useState } from 'react'

import useGetSeason from '../../../Hooks/useGetSeason'
import RaceResult from '../../../classes/RaceResults'
import RaceSchedule from '../../../classes/RaceSchedule'

import CurrentRace from './CurrentRace'

const positionObj = (race: RaceResult) => {
  let obj = { 
    'name': race.name,
    'order': {}
  }

  if (race.position) {
    const position = race.position.toString()

    obj.order = {
      [race.position]: { 
        firstName: race.first_name,
        lastName: race.last_name,
        fastestLap: race.fastest_lap,
        dnf: race.dnf,
        dotd: race.dotd
      }
    }
  }
  return obj
}

const CurrentSeasonSchedule = () => {
  const [raceSchedule, setRaceSchedule] = useState<RaceSchedule>({})
  const { seasonData } = useGetSeason(2)

  const parseRaceSchedule = (data: RaceResult[]): object => {
    const raceSchedule: RaceSchedule = {};

    let currentRace = 0;

    data.forEach((race: RaceResult) => {
      if (race.race_order > currentRace && race.position) {
        currentRace = race.race_order + 2
      }
    })

    data.forEach((race: RaceResult) => {
      if (race.race_order === currentRace - 2) {
        raceSchedule.previousRace2 = positionObj(race)
      }
      if (race.race_order === currentRace - 1) {
        raceSchedule.previousRace1 = positionObj(race)
      }
      if (race.race_order === currentRace) {
        raceSchedule.currentRace = positionObj(race)
      }
      if (race.race_order === currentRace + 1) {
        raceSchedule.nextRace1 = positionObj(race)
      }
      if (race.race_order === currentRace + 2) {
        raceSchedule.nextRace2 = positionObj(race)
      }
    })

    return raceSchedule;
  }

  useEffect(() => {
    const schedule = parseRaceSchedule(seasonData)
    setRaceSchedule(schedule)
  }, [seasonData])

  
  return (
    <div>
      {raceSchedule.currentRace && (
        <div>
          previous: {raceSchedule.previousRace1.name}
          current: {raceSchedule.currentRace.name}
          next: {raceSchedule.nextRace1.name}

          <CurrentRace schedule={raceSchedule}/>
        </div>
      )}
    </div>
  )
}

export default CurrentSeasonSchedule