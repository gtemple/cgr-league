export default interface RaceResults {
    created_at: string;
    dnf: boolean;
    dotd: boolean;
    fastest_lap: boolean;
    id: number;
    position: number;
    race_distance: number;
    race_order: number;
    pole_position: boolean;
    seasons: {
      id: number;
    };
    sprint: boolean;
    teams: {
      team_name: string;
    };
    tracks: {
      distance: number;
      img: string | null;
      layout: string | null;
      name: string;
    };
    users: {
      country_of_representation: string;
      first_name: string;
      human: boolean;
      id: number;
      initials: string;
      last_name: string;
      profile_image: string;
    };
  };