import {React, useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import "../ActivityTeaser/ActivityTeaser.scss";
import {getData} from "../../tools/data";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

const FullActivity = (id) => {
	const [data, setData] = useState(getData());

	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	
	console.log(windowSize.current[0]);

    let item = data.activeities.filter(item=>item.id == id.id)[0];

    console.log(id);


	const _zoomInToActivity = useCallback(() => {
		id.displayChange(false);
	  }, [id.displayChange]);
	
	return(
		<motion.div 

		
		>
		<div className="ActivityTeaser">
			
			<div className='activity'>
				<div className='time info_item'>
					<div className='time_item'>
						{moment(item.start, "YYYY-MM-dd HH:mm").format("HH:mm")}
					</div>
					<div className='icon'>
						<ArrowDown/>
					</div>
					<div className='time_item'>
						{moment(item.end, "YYYY-MM-dd HH:mm").format("HH:mm")}
					</div>
				</div>
				<div className='image_box info_item'>
					<div
						className='image_background'
						style={{background:`url(${item.image}) no-repeat center center`}}
					>
					</div>
				</div>
				<div className='title_and_description info_item'>
					<div className='title'>
						{item.title}
					</div>

					<div className='type_box'>
						<span className='icon'><MusicNoteBeamed/></span> <span className='type_name'>{data.activity_type[item.type].title}</span>
					</div>

					<div className='location'>
						<span className='icon'><GeoAltFill/></span> <span className='location_text'>{data.locations[item.location].title}</span>
					</div>



					<div className='description'>
						{item.description}
					</div>



                    <button onClick={()=>_zoomInToActivity()}>X</button>


				</div>
			</div>
		</div>
		</motion.div>
	);
};
export default FullActivity;
