import { useParams } from 'react-router-dom'

const User = (props:ObjectType) => {

  const { id } = useParams();

  return (
    <div>Da Users {id}</div>
  )
}

export default User