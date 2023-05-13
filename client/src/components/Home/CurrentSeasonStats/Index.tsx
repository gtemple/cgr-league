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
        <div className='current-season-container'>
          <div className='current-season-container-title'>Constructor Standings</div>
          <ConstructorsStandings seasonData={seasonData} />
        </div>
        <div className='current-season-container'>
          <div className='current-season-container-title'>Driver Standings</div>
          <StandingsList seasonData={seasonData} />
        </div>
        <div className='current-season-container'>
        {/*//@ts-expect-error */}
          <UserList seasonData={seasonData} />
        </div>
      </div>
    </div>
  )
}

export default CurrentSeasonStats