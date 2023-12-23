import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Content.scss';
import General from "../General/General"
import Schedule from "../Schedule/Schedule"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NewsFlash from '../NewsFlash/NewsFlash';

const Content = (item) => {

	

	


	return(
		<div className="Content">
			{item.selectedPage == "Schedule" ? 
			<Schedule
				data={item.data}
				getShowFullActivity={item.getShowFullActivity}
				getFullActivityData={item.getFullActivityData}
				timeLine={item.timeLine}
				></Schedule>
			: null}

			{item.selectedPage == "NewsFlash" ? 
			<NewsFlash data={item.data}></NewsFlash>
			: null}

			{item.selectedPage == "General" ? 
			<General data={item.data}></General>
			: null}

			


			{/* <BrowserRouter>
			<Routes>
			<Route path="/" element={<General />} />
			<Route path="/Schedule" element={<Schedule data={item.data}/>} />
			</Routes>
			</BrowserRouter> */}
			
		</div>
	);
};

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
