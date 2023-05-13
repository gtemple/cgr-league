import useGetSeason from '../../../Hooks/useGetSeason'
import StandingsList from './StandingsList'
import UserList from './UserList';

import '../home.css'
import ConstructorsStandings from './ConstructorsStandings';


const CurrentSeasonStats = () => {
  const { seasonData } = useGetSeason(1);


  return (
    <div className='current-season'>
      <h1 className='current-season-title'>Season 2</h1>
      <div className='current-season-stats'>
        <ConstructorsStandings seasonData={seasonData} />
        <StandingsList seasonData={seasonData} />
        {/*//@ts-expect-error */}
        <UserList seasonData={seasonData} />
      </div>
    </div>
  )
}

export default CurrentSeasonStats