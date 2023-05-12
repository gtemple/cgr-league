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
  const { userData } = useGetUserBio(props.id);
  const { userData: userData2 } = useGetUserRaces(props.id);
  const { img, loading } = useGetImage(userData?.profile_image, 'driver' || '');
  const { img: img2, loading: loading2 } =  useGetImage(userData?.country_of_representation, 'flag' || '');

  const formattedDate = userData?.date_of_birth ? new Date(userData.date_of_birth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  const calculateAge = () => {
    if (userData?.date_of_birth) {
      const birthDate = new Date(userData.date_of_birth);
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
      {userData && userData2 && (
        <div>
          <div className='bio-details'>
            {loading ? (
              <div>Loading image...</div>
            ) : (
              <img src={img} className='bio-img' alt="User Profile" />
            )}
            <div>
              <div className='bio-name'>{userData.first_name ? userData.first_name.toUpperCase() : 'loading'} {userData.last_name ? userData.last_name.toUpperCase() : 'loading'}</div>
              <div>
                <div>{formattedDate} — {calculateAge()} years old</div>
                <div>{userData.city_of_birth}, {console.log('here', userData)} {userData.country_of_birth}</div>
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
              <img src={img2} className='bio-flag' alt={userData.country_of_representation} />
            )}
            <div>{userData.initials}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;