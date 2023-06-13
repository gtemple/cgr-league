import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


import Home from '../Home/Index'
import User from '../User/Index';
import Tracks from '../Tracks/Index';
import Season from '../Season/Index';
import Teams from '../Teams/Index'

import useGetUsers from '../../Hooks/useGetUsers';
import useGetSeasons from '../../Hooks/useGetSeasons';
import useGetTracks from '../../Hooks/useGetTracks';
import useGetTeams from '../../Hooks/useGetTeams';

import './navigation.css'



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

interface Teams {
  id: number;
  team_name: string;
  team_img: string | null;
}


const Navigation = () => {
  const { userData } = useGetUsers();
  const { seasonData } = useGetSeasons();
  const { tracksData } = useGetTracks();
  const { teamsData } = useGetTeams();

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
        <div className='users' key={user.id}>
          <NavDropdown.Item href={`/drivers/${user.id}`}>{user.first_name} {user.last_name}</NavDropdown.Item>
        </div>
      )
    })
  }
  
  const displayTracks = (tracks: Tracks[]):React.ReactNode => {
    return tracks.sort((a, b) => a.name.localeCompare(b.name)).map((track:Tracks) => {
      return (
        <Dropdown.Item className="nav-drop" href={`/tracks/${track.id}`} key={track.id}>{track.name}</Dropdown.Item>
      )
    })
  }

  const displayTeams = (teams: Teams[]):React.ReactNode => {
    return teams.sort((a, b) => a.team_name.localeCompare(b.team_name)).map((team:Teams) => {
      return (
        <Dropdown.Item className="nav-drop" href={`/tracks/${team.id}`} key={team.id}>{team.team_name}</Dropdown.Item>
      )
    })
  }

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const menu = event.currentTarget.querySelector('.nav-drop-menu');
    menu?.classList.toggle('show');
  };
  

  return (
    <>
  
      <Navbar className='nav-bar' collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">CGR Racing League</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Dropdown as={ButtonGroup} title="Tracks" id="seasons-dropdown">
              <Dropdown.Toggle className='nav-button' id="seasons-toggle">Seasons</Dropdown.Toggle>
              <Dropdown.Menu className="nav-drop">
                {seasonData && displaySeasons(seasonData)}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup} title="Drivers" id="drivers-dropdown" onClick={handleDropdownClick}>
        <Dropdown.Toggle className='nav-button' id="drivers-toggle">Drivers</Dropdown.Toggle>
        <Dropdown.Menu className="nav-drop-driver nav-drop-menu">
          {userData && displayUsers(userData)}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown as={ButtonGroup} title="Tracks" id="tracks-dropdown" onClick={handleDropdownClick}>
        <Dropdown.Toggle className='nav-button' id="tracks-toggle">Tracks</Dropdown.Toggle>
        <Dropdown.Menu className="nav-drop-track nav-drop-menu">
          {tracksData && displayTracks(tracksData)}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown as={ButtonGroup} title="Teams" id="teams-dropdown" onClick={handleDropdownClick}>
        <Dropdown.Toggle className='nav-button' id="tracks-toggle">Teams</Dropdown.Toggle>
        <Dropdown.Menu className="nav-drop-track nav-drop-menu">
          {teamsData && displayTeams(teamsData)}
        </Dropdown.Menu>
      </Dropdown>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tracks/:id' element={<Tracks />} />
        <Route path='/drivers/:id' element={<User />} />
        <Route path='/seasons/:id' element={<Season />} />
        <Route path='/teams/:id' element={<Teams />} />
      </Routes>

    </>
  );
}

export default Navigation