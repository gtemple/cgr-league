import TrackData from "../../classes/TrackData"

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
