import React from 'react'
import RaceSchedule from '../../../classes/RaceSchedule'

interface Props {
  schedule: RaceSchedule
}

const CurrentRace = (props: Props) => {
  const { previousRace2, previousRace1, currentRace, nextRace1, nextRace2} = props.schedule
  console.log(props.schedule)
  console.log('prev2', previousRace2)
  console.log('prev1', previousRace1)
  console.log('cur', currentRace)

  
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