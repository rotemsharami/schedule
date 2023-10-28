import {React, useState, useCallback} from 'react';
import './Header.scss';
import {getData} from "../../tools/data";
import {List, ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, ClockFill, CalendarEventFill, XCircleFill, CaretLeftFill, CaretRightFill, CursorFill} from "react-bootstrap-icons";

const Header = (info) => {
const [data, setData] = useState(getData());

const menuToggle = useCallback(() => {
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
				{info.showMenu ? <XCircleFill/> : <List />} 
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
