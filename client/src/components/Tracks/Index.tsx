import { useParams } from 'react-router-dom';
import useGetTrack from '../../Hooks/useGetTrackData';
import useGetImage from '../../Hooks/useGetImage';

import './tracks.css'

import Track from './Track';
import AllTime from './AllTime';

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
          <div className='track-banner'>
            <img className='track-img  bottom-border' src={img2} alt="Track Image" />
            <div className='track-title'>{trackData[0]?.tracks?.name}</div>
          </div>
          <div className='track-container'>
            <div className='track-lvl-1'>
              <img src={img} className='track-layout' alt="Track Layout" />
              <div>
                <div>City: {trackData[0].tracks.city}</div>
                <div>Country: {trackData[0].tracks.country}</div>
                <div>Track Distance: {trackData[0].tracks.distance} meters</div>
              </div>
           </div>

            {/*// @ts-ignore */}
              <AllTime trackData={trackData}/>
            {/*//@ts-expect-error */}
            <Track trackData={trackData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracks;