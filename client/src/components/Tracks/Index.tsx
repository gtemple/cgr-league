import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useGetTrack from '../../Hooks/useGetTrackData';
import useGetImage from '../../Hooks/useGetImage';

import './tracks.css'

import Track from './Track';

const Tracks = () => {
  const { id } = useParams();
  const { trackData } = useGetTrack(id);
//@ts-expect-error

  const { img, loading } = useGetImage(trackData[0]?.tracks?.layout, 'layout' || '');
//@ts-expect-error
  const { img: img2, loading: loading2 } = useGetImage(trackData[0]?.tracks?.img, 'track-image' || '');

  if (!trackData || trackData.length === 0) {
    return null; // Return null or show a loading state if trackData is not available
  }

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className='track-container'>
            <img className='track-img' src={img2} alt="Track Image" />
            <div className='track-title'>{trackData[0]?.tracks?.name}</div>
          </div>
          <img src={img} className='track-layout' alt="Track Layout" />
          {/*//@ts-expect-error */}
          <Track trackData={trackData} />
          <div>Grouped data by season and user</div>
        </div>
      )}
    </div>
  );
};

export default Tracks;