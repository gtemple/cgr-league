import * as React from 'react';
import {Route, Routes, Link} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Home from '../Home/Index'
import User from '../User/Index';
import Tracks from '../Tracks/Index';
import Season from '../Season/Index';

import useGetUsers from '../../Hooks/useGetUsers';
import useGetSeasons from '../../Hooks/useGetSeasons';
import useGetTracks from '../../Hooks/useGetTracks';

import './navigation.css'


const Navigation = () => {
  const { userData } = useGetUsers();
  const { seasonData } = useGetSeasons();
  const { tracksData } = useGetTracks();

  interface Seasons {
    id: number,
    game: string
  }
  interface Users {
    id: number,
    first_name: string,
    last_name: string,
    initials: string,
    date_of_birth: string,
    city_of_birth: string,
    country_of_birth: string,
    profile_image: string | null
  }

  interface Tracks {
    id: number,
    name: string,
    city: string,
    country: string,
    distance: number
  }

  const displaySeasons = (seasons: Seasons[]):React.ReactNode => {
    return seasons.map((season:Seasons) => {
      return (
        <NavDropdown.Item href={`/seasons/${season.id}`} key={season.id}>Season {season.id}</NavDropdown.Item>
      )
    })
  }

  const displayUsers = (users: Users[]):React.ReactNode => {
    return users.sort((a, b) => a.last_name.localeCompare(b.last_name)).map((user:Users, index) => {
      return (
        <div className='users'>
          <NavDropdown.Item href={`/drivers/${user.id}`} key={user.id}>{user.first_name} {user.last_name}</NavDropdown.Item>
        </div>
      )
    })
  }


  const displayTracks = (tracks: Tracks[]):React.ReactNode => {
    return tracks.sort((a, b) => a.name.localeCompare(b.name)).map((track:Tracks) => {
      return (
        <NavDropdown.Item href={`/tracks/${track.id}`} key={track.id}>{track.name}</NavDropdown.Item>
      )
    })
  }

  return (
    <>
  
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">CGR Racing League</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Seasons" id="collasible-nav-dropdown">
              {seasonData && displaySeasons(seasonData)}
            </NavDropdown>
            <NavDropdown title="Drivers" id="collasible-nav-dropdown" className='dropdown-menu-columns-2'>
              {userData && displayUsers(userData)}
            </NavDropdown>
            <NavDropdown title="Tracks" id="collasible-nav-dropdown">
              {tracksData && displayTracks(tracksData)}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tracks/:id' element={<Tracks />} />
        <Route path='/drivers/:id' element={<User />} />
        <Route path='/seasons/:id' element={<Season />} />

      </Routes>

    </>
  );
}

export default Navigation