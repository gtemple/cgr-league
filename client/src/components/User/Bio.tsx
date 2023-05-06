import React from 'react'
import useGetUserBio from '../../Hooks/useGetUserBio'

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
          <div>{bio.profileImage}</div>
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
