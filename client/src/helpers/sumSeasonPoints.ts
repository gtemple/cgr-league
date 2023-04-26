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

const totalSeasonScore = (races:ArrayType): ObjectType => {

  const allScores: ObjectType = {};

  races.forEach((race:ObjectType) => {
    if (allScores[race.user_id] != undefined) {
      allScores[race.user_id].totalPoints += positionScore(race.position, race.fastestLap)
    } else {
      allScores[race.user_id] = {
        totalPoints: positionScore(race.position, race.fastestLap),
        first_name: race.first_name,
        last_name: race.last_name
      }
    }
  })
  return allScores
}



export default totalSeasonScore;