interface TrackData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  race_distance: number;
  race_order: number;
  seasons: { id: number; game: string};
  pole_position: boolean | undefined;
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

interface Props {
  trackData: TrackData[]
}

const Track: React.FC<Props> = ({ trackData }) => {
  const uniqueSeasonIds = Array.from(new Set(trackData.map(data => data.seasons.id)))

  return (
    <div>
      {uniqueSeasonIds.map(seasonId => {
        const seasonData = trackData.filter(data => data.seasons.id === seasonId)
        const initials = Array.from(new Set(seasonData.map(data => data.users.initials)))
        const positions = initials.map(initial => {
          const data = seasonData.find(d => d.users.initials === initial)
          return data ? data.position : ''
        })

        return (
          <table key={seasonId}>
            <thead>
              <tr>
                {initials.map(initial => (
                  <th key={initial}>{initial}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {positions.map(position => (
                  <td key={position}>{position}</td>
                ))}
              </tr>
            </tbody>
          </table>
        )
      })}
            to add:
      <ul>
        <li>All time most points at track (top 10?)</li>
        <li>Most fastest laps: top 5</li>
        <li>most DOTDs: Top 5</li>
      </ul>
    </div>
  )
}

export default Track
