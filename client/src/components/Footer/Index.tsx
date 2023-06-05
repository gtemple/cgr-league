import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import About from '../About';

import './footer.css';

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:giordanotemple@gmail.com';
  };

  return (
    <div>
      <Routes>
        <Route path='/about' element={<About />} />
      </Routes>

      <div className='footer'>
        <div>
          <h4>Learn More</h4>
          <div><Link to='/about' className='link'>About CGR</Link></div>
          <div><Link to='/about' className='link'>Admin</Link> </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div onClick={handleEmailClick} style={{ cursor: 'pointer' }}>
            giordanotemple@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;