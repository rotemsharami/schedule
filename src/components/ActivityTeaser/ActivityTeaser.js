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

	const getWidth = ()=> {
		let amount = 0;
		Object.keys(item.activityAmounts).forEach(typeI => {
			Object.keys(item.activityAmounts[typeI]).forEach(activityI => {
				amount++;
			});
		});
		return 100 / 1;
	}


	const getBorderBottom = ()=> {
		let index = -1;
		let result = false;
		let list = [];
		Object.keys(item.activityAmounts).forEach(typeI => {
			Object.keys(item.activityAmounts[typeI]).forEach(activityI => {
				list.push(activityI);
			});
		});
		list.forEach((element, i) => {
			
			if(element == item.item.id){
				index = i;
			}
				
		});
		
		if(((list.length-1) != 0) && (index < (list.length-1))){
			result = true;
		}
		let borderSize = result ? "2" : "0";


		return borderSize;
	}

	
	return(
		<button
			className="ActivityTeaser" onClick={()=>_zoomInToActivity()}
			style={{
				width: getWidth() + '%',
				borderBottom: getBorderBottom()+"px solid #72ced5",
			}}
			>
			
			<div className='activity'>
				
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
