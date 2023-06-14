import { useParams } from 'react-router-dom'
import useGetTeam from '../../Hooks/useGetTeam';
import TeamInfo from './TeamInfo';


const Teams = () => {
  const { id } = useParams();
  const { teamData = [] } = useGetTeam(id);

  if (!teamData) return null;



  return (
    <div className='container2'>
      <div className='current-season-title'>Team - {id}</div>
      <TeamInfo teamData={teamData}/>
    </div>
  )
}

export default Teams;