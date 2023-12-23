import {React, useEffect, useState, useRef} from 'react';
import './Schedule.scss';
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, FilterCircleFill, Check, CalendarEvent } from "react-bootstrap-icons";
import ActivityTeaser from '../ActivityTeaser/ActivityTeaser';
import FullActivity from '../FullActivity/FullActivity';
import { BsFillAlarmFill} from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const Schedule = (item) => {
    console.log(item);

    const [data, setData] = useState();
    const [availableDays, setAvailableDays] = useState([]);
    const [timeLine, setTimeLine] = useState({});
    const [availableTypes, setAvailableTypes] = useState([]);
    const [availableDanceTypes, setAvailableDanceTypes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedDanceTypes, setSelectedDanceTypes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [zoomInToActivity, setZoomInToActivity] = useState(false);
    const [fullActivityId, setFullActivityId] = useState("1");
    const [daysTitles, setDaysTitles] = useState();
    const [scrollY, setScrollY] = useState(0);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const targetRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => {
        let scroll = parseInt(window.scrollY);


        // if(scroll < 75){
        //     console.log("Hide fixed title");
        // }else{
        //     if(scroll > 75 && scroll < daysTitles[Object.keys(daysTitles)[0]]+75){
        //         console.log("Show fixed title");
        //         console.log(Object.keys(daysTitles)[0]);
        //     }else{
        //         for (let index = 0; index < Object.keys(daysTitles).length; index++) {
        //             if(scroll >= daysTitles[Object.keys(daysTitles)[index]] && scroll < daysTitles[Object.keys(daysTitles)[index+1]] && (index+1) < Object.keys(daysTitles).length){
        //                 console.log(Object.keys(daysTitles)[index+1]);
        //             }
        //         }
        //     }
        // }
        // setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [daysTitles]);
    

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

    const setStartEndTime = (string, index) =>{
        return string.split("-")[index];
    }

    let updateTimeLine = async(_timeLine) => {
        setTimeLine(pre=>_timeLine);
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

	useEffect(() => {
        if(data === undefined){
            let dance_floors = {};
            Object.keys(item.data.data.general_data.dance_floors).forEach(element => {
                dance_floors[item.data.data.general_data.dance_floors[element].tid] = item.data.data.general_data.dance_floors[element];
            });
            item.data.data.general_data.dance_floors = dance_floors;
            setData({data:item.data.data});
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
















    return(
        <div className="schedule">
            {/* <div>{ JSON.stringify(selectedDays, null, 2) }</div> */}



            

            


            

            { item.timeLine != undefined ?
                <span>
                    {Object.keys(item.timeLine).map((day_i) =>
                        <span className='day' key={day_i}>
                            { Object.keys(item.timeLine[day_i]).length > 0 ?
                                <span>
                                <div className='day_title'>{day_i}</div>
                                    {Object.keys(item.timeLine[day_i]).map((time_i) =>
                                        <div className='activity_row' key={time_i}>
                                            <div className='time_box'>
                                                <div className='time_box_inner'>
                                                    <div className='time_item'>{setStartEndTime(time_i,0)}</div>
                                                        <div className='icon'>
                                                            <ArrowDown/>
                                                        </div>
                                                        <div className='time_item'>{setStartEndTime(time_i,1)}</div>
                                                    </div>  
                                                </div>
                                            <div className='activities_box_list'>
                                            {item.timeLine[day_i][time_i] != undefined ? 
                                                <span>
                                                    {Object.keys(item.timeLine[day_i][time_i]).map((type_i) =>
                                                        <div className="activities_box" key={type_i}>
                                                            {Object.keys(item.timeLine[day_i][time_i][type_i]).map((activity_i) =>
                                                                <span key={activity_i}>
                                                                    <ActivityTeaser
                                                                        key={activity_i}
                                                                        item={item.timeLine[day_i][time_i][type_i][activity_i]} 
                                                                        displayChange={setZoomInToActivity}
                                                                        idActivity={setFullActivityId}
                                                                        activityAmounts={item.timeLine[day_i][time_i]}
                                                                        getShowFullActivity={item.getShowFullActivity}
                                                                        getFullActivityData={item.getFullActivityData}
                                                                        timeLine={item.timeLine}
                                                                        data={data}
                                                                        ></ActivityTeaser>
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </span>
                                            : null}
                                        </div>
                                        </div>
                                    )}
                                </span>
                            : null }
                        </span>
                    )}
                </span>
            : null }
        </div>
    );
};

export default Schedule;