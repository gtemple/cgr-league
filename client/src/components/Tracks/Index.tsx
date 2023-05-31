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

  const totalLapsAndDistance = (data: any[]): {'distance': number; 'laps': number} => {
    let stats = {
      'distance': 0,
      'laps': 0
    };
    data.forEach(result => {
      stats.distance += (result.tracks.distance * result.race_distance)
      stats.laps += result.race_distance
    })
    return stats
  }

  if (!trackData || trackData.length === 0) {
    return null; // Return null or show a loading state if trackData is not available
  }

  let info = totalLapsAndDistance(trackData)
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className='track-banner'>
            <img className='track-img  bottom-border' src={img2} alt="Track Image" />
            <div className='track-title'>{(trackData[0]?.tracks?.name).toUpperCase()}</div>
          </div>
          <div className='track-container'>
            <div className='track-lvl-1'>
              <img src={img} className='track-layout' alt="Track Layout" />
              <div className='track-details'>
                <h4>Location</h4>
                <h3>{trackData[0].tracks.city}, {trackData[0].tracks.country}</h3>
                <h4>Track Distance</h4>
                <h3>{trackData[0].tracks.distance} meters</h3>
              </div>
              <div className='track-details'>
                {trackData && (
                  <div className='general-stats'>
                    <div>Laps driven: {info.laps}</div>
                    <div>Distance driven: {(info.distance / 1000).toFixed(1)} KM</div>
                  </div>

                )}
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