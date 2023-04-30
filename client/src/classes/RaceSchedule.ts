type Driver = {
  firstName?: string,
  lastName?: string,
  initials?: string,
  fastestLap?: boolean,
  dnf?: boolean,
  dotd?: string
}

interface RaceDetails {
  name: string,
  order: [{
    1?: Driver
    2?: Driver,
    3?: Driver,
    4?: Driver,
    5?: Driver,
    6?: Driver,
    '7'?: Driver,
    '8'?: Driver,
    '9'?: Driver,
    '10'?: Driver,
    '11'?: Driver,
    '12'?: Driver,
    '13'?: Driver,
    '14'?: Driver,
    '15'?: Driver,
    '16'?: Driver,
    '17'?: Driver,
    '18'?: Driver,
    '19'?: Driver,
    '20'?: Driver
  }]
}

export default interface RaceSchedule {
  previousRace2?: RaceDetails
  previousRace1?: RaceDetails,
  currentRace?: RaceDetails,
  nextRace1?: RaceDetails,
  nextRace2?: RaceDetails
}