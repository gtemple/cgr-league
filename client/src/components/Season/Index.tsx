import SeasonTable from "./SeasonTable";
import { useParams } from 'react-router-dom'

const Season = () => {
  const { id } = useParams();

  return (
    <div>
      {id}
      <SeasonTable key={id} />
    </div>
  )
}

export default Season;