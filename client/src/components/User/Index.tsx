import { useParams } from 'react-router-dom'
import Bio from './Bio';

import useGetUserRaces from '../../Hooks/useGetUserRaces';

const User = () => {
  const { id } = useParams();
  const { userData, bio } = useGetUserRaces(id)

  return (
    <div>
        <Bio id={id} />
    </div>
  )
}

export default User