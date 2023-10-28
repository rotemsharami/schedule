import React from 'react';
import PropTypes from 'prop-types';
import './NewsFlash.scss';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, FilterCircleFill, ClockFill} from "react-bootstrap-icons";


const NewsFlash = (item) => {

	

	return(
	<div className="NewsFlash">
		<div className='general_title'>
			<div className='general_title_text'>News Flash</div>
		</div>
		<div className='news_flas_list'>

		{item.data.data.news_flash.map((newsFlashItem) =>  
			<div className='news_flas_item'>
				<div className='headlines'>{newsFlashItem.title}</div>
				<div className='time'><span className='icon'><ClockFill/></span> <span className='datetime'>{newsFlashItem.time}</span></div>
				<div className='description' dangerouslySetInnerHTML={ { __html: newsFlashItem.text}} />
			</div>	
		)}





		</div>



  	</div>
	);
}

NewsFlash.propTypes = {};

NewsFlash.defaultProps = {};

export default NewsFlash;
