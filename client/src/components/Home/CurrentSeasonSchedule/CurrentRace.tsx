import React from 'react'
import RaceSchedule from '../../../classes/RaceSchedule'

interface Props {
  schedule: RaceSchedule
}

const CurrentRace = (props: Props) => {
  const { previousRace1, previousRace2, currentRace, nextRace1, nextRace2} = props
  
  return (
    <div>CurrentRace</div>
  )
}

export default CurrentRace