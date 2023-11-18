import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './General.scss';
import moment from 'moment';

const General = (item) => {
	var momentObject = moment("2023-09-02 14:00", "YYYY-MM-DD HH:mm");
	let now_activities = item.data.data.activities.filter((item) => {
		return momentObject.isBetween(moment(item.start), moment(item.end)) || moment(item.start).isSame(momentObject);
	});


	const [nowActivities, SetNowActivities] = useState(now_activities);

	const getActivitiesIds = (activities) => {
		let nowActivitiesIds = [];
		activities.forEach(element => {
			nowActivitiesIds.push(element.id);
		});
		return nowActivitiesIds;
	}

	let nowActivitiesIds = [];
	nowActivities.forEach(element => {
		nowActivitiesIds.push(element.id);
	});

	let sorted = item.data.data.activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
	let currentActivityIndex = -1;
	let nextTime = "";

	let timeDifference;
	
		sorted.forEach((element, index) => {
			if(nowActivities.length > 0){
				if(currentActivityIndex == -1){
					if(element.id == nowActivities[0].id){
						currentActivityIndex = index;
					}
				}else{
					if(!nowActivitiesIds.includes(element.id)){
						if(nextTime == ""){
							nextTime = element.start;
						}
					}
				}
			}
			else{
				if(nextTime == ""){
					if(moment(element.start, "YYYY-MM-DD HH:mm").isAfter(momentObject)){
						nextTime = element.start;
					}
				}
			}
		});
	

	let nextTimeObject = moment(nextTime, "YYYY-MM-DD HH:mm").add(1, 'minutes');

	let next_activities = item.data.data.activities.filter((item) => {
		return (nextTimeObject.isBetween(moment(item.start), moment(item.end)) || moment(item.start).isSame(momentObject))  && !nowActivitiesIds.includes(item.id);
	});

	

	const [nextActivities, SetNextActivities] = useState(next_activities);

	const [time, setTime] = useState(moment());

	useEffect(() => {
	  const interval = setInterval(() => {
		setTime(moment());
	  }, 60000);
  
	  return () => {
		clearInterval(interval); // Clear the interval when the component unmounts
	  };
	}, []);



	return(
		<div className="General">
			<div className='now_activities'>

				<div className='time_now'>{momentObject.format('DD/MM/YYYY HH:mm')}   </div>

				<div className='title'>Now:</div>

				{nowActivities.length == 0 ? 
				<div className='no_activities'>
					No activities at this moment
				</div>
				:null}
				<div className='list'>
					{nowActivities.map((activity)=>
						<div className='item' key={activity.id}>
							<div className='title'>{activity.title}</div>
							<div className='info'>
								<span className='location'>{item.data.data.locations[activity.location].title  }</span> <span className='ends_in'>Ends in: {moment(activity.end, 'YYYY-MM-DD HH:mm').format("HH:mm")}</span>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className='next_activities'>
				<div className='title'>Next:</div>
				<div className='list'>
					{nextActivities.map((activity)=>
					<div className='item' key={activity.id}>
						<div className='title'>{activity.title}</div>
						<div className='info'>
							<span className='location'>{item.data.data.locations[activity.location].title  }</span> <span className='ends_in'>Ends in: {moment(activity.end, 'YYYY-MM-DD HH:mm').format("HH:mm")}</span>
						</div>
					</div>					
					)}
				</div>
			</div>


		</div>
	);
}

General.propTypes = {};

General.defaultProps = {};

export default General;
