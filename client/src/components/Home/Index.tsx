import { useEffect, useState } from 'react';
import CurrentSeasonStats from './CurrentSeasonStats/Index';
import CurrentSeasonSchedule from './CurrentSeasonSchedule/Index';
import useGetSeason from '../../Hooks/useGetSeason';
import useGetAllRaceData from '../../Hooks/useGetAllRaceData';
import TrackData from '../../classes/TrackData';
import './home.css';
import background from '../../assets/background/ferrari.background.jpeg';

const Home = () => {
  const currentSeason = 6;
  const { seasonData } = useGetSeason(currentSeason);
  const { raceData } = useGetAllRaceData();
  const [humanStats, setHumanStats] = useState({
    laps: 0,
    distance: 0
  });

  const calculateHumanStates = (data: TrackData[]) => {
    console.log(data)
    const stats = {
      laps: 0,
      distance: 0
    };

    data.forEach((race) => {
      if (race.users.human === true && race.position !== 0) {
        stats.laps += race.race_distance;
        stats.distance += (race.tracks.distance * race.race_distance);
      }
    });

    return stats;
  };

  useEffect(() => {
    if (raceData) {
      const stats = calculateHumanStates(raceData);
      setHumanStats(stats);
    }
  }, [raceData]);

  return (
    <div>
      <div>
        <img src={background} className="background-image bottom-border" alt="background" />
        <div className='home-title'>THE 3 PARTICIPANTS OF CGR LEAGUE HAVE DRIVEN A COMBINED <span className='emphasis'>{humanStats.laps} LAPS</span> AND <span className='emphasis'>{(humanStats.distance / 1000).toFixed(0)} KM</span> IN RACES</div>
      </div>
      <div>
        
        <CurrentSeasonStats seasonData={seasonData} currentSeason={currentSeason} />
        <CurrentSeasonSchedule seasonData={seasonData} currentSeason={currentSeason} />
      </div>
    </div>
  );
};

export default Home;