import * as _ from './sumSeasonPoints'
import RaceResults from '../classes/RaceResults'


export const lifetimePoints = (races: []): number => {
    let totalPoints = 0;

    races.forEach((race: RaceResults) => {
      totalPoints += _.positionScore(race.position, race.fastest_lap, race.sprint)
    });

    return totalPoints
}

export const lifetimeLaps = (races: []): number => {
  let totalLaps = 0;

  races.forEach((race: RaceResults) => {
    if (race.position !== 0) {
      totalLaps += race.race_distance
    }
  });

  return totalLaps
}

export const lifetimeDistance = (races: []): number => {
  let totalDistance = 0;

  races.forEach((race: RaceResults) => {

    if (race.position !== 0) {
      totalDistance += race.tracks.distance
    }
  });

  return totalDistance
}

export const totalPodiums = (races: []): number => {
  let totalPodiums = 0;
  races.forEach((race: RaceResults) => {
    if (race.position >= 1 && race.position <= 3 && !race.sprint) {
      totalPodiums++
    }
  });

  return totalPodiums
}

export const totalWins = (races: []): number => {
  let totalWins = 0;
  races.forEach((race: RaceResults) => {
    if (race.position === 1 && !race.sprint) {
      totalWins++
    }
  });

  return totalWins
}

export const totalFastestLaps = (races: []): number => {
  let totalFastestLaps = 0;
  races.forEach((race: RaceResults) => {
    if (race.fastest_lap) {
      totalFastestLaps++
    }
  });

  return totalFastestLaps
}

export const totalDOTDs = (races: []): number => {
  let totalDOTDs = 0;
  races.forEach((race: RaceResults) => {
    if (race.dotd) {
      totalDOTDs++
    }
  });

  return totalDOTDs
}