import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {Route, Routes, Link} from 'react-router-dom'

import Home from '../Home/Index'
import TracksList from './TracksList'
import SeasonsList from './Seasons'
import DriversList from './DriversList'


const Nav = () => {
//   return (
//     <>
//       <div>
//         <Link to='/'>CGR Racing League</Link>
//         <Link to='/'>Home</Link>
//         <SeasonsList />
//         <TracksList />
//         <DriversList />


//       </div>
//       <Routes>
//           <Route path='/' element={<Home />}/>
//       </Routes>
//     </>
//   )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <Button id="basic-button">
          <Link to='/' >Home</Link>
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Seasons
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </div>

      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>

    </>
  );
}

export default Nav