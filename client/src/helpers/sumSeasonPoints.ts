import RaceResults from "../classes/interfaces";

export const positionScore = (position: number | null, fastestLap: boolean):number => {
  console.log('position', position)
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

  if (fastestLap && Number(position) < 11) {
    finalScore += 1;
  }

  if (position) {
    finalScore += scores[position as keyof ObjectType]
  }

  return finalScore;
}

export const totalSeasonScore = (races:ArrayType): ObjectType => {

  const allScores: ObjectType= {};

  races.forEach((race:RaceResults) => {
    if (allScores[race.user_id] != undefined) {
      allScores[race.user_id].totalPoints += positionScore(race.position, race.fastest_lap)
    } else {
      allScores[race.user_id] = {
        totalPoints: positionScore(race.position, race.fastest_lap),
        first_name: race.first_name,
        last_name: race.last_name,
        human: race.human
      }
    }
  })
  return allScores
}