import {React, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './NewsFlashTop.scss';
import { motion, AnimatePresence } from 'framer-motion';


import NewsflashItem from '../NewsFlashItem/NewsFlashItem';

import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, FilterCircleFill, ClockFill} from "react-bootstrap-icons";




const NewsFlashTop = (info) => {
	const [currentItemIndex, setCurrentItemIndex] = useState(0);
  
	

	

	useEffect(() => {
	  const interval = setInterval(() => {
		setCurrentItemIndex((prevIndex) => (prevIndex + 1) % info.data.data.news_flash.length);
	  }, 5000);
  
	  return () => clearInterval(interval);
	}, []);
  
	return (
	  <div className='NewsFlashTop'>
		<AnimatePresence initial={false} mode='wait'>
		  <motion.div
		  	className='NewsflashItemBox'
			key={currentItemIndex}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8 }}
		  >
			<NewsflashItem text={info.data.data.news_flash[currentItemIndex].title} />
		  </motion.div>
		</AnimatePresence>
	  </div>
	);
  };
  

export default NewsFlashTop;
