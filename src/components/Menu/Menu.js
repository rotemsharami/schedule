import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Menu.scss';

import {CartFill, MegaphoneFill, BuildingsFill, CalendarWeek, ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, ClockFill, CalendarEventFill, XCircleFill, CaretLeftFill, CaretRightFill, CursorFill} from "react-bootstrap-icons";


const Menu = (item) => {

	const windowSize = useRef([window.innerWidth, window.innerHeight]);

	



	console.log(windowSize);

	return(
		<div
			className="Menu"
			style={{ height: (windowSize.current[1]) -60 + 'px' }}
		>
			<div className='items'>
				<button className='item'>
					<div className='icon'><span className="the_icon"><CalendarWeek/></span></div>
					<div className='text'>Schedule</div>
				</button>
			</div>
			<div className='items'>
				<button className='item'>
					<div className='icon'><span className="the_icon"><MegaphoneFill/></span></div>
					<div className='text'>News Flash</div>
				</button>
			</div>
			<div className='items'>
				<button className='item'>
					<div className='icon'><span className="the_icon"><BuildingsFill/></span></div>
					<div className='text'>Hotel Information</div>
				</button>
			</div>

			<div className='items'>
				<button className='item'>
					<div className='icon'><span className="the_icon"><CartFill/></span></div>
					<div className='text'>Shoping</div>
				</button>
			</div>




		</div>
	);
};

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
