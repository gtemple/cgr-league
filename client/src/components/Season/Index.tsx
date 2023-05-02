import SeasonTable from "./SeasonTable";
import { useParams } from 'react-router-dom'

import useGetSeason from "../../Hooks/useGetSeason";

const Season = () => {
  const { id } = useParams();
  //const { seasonData } = useGetSeason(id);


  return (
    <div>
      {/* {id}
      {seasonData && (
        <div>
          console.log(seasonData)
        </div>
      )} */}
      <SeasonTable key={id} />
    </div>
  )
}

export default Season;