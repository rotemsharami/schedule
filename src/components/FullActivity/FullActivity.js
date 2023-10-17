import {React, useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import "./FullActivity.scss";
import {getData} from "../../tools/data";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, ClockFill, CalendarEventFill, XCircleFill, CaretLeftFill, CaretRightFill} from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

import DivCarusel from '../DivCarusel/DivCarusel';

const FullActivity = (obj) => {
	//const [data, setData] = useState(getData());

	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	
	//console.log(obj.data.data.activities);

    let item = obj.data.data.activities.filter(item=>item.id == obj.fullActivityId)[0];
	let activities = [];
	Object.keys(obj.timeLine).forEach(dayKey => {
		Object.keys(obj.timeLine[dayKey]).forEach(typeKey => {
			Object.keys(obj.timeLine[dayKey][typeKey]).forEach(activityKey => {
				activities.push(obj.timeLine[dayKey][typeKey][activityKey]);
			});
		});
	});

	let sorted = activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});

	
	console.log(sorted);

	
	



	// const nextActivity = () => {
	// 	console.log(id);
	// }

	const previewActivity = () => {
	
	}

	const items = ["http://schedule.rotem/sites/default/files/2023-10/FB_IMG_1643905200420_0.jpg", "http://schedule.rotem/sites/default/files/2023-10/319034001_481974017373916_8865815498800768161_n_0.jpg"];



	const _zoomInToActivity = useCallback(() => {
		obj.displayChange(false);
	  }, [obj.displayChange]);


	  const nextActivity = useCallback(() => {
		let k = null;
		sorted.forEach((element, key) => {
			if(obj.fullActivityId == element.id){
				k = key;
			}
		});
		let index = k+1 >= (sorted.length) ? sorted[0].id : sorted[k+1].id;
		obj.setFullActivityId(index);
		console.log(k+1);
	  }, [obj.setFullActivityId, obj.fullActivityId]);

	  const prevActivity = useCallback(() => {
		
		let k = null;
		sorted.forEach((element, key) => {
			if(obj.fullActivityId == element.id){
				k = key;
			}
		});
		let index = k-1 == -1 ? sorted[(sorted.length-1)].id : sorted[k-1].id;
		obj.setFullActivityId(index);
	  }, [obj.setFullActivityId, obj.fullActivityId]);


	
	return(
		<div
		
			className="full_activity"
		
		
		>
			<motion.div



				initial={{ scale: 0.0 }}
				animate={{scale: 1}}
				exit={{ scale: 0.0 }}
				transition={{ duration: 0.2 }}

				style={{ height: windowSize.current[1] + 'px' }}
				
				>
				<div className="full_activity_container">
					<div
						className='full_activity_box'
						style={{ height: (windowSize.current[1]-40) + 'px' }}
						>

						{/* <DivCarusel items={items}/> */}

						<button className="preview" onClick={()=>prevActivity()}>
							<div className="preview_next_inner"><span className="button_icon"><CaretLeftFill/></span></div>
						</button>

						<AnimatePresence 
            				mode='wait'
            			>
			


						<motion.div
							className="activity_info_box row"
							key={obj.id}
							initial={{ x: "-"+windowSize.current[1] + 'px' }}
							animate={{ x: "0px" }}
							exit={{ x: ((windowSize.current[1])*2) + 'px' }}
							transition={{ duration: 0.5 }}
							
							
							>
							<div className='image_box col-4'>
								<div
									className='image_background'
									style={{background:`url(${item.image}) no-repeat center center`}}
								>
								</div>
							</div>
							<div className='info_box col-8'>
								<div className='title'>
									{item.title}
								</div>

								<div className='time'>
									<span className='icon'><CalendarEventFill/></span> {moment(item.day).format("D/M")} <span className='icon'><ClockFill/></span> {moment(item.start, "YYYY-MM-dd HH:mm").format("HH:mm")}-{moment(item.end, "YYYY-MM-dd HH:mm").format("HH:mm")}
								</div>
								<div className='location'>
									<span className='icon'><GeoAltFill/></span> <span className='location_text'>{obj.data.data.locations[item.location].title}</span>
								</div>			

								<div className='description'>
									{item.description}
								</div>

								<div className='type_box'>
									<span className='icon'><MusicNoteBeamed/></span> <span className='type_name'>{obj.data.data.activity_type[item.type].title}</span>
								</div>
							</div>

							<div className='one_button'>
								<button onClick={()=>_zoomInToActivity()}><span className='icon'><XCircleFill/></span></button>
							</div>


						</motion.div>




						</AnimatePresence>


						<button className="next" onClick={()=>nextActivity()}>
							<div className="preview_next_inner"><span className="button_icon"><CaretRightFill/></span></div>
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
export default FullActivity;
