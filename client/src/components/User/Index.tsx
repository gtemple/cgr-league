import { useParams } from 'react-router-dom'
import Bio from './Bio';
import AllTime from './AllTime';
import SeasonList from './SeasonList';

const User = () => {
  const { id } = useParams();

  return (
    <div>
        <Bio id={id} />
        <AllTime id={id} />
        <SeasonList id={id} />

    </div>
  )
}

export default User