import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Content.scss';
import General from "../General/General"
import Schedule from "../Schedule/Schedule"
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Content = (item) => {

	const [selectedPage, setSelectedPage] = useState("Schedule");

	return(
		<div className="Content">
			{selectedPage == "Schedule" ? 
			<Schedule data={item.data}></Schedule>
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
