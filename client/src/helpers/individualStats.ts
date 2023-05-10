import * as _ from './sumSeasonPoints'
import RaceResults from '../classes/RaceResults'


export const lifetimePoints = (races: []): number => {
    let totalPoints = 0;

    races.forEach((race: RaceResults) => {
      totalPoints += _.positionScore(race.position, race.fastest_lap)
    });

    return totalPoints
}

export const lifetimeLaps = (races: []): number => {
  let totalLaps = 0;

  races.forEach((race: RaceResults) => {
    totalLaps += race.race_distance
  });

  return totalLaps
}

export const lifetimeDistance = (races: []): number => {
  let totalDistance = 0;

  races.forEach((race: RaceResults) => {
    totalDistance += race.distance
  });

  return totalDistance
}

export const totalPodiums = (races: []): number => {
  let totalPodiums = 0;
  races.forEach((race: RaceResults) => {
    if (race.position >= 1 && race.position <= 3) {
      totalPodiums++
    }
  });

  return totalPodiums
}

export const totalWins = (races: []): number => {
  let totalWins = 0;
  races.forEach((race: RaceResults) => {
    if (race.position === 1) {
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