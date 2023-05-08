import useGetUserBio from '../../Hooks/useGetUserBio'
import './user.css'
import image from '../../assets/driver-profiles/alex-albon.jpg'


interface Props {
  'id': string | undefined
}

const Bio = (props: Props) => {

  const {userData, bio} = useGetUserBio(props.id);

  const formattedDate = bio.dateOfBirth ? new Date(bio.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  return (
    <div>
      {userData && (
        <>
          <img src={image}/>
          <div> {bio.initials}</div>
          <div> {bio.firstName} {bio.lastName}</div>
          <div> {formattedDate}</div>
          <div> Birthplace: {bio.cityOfBirth}, {bio.countryOfBirth}</div>
        </>
        )
      }
    </div>
  )
}

export default Bio
