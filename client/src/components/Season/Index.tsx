import SeasonTable from "./SeasonTable";
import { useParams } from 'react-router-dom'
import SeasonRecords from "./SeasonRecords";
import useGetSeason from '../../Hooks/useGetSeason';


const Season = () => {
  const { id } = useParams();
  const { seasonData = [] } = useGetSeason(id);

  if (!seasonData) return null;



  return (
    <div>
      <SeasonTable key={id} />
      <SeasonRecords seasonData={seasonData} />
      <div>things to add:</div>
      <ul>
        <li>standings from best to worst driver with points</li>
        <li>most fastest laps</li>
        <li>most podiums</li>
        <li>most race wins</li>
        <li>most driver of the days</li>
        <li>most dnfs</li>


      </ul>
    </div>
  )
}

export default Season;