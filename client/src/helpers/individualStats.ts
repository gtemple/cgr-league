import { positionScore } from "./sumSeasonPoints"
import { RaceResults } from '../classes/interfaces'


const lifetimePoints = (races: []): integer => {

    let totalPoints = 0;
    races.forEach((race: RaceResults) => {
      totalPoints += positionScore(race.position, race.fastest_lap)
    })
}