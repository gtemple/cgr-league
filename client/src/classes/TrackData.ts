export default interface TrackData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  race_distance: number;
  race_order: number;
  seasons: { id: number; game: string};
  pole_position: boolean | null | undefined;
  sprint: boolean;
  teams: { team_name: string };
  tracks: { distance: number; img: null; layout: null; name: string };
  users: {
    country_of_representation: string;
    first_name: string;
    human: true;
    id: number;
    initials: string;
    last_name: string;
    profile_image: string;
  };
}