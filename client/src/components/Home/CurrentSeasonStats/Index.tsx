import useGetSeason from '../../../Hooks/useGetSeason'
import StandingsList from './StandingsList'
import UserList from './UserList';

import '../home.css'


const CurrentSeasonStats = () => {
  const { seasonData } = useGetSeason(1);


  return (
    <div className='current-season'>
      <h1 className='current-season-title'>Season 2</h1>
      <div className='current-season-stats'>
        {seasonData && console.log(seasonData)}
        <StandingsList seasonData={seasonData} />
        <UserList seasonData={seasonData} />
      </div>
    </div>
  )
}

export default CurrentSeasonStats