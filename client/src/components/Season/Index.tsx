import SeasonTable from "./SeasonTable";
import { useParams } from 'react-router-dom'
import SeasonRecords from "./SeasonRecords";
import useGetSeason from '../../Hooks/useGetSeason';


const Season = () => {
  const { id } = useParams();
  const { seasonData = [] } = useGetSeason(id);

  if (!seasonData) return null;



  return (
    <div className='season'>
      <div className='current-season-title'>Season {id}</div>
      <SeasonTable key={id} />
      <SeasonRecords seasonData={seasonData} />
    </div>
  )
}

export default Season;