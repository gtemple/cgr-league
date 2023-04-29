export default interface RaceResults {
  created_at: string,
  dnf: boolean,
  fastest_lap: boolean,
  first_name: string,
  game: string,
  human: boolean,
  id: number,
  initials: string,
  last_name: string,
  name: string,
  position: number,
  profile_image: string | null,
  team_name: string,
  user_id: number,
  dotd: boolean
}