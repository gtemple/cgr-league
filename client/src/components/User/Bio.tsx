import useGetUserBio from '../../Hooks/useGetUserBio';
import useGetImage from '../../Hooks/useGetImage';
import useGetUserRaces from '../../Hooks/useGetUserRaces';
import * as _ from "../../helpers/individualStats";
import { useEffect, useState } from 'react';

import './user.css';

interface Props {
  id: string | undefined;
}

const Bio = (props: Props) => {
  const { userData, bio } = useGetUserBio(props.id);
  const { userData: userData2 } = useGetUserRaces(props.id);
  const { img, loading } = useGetImage(bio?.profileImage, 'driver' || '');
  const { img: img2, loading: loading2 } =  useGetImage(bio?.countryOfRepresentation, 'flag' || '');

  const formattedDate = bio?.dateOfBirth ? new Date(bio.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  const calculateAge = () => {
    if (bio?.dateOfBirth) {
      const birthDate = new Date(bio.dateOfBirth);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();

      // Adjust age if the current date is before the birth month/day
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    }
    return 0;
  };

  return (
    <div className='bio'>
      {userData && userData2 && bio && (
        <div>
          <div className='bio-details'>
            {loading ? (
              <div>Loading image...</div>
            ) : (
              <img src={img} className='bio-img' alt="User Profile" />
            )}
            <div>
              <div className='bio-name'>{bio.firstName ? bio.firstName.toUpperCase() : 'loading'} {bio.lastName ? bio.lastName.toUpperCase() : 'loading'}</div>
              <div>
                <div>{formattedDate} — {calculateAge()} years old</div>
                <div>{bio.cityOfBirth}, {bio.countryOfBirth}</div>
                <hr className="solid"></hr>
                <div className='basic-stats'>
                  <div>Races – {userData2.length}</div>
                  <div>Laps – {_.lifetimeLaps(userData2)}</div>
                  <div>Distance – {_.lifetimeDistance(userData2)/100} KM</div>
                </div>
              </div>
            </div>
          </div>
          <div className='bio-secondary'>
            {loading ? (
              <div>Loading image...</div>
            ) : (
              <img src={img2} className='bio-flag' alt={bio.countryOfRepresentation} />
            )}
            <div>{bio.initials}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;