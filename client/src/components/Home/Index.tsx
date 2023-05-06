import CurrentSeasonStats from './CurrentSeasonStats/Index'
import CurrentSeasonSchedule from './CurrentSeasonSchedule/Index'

import './home.css'

import background from '../../assets/background/ferrari.background.jpeg'



const Home = () => {


  return (
    <div>
      <div>
        <img src={background} className='background-image' />
      </div>
      <CurrentSeasonStats />
      {/* <CurrentSeasonSchedule /> */}

    </div>
  )
}

export default Home