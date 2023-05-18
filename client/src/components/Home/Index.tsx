import CurrentSeasonStats from './CurrentSeasonStats/Index'
import CurrentSeasonSchedule from './CurrentSeasonSchedule/Index'
import useGetSeason from '../../Hooks/useGetSeason'


import './home.css'

import background from '../../assets/background/ferrari.background.jpeg'



const Home = () => {
const currentSeason = 2;
const { seasonData } = useGetSeason(currentSeason);


  return (
    <div>
      <div>
        <img src={background} className='background-image bottom-border' />
      </div>
      <div className='surround'>
      </div>
      <div>
        <CurrentSeasonStats seasonData={seasonData} currentSeason={currentSeason}/>
        <CurrentSeasonSchedule seasonData={seasonData} currentSeason={currentSeason} />
      </div>
      <div className='surround'>
      </div>

    </div>
  )
}

export default Home