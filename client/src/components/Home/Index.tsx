import CurrentSeasonStats from './CurrentSeasonStats/Index'
import CurrentSeasonSchedule from './CurrentSeasonSchedule/Index'

import useGetSeason from '../../Hooks/useGetSeason'


import './home.css'

import background from '../../assets/background/ferrari.background.jpeg'



const Home = () => {
const currentSeason = 4;
const { seasonData } = useGetSeason(currentSeason);


  return (
    <div>
      <div>
        <img src={background} className='background-image bottom-border' />
      </div>
      <div>
        <CurrentSeasonStats seasonData={seasonData} currentSeason={currentSeason}/>
        <CurrentSeasonSchedule seasonData={seasonData} currentSeason={currentSeason} />
      </div>
    </div>
  )
}

export default Home