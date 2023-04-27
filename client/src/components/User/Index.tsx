import { useParams } from 'react-router-dom'

const User = (props:ObjectType) => {

  const { userId } = useParams();

  return (
    <div>Da Users</div>
  )
}

export default User