import {React, useState, useCallback} from 'react';
import './Header.scss';
import { List } from "react-bootstrap-icons";
import {getData} from "../../tools/data";

const Header = (info) => {
const [data, setData] = useState(getData());

const menuToggle = useCallback(() => {
	console.log(info.showMenu);
	info.setShowMenu(info.showMenu ? false : true);
	
}, [info.setShowMenu, info.showMenu]);


return(
	<div className="header">
		{info.data != undefined ?
		<div
			className='col-12 row header_box'
		>
		<div className='menu_button col-2'>
			<button onClick={() => {menuToggle()}}>
				<List />
			</button>
		</div>
		<div className='logo_and_app_name col-8'>{info.data.title}</div>
			<div className='languag col-2'>he</div>
		</div>
		: null }
	</div>
);
};

export default Header;
