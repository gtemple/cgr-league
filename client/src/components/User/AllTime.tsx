import useGetUserRaces from "../../Hooks/useGetUserRaces"

interface Props {
  'id': string | undefined
}

const AllTime = (props: Props) => {
  const { id } = props;
  const { userData } = useGetUserRaces(id);



//console.log(userData)

  return (
    <div>
      {userData && (
        <div>
        console.log(userData)
        </div>)}
      AllTime
      hey
    </div>
  )
}

export default AllTime