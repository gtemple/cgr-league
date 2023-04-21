import positionScore from './positionScore';

const totalSeasonScore = (races:ArrayType):number => {
  let totalScore = 0;
  races.forEach((race: ObjectType )=> {
    totalScore += positionScore(race['position' as keyof ObjectType], race['fastest_lap' as keyof ObjectType])
  })

  return totalScore;
}

export default totalSeasonScore;