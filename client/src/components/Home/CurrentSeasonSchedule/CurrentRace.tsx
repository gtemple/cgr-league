import React from 'react'
import RaceSchedule from '../../../classes/RaceSchedule'

interface Props {
  schedule: RaceSchedule
}

const CurrentRace = (props: Props) => {
  const { previousRace2, previousRace1, currentRace, nextRace1, nextRace2} = props.schedule


  
  return (
    <div> 
      {previousRace1 && (
        <div>
          {previousRace1.name}
          </div>
      )}
      CurrentRace
    </div>
  )
}

export default CurrentRace