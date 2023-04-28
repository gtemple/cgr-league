import { useParams } from 'react-router-dom'
import useGetSeason from '../../Hooks/useGetSeason'

const SeasonTable = () => {
  const { id } = useParams();
  const { seasonData } = useGetSeason(id);

 

  return (

    <div>
      {seasonData && console.log(seasonData)}
      SeasonTable {id}
    </div>
  )
}

export default SeasonTable