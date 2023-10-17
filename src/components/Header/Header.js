import {React, useState} from 'react';
import './Header.scss';
import { List } from "react-bootstrap-icons";
import {getData} from "../../tools/data";


const Header = (info) => {
  const [data, setData] = useState(getData());





  

  return(
  <div className="header">
    {info.data != undefined ?
    <div
      className='col-12 row header_box'


      >
      <div className='menu_button col-2'><List /></div>
      <div className='logo_and_app_name col-8'>{info.data.data.general_data.title}</div>
      <div className='languag col-2'>he</div>
    </div>
    : null }
  </div>
  );
};

export default Header;
