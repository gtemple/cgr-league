import { useState, useEffect } from "react"
import useGetUserRaces from "../../Hooks/useGetUserRaces"
import * as _ from "../../helpers/individualStats"

interface Props {
  'id': string | undefined
}

interface AllTime {
  'points'?: number,
  'podiums'?: number,
  'wins'?: number,
  'fastestLaps'?: number,
  'dotd'?: number,
  'averagePosition'?: number
}

const AllTime = (props: Props) => {
  const [allTimeStats, setAllTimeStats] = useState<AllTime>({})

  const { id } = props;
  const { userData } = useGetUserRaces(id);

  useEffect(() => {
    const points = _.lifetimePoints(userData)
    const podiums = _.totalPodiums(userData)
    const wins = _.totalWins(userData)
    const fastestLaps = _.totalFastestLaps(userData);
    const dotd = _.totalDOTDs(userData);
    const averagePosition = _.averagePosition(userData);

    setAllTimeStats({
      'points': points,
      'podiums': podiums,
      'wins': wins,
      'fastestLaps': fastestLaps,
      'dotd': dotd,
      'averagePosition': averagePosition
    })
  }, [userData])


  return (
    <div className='bio'>
      {userData && (
        <div className='all-time'>
          <div>
            <div>All Time points: {allTimeStats.points}</div>
            <div>Fastest Laps: {allTimeStats.fastestLaps}</div>
            <div>Driver of the Days: {allTimeStats.dotd}</div>
          </div>
          <div>
            <div>All Time podiums: {allTimeStats.podiums}</div>
            <div>All Time wins: {allTimeStats.wins}</div>
            <div>Average Position: {allTimeStats.averagePosition?.toFixed(1)}</div>

          </div>
        </div>)}
    </div>
  )
}

export default AllTime