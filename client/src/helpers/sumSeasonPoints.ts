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
    const user_id = race['user_id'];
    if (allScores[user_id] === undefined) {
      allScores[user_id] = 0;
    }
    if (race['user_id']) {
      allScores[user_id] += positionScore(race['position' as keyof ObjectType], race['fastest_lap' as keyof ObjectType])
    }
  })

  return allScores
}

const currentSeasonStandings = (totalSeasonScore: ObjectType, driverInfo: ObjectType): ObjectType => {

  const driverScores: ObjectType = {};
  for (let driver of driverInfo) {
    driverScores[driver.id] = [driver, totalSeasonScore[driver.id]]
  }
  return driverScores
}

export default currentSeasonStandings;