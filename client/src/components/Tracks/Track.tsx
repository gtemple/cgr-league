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
          <div>
            <h2>Season {seasonId} results</h2>
            <table className='container2 track-season' key={seasonId}>
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
          </div>
        )
      })}
    </div>
  )
}

export default Track
