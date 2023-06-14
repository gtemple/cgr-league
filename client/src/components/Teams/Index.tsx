import { useParams } from 'react-router-dom'
import useGetTeam from '../../Hooks/useGetTeam';

import TeamInfo from './TeamInfo';
import TeamRecords from './TeamRecords';


const Teams = () => {
  const { id } = useParams();
  const { teamData = [] } = useGetTeam(id);

  if (!teamData) return null;



  return (
    <div className='container2'>
      <div className='current-season-title'>under construction</div>
      <TeamInfo teamData={teamData}/>
      <TeamRecords teamData={teamData}/>
    </div>
  )
}

export default Teams;