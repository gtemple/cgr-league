import * as React from 'react';
import {Route, Routes, Link} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Home from '../Home/Index'
import TracksList from './TracksList'
import SeasonsList from './Seasons'
import DriversList from './DriversList'

import getUsers from '../../Hooks/useGetUsers';
import getSeasons from '../../Hooks/useGetSeasons';
import { UserInfo } from 'os';


const Navigation = () => {
  const { userData } = getUsers();
  const { seasonData } = getSeasons();


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

  interface Seasons {
    id: number,
    game: string
  }

  const displayUsers = (users: Users[]):React.ReactNode => {
    return users.map((user:Users) => {
      return (
        <NavDropdown.Item key={user.id}>{user.first_name} {user.last_name}</NavDropdown.Item>
      )
    })
  }

  const displaySeasons = (seasons: Seasons[]):React.ReactNode => {
    return seasons.map((season:Seasons) => {
      console.log('hey', season)
      return (
        <NavDropdown.Item key={season.id}>Season {season.id}</NavDropdown.Item>
      )
    })
  }

  return (
    <>
  
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <NavDropdown title="Seasons" id="collasible-nav-dropdown">
              {seasonData && displaySeasons(seasonData)}
            </NavDropdown>
            <NavDropdown title="Drivers" id="collasible-nav-dropdown">
              {userData && displayUsers(userData)}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>

    </>
  );
}

export default Navigation