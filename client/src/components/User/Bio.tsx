import useGetUserBio from '../../Hooks/useGetUserBio';
import useGetImage from '../../Hooks/useGetImage';
import { useEffect, useState } from 'react';

import './user.css';

interface Props {
  id: string | undefined;
}

const Bio = (props: Props) => {
  const { userData, bio } = useGetUserBio(props.id);
  const { img, loading } = useGetImage(bio.profileImage);

  const formattedDate = bio.dateOfBirth ? new Date(bio.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div>
      {userData && (
        <div className='bio-details'>
          {loading ? (
            <div>Loading image...</div>
          ) : (
            <img src={img} className='bio-img' alt="User Profile" />
          )}
          <div>
            <div>{bio.initials}</div>
            <div>{bio.firstName} {bio.lastName}</div>
            <div>{formattedDate}</div>
            <div>Birthplace: {bio.cityOfBirth}, {bio.countryOfBirth}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;