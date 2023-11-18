import React from 'react';
import PropTypes from 'prop-types';
import './NewsFlashItem.scss';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, FilterCircleFill, ClockFill} from "react-bootstrap-icons";
import { motion } from 'framer-motion';

const NewsflashItem = ({ text }) => {
	return (
	  <motion.div
	  	className='NewsflashItem'
		initial={{ opacity: 0, x: '-100%' }}
		animate={{ opacity: 1, x: 0 }}
		exit={{ opacity: 0, x: '100%' }}
		transition={{ duration: 0.6 }}
	  >
		<Activity/> {text}
	  </motion.div>
	);
  };
  
  export default NewsflashItem;