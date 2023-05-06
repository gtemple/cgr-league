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
  'dotd'?: number
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

    setAllTimeStats({
      'points': points,
      'podiums': podiums,
      'wins': wins,
      'fastestLaps': fastestLaps,
      'dotd': dotd
    })
  }, [userData])


  return (
    <div>
      {userData && (
        <div>
          <div>All Time points: {allTimeStats.points}</div>
          <div>All Time podiums: {allTimeStats.podiums}</div>
          <div>All Time wins: {allTimeStats.wins}</div>
          <div>Fastest Laps: {allTimeStats.fastestLaps}</div>
          <div>Driver of the Days: {allTimeStats.dotd}</div>

        </div>)}
    </div>
  )
}

export default AllTime