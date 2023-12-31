import {React, useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import "./FullActivity.scss";
import {getData} from "../../tools/data";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, ClockFill, CalendarEventFill, XCircleFill, CaretLeftFill, CaretRightFill, CursorFill} from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

import DivCarusel from '../DivCarusel/DivCarusel';

const FullActivity = (obj) => {
	const [item, setItem] = useState(obj.data.data.activities.filter(item=>item.id == obj.fullActivityId)[0]);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const [initialD, setInitialD] = useState(((windowSize.current[1])*2) + 'px');
	const [exitD, setExitD] = useState("-"+windowSize.current[1] + 'px');

	const getLatLonObject = (string) => {
		let res = {
			lat : string.split(",")[0],
			lon : string.split(",")[1]
		}
		return res;
	}

	let activities = [];
	Object.keys(obj.timeLine).forEach(dayKey => {
		Object.keys(obj.timeLine[dayKey]).forEach(timeKey => {
			Object.keys(obj.timeLine[dayKey][timeKey]).forEach(typeKey => {
				Object.keys(obj.timeLine[dayKey][timeKey][typeKey]).forEach(activityKey => {
					activities.push(obj.timeLine[dayKey][timeKey][typeKey][activityKey]);
				});
			});
		});
	});

	let sorted = activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
	const items = ["http://schedule.rotem/sites/default/files/2023-10/FB_IMG_1643905200420_0.jpg", "http://schedule.rotem/sites/default/files/2023-10/319034001_481974017373916_8865815498800768161_n_0.jpg"];

	const _zoomInToActivity = useCallback(() => {
		obj.displayChange(false);
	  }, [obj.displayChange]);

	  const nextActivity = useCallback(() => {

		setInitialD(((windowSize.current[1])*2) + 'px');
		setExitD("-"+windowSize.current[1] + 'px');


		let k = null;
		sorted.forEach((element, key) => {
			if(obj.fullActivityId == element.id){
				k = key;
			}
		});
		let index = k+1 >= (sorted.length) ? sorted[0].id : sorted[k+1].id;
		obj.setFullActivityId(index);
		setItem(obj.data.data.activities.filter(item=>item.id == index)[0]);

	  }, [obj.setFullActivityId, obj.fullActivityId]);

	  const prevActivity = useCallback(() => {


		setInitialD("-"+windowSize.current[1] + 'px');
		setExitD(((windowSize.current[1])*2) + 'px');

		
		let k = null;
		sorted.forEach((element, key) => {
			if(obj.fullActivityId == element.id){
				k = key;
			}
		});
		let index = k-1 == -1 ? sorted[(sorted.length-1)].id : sorted[k-1].id;
		obj.setFullActivityId(index);
		setItem(obj.data.data.activities.filter(item=>item.id == index)[0]);
	  }, [obj.setFullActivityId, obj.fullActivityId]);

	  const handleDragEnd = (event, info) => {
		if (info.offset.x < 0) {
		  	nextActivity();
		}else{
			prevActivity();
		}
	  };



	
	return(
		<div className="full_activity">
									<AnimatePresence 
            				mode='wait'
            			>
			<motion.div
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0 }}
				transition={{ duration: 0.4 }}
				style={{ height: windowSize.current[1] + 'px' }}
				>
				<div className="full_activity_container">
					<div
						className='full_activity_box'
						style={{ height: (windowSize.current[1]-40) + 'px' }}
						>
						<button className="preview" onClick={()=>prevActivity()}>
							<div className="preview_next_inner"><span className="button_icon"><CaretLeftFill/></span></div>
						</button>

						<div
						
								style={{
									overflow:"hidden",
									width:"100%"
								}}
						
						>

						
						<AnimatePresence 
            				mode='wait'
            			>
							<motion.div
								className="activity_info_box row"
								key={item.id}
								initial={{ x:  initialD}}
								animate={{ x: "0px" }}
								exit={{ x: exitD }}
								transition={{ duration: 0.5 }}
								drag="x"
								//dragConstraints={{ left: 0, right: 300 }}
								onDragEnd={handleDragEnd}

								style={{ height: (windowSize.current[1]-100) + 'px' }}

								>
									<div className='image_box col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4'>
										<div
											className='image_background'
											style={{background:`url(${item.image}) no-repeat center center`}}
										>
										</div>
									</div>
									<div className='info_box col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8'>
										<div className='title'>
											{item.title}
										</div>

										<div className='time'>
											<span className='time_item'><span className='icon'><CalendarEventFill/></span><span className='time_text'>{moment(item.day).format("D/M")}</span></span><span className='time_item'><span className='icon'><ClockFill/></span><span className='time_text'>{moment(item.start, "YYYY-MM-dd HH:mm").format("HH:mm")}-{moment(item.end, "YYYY-MM-dd HH:mm").format("HH:mm")}</span></span>
										</div>
										<div className='location'>
											<span className='location_item'><span className='icon'><GeoAltFill/></span><span className='location_text'>{obj.data.data.locations[item.location].title}</span></span><span className='location_item'><span className='icon'><CursorFill/></span><a className='location_text' href={'https://maps.google.com/?q=<'+getLatLonObject(obj.data.data.locations[178].lat_lon).lat+'>,<'+getLatLonObject(obj.data.data.locations[178].lat_lon).lon+'>'}>Navigate</a></span>


										</div>			

										<div className='description'>
											{item.description}
										</div>

										<div className='type_box'>
											<span className='icon'><MusicNoteBeamed/></span> <span className='type_name'>{obj.data.data.activity_type[item.type].title}</span>
										</div>
									</div>

								<div className='one_button'>
									<button onClick={()=>obj.getShowFullActivity(false)}><span className='icon'><XCircleFill/></span></button>
								</div>
							</motion.div>
						</AnimatePresence>


								</div>


						<button className="next" onClick={()=>nextActivity()}>
							<div className="preview_next_inner"><span className="button_icon"><CaretRightFill/></span></div>
						</button>
					</div>
				</div>
			</motion.div>
			</AnimatePresence>
		</div>
	);
};
export default FullActivity;
