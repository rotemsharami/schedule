import {React, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import './ActivityTeaser.scss';
import {getData} from "../../tools/data";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity } from "react-bootstrap-icons";

const ActivityTeaser = (item) => {
	const [data, setData] = useState(getData());

	

	const _zoomInToActivity = useCallback(() => {
		item.displayChange(true);
		item.idActivity(item.item.id);
	  }, [item.displayChange, item.idActivity]);


	
	return(
		<button className="ActivityTeaser" onClick={()=>_zoomInToActivity()}>
			
			<div className='activity'>
				<div className='time info_item'>
					<div className='time_item'>
						{moment(item.item.start, "YYYY-MM-dd HH:mm").format("HH:mm")}
					</div>
					<div className='icon'>
						<ArrowDown/>
					</div>
					<div className='time_item'>
						{moment(item.item.end, "YYYY-MM-dd HH:mm").format("HH:mm")}
					</div>
				</div>
				<div className='image_box info_item'>
					<div
						className='image_background'
						style={{background:`url(${item.item.image}) no-repeat center center`}}
					>
					</div>
				</div>
				<div className='title_and_description info_item'>
					<div className='title'>
						{item.item.title}
					</div>

					<div className='type_box'>
						<span className='icon'><MusicNoteBeamed/></span> <span className='type_name'>{item.data.data.activity_type[item.item.type].title}</span>
					</div>

					<div className='location'>
						<span className='icon'><GeoAltFill/></span> <span className='location_text'>{item.data.data.locations[item.item.location].title}</span>
					</div>
				</div>
			</div>
		</button>
	);
};
export default ActivityTeaser;
