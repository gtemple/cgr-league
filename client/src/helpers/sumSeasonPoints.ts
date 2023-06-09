import RaceResults from "../classes/RaceResults";

type Scores = {
  [key: string]: number;
};


export const positionScore = (position: number | null, fastestLap: boolean, sprint: boolean):number => {
  const scores:Scores = {
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

  const sprintScores:Scores = {
    '1': 8,
    '2': 7,
    '3': 6,
    '4': 5,
    '5': 4,
    '6': 3,
    '7': 2,
    '8': 1
  }

  let finalScore = 0


  if (fastestLap && Number(position) < 11) {
    finalScore += 1;
  }

  if (position && position !== undefined && !sprint && position < 11) {
    //@ts-expect-error
    finalScore += scores[position as keyof ObjectType]
  }

  if (position && position !== undefined && sprint && position < 9) {
    //@ts-expect-error
    finalScore += sprintScores[position as keyof ObjectType]
  }
  return finalScore;
}

//@ts-expect-error
export const totalSeasonScore = (races:ArrayType): ObjectType => {
//@ts-expect-error
  const allScores: ObjectType= {};

  races.forEach((race:RaceResults) => {
    if (allScores[race.users.id] != undefined) {
      allScores[race.users.id].totalPoints += positionScore(race.position, race.fastest_lap, race.sprint)
    } else {
      allScores[race.users.id] = {
        totalPoints: positionScore(race.position, race.fastest_lap, race.sprint),
        first_name: race.users.first_name,
        last_name: race.users.last_name,
        human: race.users.human,
        team: race.teams.team_name
      }
    }
  })
  return allScores
}

//@ts-expect-error
export const totalConstructorScore = (races) => {

  const allScores = {};
  races.forEach((race:RaceResults) => {
    //@ts-expect-error
    if (allScores[race.teams.team_name] != undefined) {
      //@ts-expect-error
      allScores[race.teams.team_name] += positionScore(race.position, race.fastest_lap, race.sprint)
    } else {
      //@ts-expect-error
      allScores[race.teams.team_name] = positionScore(race.position, race.fastest_lap, race.sprint)
    }
  })
  return allScores
}