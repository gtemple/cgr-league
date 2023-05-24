import StandingsList from './StandingsList'
import UserList from './UserList';
import TwitchPopout from "./TwitchPopout";


import '../home.css'
import ConstructorsStandings from './ConstructorsStandings';

//@ts-expect-error
const CurrentSeasonStats = (props: { seasonData: ObjectType; currentSeason: number }) => {

  return (
    <div className='current-season'>
      <h1 className='current-season-title'>Season {props.currentSeason}</h1>
      <div className='current-season-stats'>
        <div className='current-season-container'>
          <div className='current-season-container-title'>Constructor Standings</div>
          <ConstructorsStandings seasonData={props.seasonData} />
        </div>
        <div className='current-season-container'>
          <div className='current-season-container-title'>Driver Standings</div>
          <StandingsList seasonData={props.seasonData} />
        </div>
        <div className='current-season-container2'>
          <UserList seasonData={props.seasonData} />
          <TwitchPopout />
        </div>
      </div>
    </div>
  )
}

export default CurrentSeasonStats