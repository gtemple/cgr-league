// will update a race score based on their finishing position and add a point if they got the fastest lap in the race

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