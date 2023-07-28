import React from 'react';
import PropTypes from 'prop-types';
import './Content.scss';
import General from "../General/General"
import Schedule from "../Schedule/Schedule"


import { Routes, Route, BrowserRouter } from 'react-router-dom';
const Content = () => (


  
  <div className="Content">

    
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<General />} />
        <Route path="/Schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>


    


  </div>
);

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
