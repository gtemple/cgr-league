import React from 'react'
import {Route, Routes, Link} from 'react-router-dom'

import Home from '../Home/Index'
import TracksList from './TracksList'
import SeasonsList from './Seasons'
import DriversList from './DriversList'

const Nav = () => {
  return (
    <>
      <div>
        <Link to='/'>CGR Racing League</Link>
        <Link to='/'>Home</Link>
        <SeasonsList />
        <TracksList />
        <DriversList />


      </div>
      <Routes>
          <Route path='/' element={<Home />}/>
      </Routes>
    </>
  )
}

export default Nav