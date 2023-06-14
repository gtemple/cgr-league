interface RaceData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  pole_position: boolean | null | undefined;
  race_distance: number;
  race_order: number;
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
}

interface SeasonRecordsProps {
  teamData: RaceData[];
}


const TeamRecords: React.FC<SeasonRecordsProps> = ({ teamData }) => {
  return (
    <div>
      {teamData && (
        <div>
          <div>All Time Races: {teamData.length / 2}</div>
        </div>
      )}

    </div>
  )
}

export default TeamRecords;