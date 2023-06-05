import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import About from '../About';


import './footer.css'

const Footer = () => {
  return (
    <div>
      <Routes>
        <Route path='/about' element={<About />} />
      </Routes>
      
      <div className='footer'>
        <Link to='/about'>About</Link>
      </div>
    </div>
  );
};


export default Footer