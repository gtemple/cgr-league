import useGetUserBio from '../../Hooks/useGetUserBio'
import useImage from '../../Hooks/useImage'
import { useEffect, useState } from 'react'

import './user.css'

interface Props {
  id: string | undefined
}

const Bio = (props: Props) => {
  const { userData, bio } = useGetUserBio(props.id);

  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (bio.profileImage) {
          const importedImage = await import(`../../assets/driver-profiles/${bio.profileImage}.jpg`);
          setImg(importedImage.default);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load image:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [bio.profileImage]);

  const formattedDate = bio.dateOfBirth ? new Date(bio.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  return (
    <div>
      {userData && (
        <>
          {img && <img src={img} alt="User Profile" />}
          <div>{bio.initials}</div>
          <div>{bio.firstName} {bio.lastName}</div>
          <div>{formattedDate}</div>
          <div>Birthplace: {bio.cityOfBirth}, {bio.countryOfBirth}</div>
        </>
      )}
    </div>
  )
}

export default Bio
