const convertTeam = (teamName: string): string => {
  return teamName.toLowerCase().split(' ').join('-')
}

export default convertTeam