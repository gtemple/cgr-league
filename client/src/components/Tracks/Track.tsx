import React from 'react'

interface TrackData {
  user_id: number,
  human: boolean,
  first_name: string,
  last_name: string,
  initials: string,
  profile_image: string | null,
  id: number,
  dnf: boolean,
  fastest_lap: boolean,
  sprint: boolean,
  position: number,
  dotd: boolean,
  race_order: number,
  pole_position: number | null,
  created_at: string,
  team_name: string,
  name: string,
  game: string,
  season_id: number
}

interface Props {
  trackData: TrackData[]
}

const Track: React.FC<Props> = ({ trackData }) => {
  const uniqueSeasonIds = Array.from(new Set(trackData.map(data => data.season_id)))

  return (
    <div>
      {uniqueSeasonIds.map(seasonId => {
        const seasonData = trackData.filter(data => data.season_id === seasonId)
        const initials = Array.from(new Set(seasonData.map(data => data.initials)))
        const positions = initials.map(initial => {
          const data = seasonData.find(d => d.initials === initial)
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
    </div>
  )
}

export default Track
