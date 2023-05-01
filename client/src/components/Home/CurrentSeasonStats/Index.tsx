import useGetSeason from '../../../Hooks/useGetSeason'
import StandingsList from './StandingsList'
import UserList from './UserList';



const CurrentSeasonStats = () => {
  const { seasonData } = useGetSeason(1);


  return (
    <div>
      <StandingsList seasonData={seasonData} />
      <UserList seasonData={seasonData} />


    </div>
  )
}

export default CurrentSeasonStats