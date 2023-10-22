import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Menu.scss';

const Menu = (item) => {

	const windowSize = useRef([window.innerWidth, window.innerHeight]);

	return(
		<div
			className="Menu"
			style={{ height: (windowSize.current[1]) + 'px' }}
			
			>
			Mnue
		</div>
	);
};

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
