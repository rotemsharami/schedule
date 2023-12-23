import {React, useEffect, useState, useRef} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import Header from './components/Header/Header';
import NewsFlashTop from './components/NewsFlashTop/NewsFlashTop';
import Content from './components/Content/Content';
import Menu from './components/Menu/Menu';
import FullActivity from './components/FullActivity/FullActivity';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, FilterCircleFill, Check, CalendarEvent } from "react-bootstrap-icons";

function App() {
   	const [data, setData] = useState();
	const [showMenu, setShowMenu] = useState(false);
	const [selectedPage, setSelectedPage] = useState("Schedule");
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const [showshowFullActivity, setShowFullActivity] = useState(false);
	const [fullActivityId, setFullActivityId] = useState();
	const [timeLine, setTimeLine] = useState({});
	const [showFilters, setShowFilters] = useState(false);
	const [availableDays, setAvailableDays] = useState([]);
	const [selectedDays, setSelectedDays] = useState([]);
	const [availableTypes, setAvailableTypes] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [availableDanceTypes, setAvailableDanceTypes] = useState([]);
	const [selectedDanceTypes, setSelectedDanceTypes] = useState([]);
	const [daysTitles, setDaysTitles] = useState();
	let getAvailableDays = async () => {
		let sorted = data.data.activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
		let _days = {};
		sorted.forEach(element => {
			let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
			if(selectedDays.includes(day) || selectedDays.length === 0){
				if(_days[day] === undefined)
					_days[day] = {};
			}
		});
		return Object.keys(_days);
	}

  	let dataToTimeLine = () => {
		let sorted = data.data.activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
		let time_line = {};
		sorted.forEach(element => {
			let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
			if((selectedDays.includes(day) || selectedDays.length === 0)){
				if(time_line[day] === undefined)
				time_line[day] = {};
				let day_activities = sorted.filter((item) => day === moment(item.start, 'YYYY-MM-DD HH:mm').format("DD/MM"));
				let sorted_day_activities = day_activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
				sorted_day_activities.forEach(activity => {
					if(time_line[day][activity.type] === undefined)
						time_line[day][activity.type] = {};
					if(time_line[day][activity.type][activity.id] === undefined)
						time_line[day][activity.type][activity.id] = {};
					activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
					time_line[day][activity.type][activity.id] = activity;
				});
			}
	});
	return time_line;
	}

	let getAvailableDanceTypes = async () => {
		let _timeLine = dataToTimeLine();
		if(selectedDays != undefined){
			let dance_types = [];
			Object.keys(_timeLine).forEach(day_i => {
				if(selectedDays.includes(day_i) || selectedDays.length == 0){
					Object.keys(_timeLine[day_i]).forEach(type_i => {
						if(selectedTypes.includes(type_i) || selectedTypes.length == 0){
							Object.keys(_timeLine[day_i][type_i]).forEach(activity_i => {
								if(_timeLine[day_i][type_i][activity_i].dance_types != undefined){
									Object.keys(_timeLine[day_i][type_i][activity_i].dance_types).forEach(item => {
										if(!dance_types.includes(_timeLine[day_i][type_i][activity_i].dance_types[item].tid))
											dance_types.push(_timeLine[day_i][type_i][activity_i].dance_types[item].tid);
									});
								}
							});
						}
					});
				}
			});
			return dance_types;
		}
	}

	let getDaysTitles = async (time_line) => {
		let _daysTitles = {};
		Object.keys(time_line).forEach(dayKey => {
			_daysTitles[dayKey] = 0;
			Object.keys(time_line[dayKey]).forEach(timeKey => {
				Object.keys(time_line[dayKey][timeKey]).forEach(typeKey => {
					Object.keys(time_line[dayKey][timeKey][typeKey]).forEach(activityKey => {
						_daysTitles[dayKey] = _daysTitles[dayKey]+1;
					});
				});
			});
		});
		Object.keys(_daysTitles).forEach(dayKey => {
			_daysTitles[dayKey] = (parseInt(_daysTitles[dayKey]) * 91) + 31;
		});
		let current = 0;
		for (let index = 0; index < Object.keys(_daysTitles).length; index++) {
			current = current + _daysTitles[Object.keys(_daysTitles)[index]];
			_daysTitles[Object.keys(_daysTitles)[index]] = current;
		}
		return _daysTitles;
	}

	let getTimeLine = async () => {
		if(data.data.activities != undefined){
			let sorted = data.data.activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
			let time_line = {};
			sorted.forEach(element => {
				let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
				if((selectedDays.includes(day) || selectedDays.length === 0)){
					if(time_line[day] === undefined)
						time_line[day] = {};
					let day_activities = sorted.filter((item) => day === moment(item.start, 'YYYY-MM-DD HH:mm').format("DD/MM"));
					let sorted_day_activities = day_activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
					day_activities.forEach(activity => {
						let validTypes = false;
						if((selectedTypes.includes(activity.type) || selectedTypes.length === 0))
							validTypes = true;
						let validDanceTypes = false;
						if(selectedDanceTypes.length === 0)
							validDanceTypes = true;
						else{
							validDanceTypes = false;
							if(activity.dance_types == undefined)
								validDanceTypes = false;
							else{
								Object.keys(activity.dance_types).forEach(element => {
									if(selectedDanceTypes.includes(activity.dance_types[element].tid) && validDanceTypes == false)
										validDanceTypes = true;
								});
							}
						}
						if(validTypes && validDanceTypes){
							if(time_line[day][activity.time_range.from+"-"+activity.time_range.to] === undefined)
								time_line[day][activity.time_range.from+"-"+activity.time_range.to] = {}
							if(time_line[day][activity.time_range.from+"-"+activity.time_range.to]["at-"+activity.type] === undefined)
								time_line[day][activity.time_range.from+"-"+activity.time_range.to]["at-"+activity.type] = {};
							if(time_line[day][activity.time_range.from+"-"+activity.time_range.to]["at-"+activity.type][activity.id] === undefined)
								time_line[day][activity.time_range.from+"-"+activity.time_range.to]["at-"+activity.type][activity.id] = {};
							activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
							time_line[day][activity.time_range.from+"-"+activity.time_range.to]["at-"+activity.type][activity.id] = activity;
						}
					});
				}
			});
			getDaysTitles(time_line).then((result) => {
				setDaysTitles(pre => result);
			});
			return time_line;
		}
	}

	function start() {
		getAvailableDays().then(function(_availableDays) {
			setAvailableDays(pre=>_availableDays);
			getAvailableTypes().then(function(_availableTypes) {
				setAvailableTypes(pre=>_availableTypes);
				getAvailableDanceTypes().then(function(_availableDanceTypes){
					setAvailableDanceTypes(pre => _availableDanceTypes);
					getTimeLine().then(function(_timeLine) {
						setTimeLine(pre=>_timeLine);
					});
				});
			});
		});
	}

	let getSelectedDays = async (index) => {
		let old_state_of_selectedDays = selectedDays;
		if (old_state_of_selectedDays.includes(index)){
			const preState = selectedDays;
			old_state_of_selectedDays = old_state_of_selectedDays.filter(a => a !== index);
		}
		else
			old_state_of_selectedDays = [...old_state_of_selectedDays, index];
		return old_state_of_selectedDays;
	}

	let getSelectedTypes = async(index) => {
		let old_state_of_selectedTypes = selectedTypes;
		if (old_state_of_selectedTypes.includes(index)){
			const preState = selectedTypes;
			old_state_of_selectedTypes = old_state_of_selectedTypes.filter(a => a !== index);
		}
		else
			old_state_of_selectedTypes = [...old_state_of_selectedTypes, index];
		return old_state_of_selectedTypes;
	}

	let getSelectedDanceTypes = async(index) => {
		let old_state_of_selectedDanceTypes = selectedDanceTypes;
		if (old_state_of_selectedDanceTypes.includes(index))
			old_state_of_selectedDanceTypes = old_state_of_selectedDanceTypes.filter(a => a !== index);
		else
			old_state_of_selectedDanceTypes = [...old_state_of_selectedDanceTypes, index];
		return old_state_of_selectedDanceTypes;
	}

	function changeDays(day) {
		getSelectedDays(day).then(function(_selectedDays) {
			setSelectedDays(pre=>_selectedDays);
		});
	}

	function changeTypes(type) {
		getSelectedTypes(type).then(function(_selectedTypes) {
			setSelectedTypes(pre=>_selectedTypes);
		});
	}

	function changeDanceTypes(type) {
		getSelectedDanceTypes(type).then(function(_selectedTypes) {
			setSelectedDanceTypes(pre=>_selectedTypes);
		});
	}


	let getAvailableTypes = async () => {
		let _timeLine = dataToTimeLine();
		if(selectedDays != undefined){
			let _types = [];
			Object.keys(_timeLine).forEach(day_i => {
				if(selectedDays.includes(day_i) || selectedDays.length == 0){
					Object.keys(_timeLine[day_i]).forEach(type_i => {
						if(!_types.includes(type_i))
							_types.push(type_i);
					});
				}
			});
			return _types;
		}
	}


	useEffect(() => {
		if(data === undefined){
			axios.get('https://schedule.latinet.co.il/en/activities')
			.then(response => {
				let dance_floors = {};
				Object.keys(response.data.data.general_data.dance_floors).forEach(element => {
					dance_floors[response.data.data.general_data.dance_floors[element].tid] = response.data.data.general_data.dance_floors[element];
				});
				response.data.data.general_data.dance_floors = dance_floors;
				setData({data:response.data.data});
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
		}
		if(data != undefined){
			start();
		}
	}, [data]);

	useEffect(() => {
		if(data != undefined){
			getTimeLine().then(function(_timeLine) {
				setTimeLine(pre=>_timeLine);
				getAvailableTypes().then(function(_availableTypes) {
					setAvailableTypes(pre=>_availableTypes);
					getAvailableDanceTypes().then(function(_availableDanceTypes){
						setAvailableDanceTypes(pre => _availableDanceTypes);
					});
				});
			});
		}
	}, [selectedDays, selectedTypes, selectedDanceTypes]);
	
	let getShowFullActivity = (show) => {
		setShowFullActivity(show);
	}

	let getFullActivityData = (info) => {
		console.log(info);
		setFullActivityId(info.activityId);
		setTimeLine(info.timeLine);
	}

	return (
		<div style={{"overflowX": "hidden"}} className="top_container">

			<div className='top_divs'>

				{data != undefined ? 
				<Header data={data.data.general_data} setShowMenu={setShowMenu} showMenu={showMenu}></Header>
				: null}
				{data != undefined ?
				<NewsFlashTop data={data}></NewsFlashTop>
				: null}

				<div className='section_0'>
					<div className='general_title'>
						<div className='general_title_text'>Schedule</div>
						<div className='general_title_buttun'>
							<button onClick={() => {setShowFilters(showFilters == false ? true : false)}}>
								<span className="button_icon"><FilterCircleFill/></span><span className='button_text'>Filter</span>
							</button>
						</div>
					</div>
					{data != undefined  && showFilters ?
						<div
							className="section_1"
							style={{
								// backgroundImage: `url(`+data.data.general_data.image+`)` 
							}}
							>
							<div className="days filter_section">
								{availableDays != undefined ?
								<div className="days_box">
									<div className="filter_title"><span className='filter_title_icon'><CalendarEvent/></span><span className='filter_title_text'>Days</span></div>
									<div className='filter_list'>
										{availableDays.map((day_i) =>
											<button
												className={selectedDays.includes(day_i) ? 'active' : ''}
												onClick={() => {changeDays(day_i)}}
												key={day_i}
											>
												<div className='checkbox'>{selectedDays.includes(day_i) ? <span className='checkebox_icon'><Check/></span>: null}</div>
												<div className='filter_item_title'>{day_i}</div>
											</button>
										)}
									</div>
								</div>
								: null }
							</div>

							<div className="types filter_section">
								<div className="types_box">
								<div className="filter_title"><span className='filter_title_icon'><Activity/></span><span className='filter_title_text'>Activities</span></div>
									<div className='filter_list'>
										{availableTypes.map((type_i) =>
											<button
												className={selectedTypes.includes(type_i) ? 'active' : ''}
												onClick={() => { changeTypes(type_i)}}
												key={type_i}
												>
												<div className='checkbox'>{selectedTypes.includes(type_i) ? <span className='checkebox_icon'><Check/></span>:null}</div>
												<div className='filter_item_title'>{data.data.activity_type[type_i].title}</div>
											</button>
										)}
									</div>
								</div>
							</div>
							<div className="dance_types filter_section">
								<div className="types_box">
								<div className="filter_title"><span className='filter_title_icon'><MusicNoteBeamed/></span><span className='filter_title_text'>Dance Types</span></div>
									<div className='filter_list'>
										{availableDanceTypes.map((type_i) =>
											<button
												onClick={() => { changeDanceTypes(type_i)}}
												key={type_i}
												>
												<div className='checkbox'>{selectedDanceTypes.includes(type_i) ? <span className='checkebox_icon'><Check/></span>:null}</div>
												<div className='filter_item_title'>{data.data.general_data.dance_floors[type_i].name}</div>
											</button>
										)}
									</div>
								</div>
							</div>
						</div> : null}
					</div>

					</div>

					<motion.div
						initial={{ x:  "-100%"}}
						animate={{ x: showMenu ? "0" : "-100%"}}
						exit={{ x: showMenu ? (windowSize.current[0] >= 767 ? "30%" : "80%") : "0"}}
						transition={{ duration: 0.4 }}
						style={{position:"fixed", width:(windowSize.current[0] >= 767 ? "30%" : "80%"), top: "60px"}}
					>
						<Menu setSelectedPage={setSelectedPage} selectedPage={selectedPage} setShowMenu={setShowMenu}></Menu>
					</motion.div>

					{showshowFullActivity === true ?
					<FullActivity showshowFullActivity={showshowFullActivity} timeLine={timeLine} fullActivityId={fullActivityId} data={data} setFullActivityId={setFullActivityId} getShowFullActivity={getShowFullActivity} ></FullActivity>
					: null }
					

				{data != undefined && (
				<motion.div
					initial={{ x:  "0"}}
					animate={{ x: showMenu ? (windowSize.current[0] >= 767 ? "30%" : "80%") : "0"}}
					exit={{ x: showMenu ? (windowSize.current[0] >= 767 ? "30%" : "80%") : "0"}}
					transition={{ duration: 0.4 }}
					style={{ width:"100%"}}
					>
				{showMenu ? 
					<div className='hiding_div'
					style={{ height: (windowSize.current[1]) -60 + 'px' }}
					></div>
				:null}



				<Content
					getShowFullActivity={getShowFullActivity}
					getFullActivityData={getFullActivityData}
					data={data}
					setSelectedPage={setSelectedPage}
					selectedPage={selectedPage}
					timeLine={timeLine}
					></Content>
				</motion.div>
			)}
		</div>
	);
}

export default App;
