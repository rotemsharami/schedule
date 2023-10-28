import {React, useEffect, useState, useRef} from 'react';
import './Schedule.scss';
import {getData} from "../../tools/data";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity, FilterCircleFill } from "react-bootstrap-icons";
import ActivityTeaser from '../ActivityTeaser/ActivityTeaser';
import FullActivity from '../FullActivity/FullActivity';
import { BsFillAlarmFill} from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import Header from '../Header/Header';

const Schedule = (item) => {
    const [data, setData] = useState();
    const [availableDays, setAvailableDays] = useState([]);
    const [timeLine, setTimeLine] = useState({});
    const [availableTypes, setAvailableTypes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [zoomInToActivity, setZoomInToActivity] = useState(false);
    const [fullActivityId, setFullActivityId] = useState("1");

	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	
    let getAvailableDays = async () => {
        let sorted = data.data.activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
        let _days = {};
        sorted.forEach(element => {
            let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
            if(selectedDays.includes(day) || selectedDays.length === 0){
                if(_days[day] === undefined){
                    _days[day] = {};
                }
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

    let getSelectedDays = async (index) => {
        let old_state_of_selectedDays = selectedDays;
        if (old_state_of_selectedDays.includes(index)){
            const preState = selectedDays;
            old_state_of_selectedDays = old_state_of_selectedDays.filter(a => a !== index);
        }
        else{
            old_state_of_selectedDays = [...old_state_of_selectedDays, index];
        }
        return old_state_of_selectedDays;
    }

    let getSelectedTypes = async(index) => {
        let old_state_of_selectedTypes = selectedTypes;
        if (old_state_of_selectedTypes.includes(index)){
            const preState = selectedTypes;
            old_state_of_selectedTypes = old_state_of_selectedTypes.filter(a => a !== index);
        }
        else{
            old_state_of_selectedTypes = [...old_state_of_selectedTypes, index];
        }
        return old_state_of_selectedTypes;
    }

    let getTimeLine = async () => {
        if(data.data.activities != undefined){
            let sorted = data.data.activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
            
            console.log(sorted);
            
            let time_line = {};
            sorted.forEach(element => {
                let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
                if((selectedDays.includes(day) || selectedDays.length === 0)){
                    if(time_line[day] === undefined)
                        time_line[day] = {};
                    let day_activities = sorted.filter((item) => day === moment(item.start, 'YYYY-MM-DD HH:mm').format("DD/MM"));
                    console.log(day_activities);
                    
                    let sorted_day_activities = day_activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
                    day_activities.forEach(activity => {
                        if((selectedTypes.includes(activity.type) || selectedTypes.length === 0)){
                            if(time_line[day]["at-"+activity.type] === undefined)
                                time_line[day]["at-"+activity.type] = {};
                            if(time_line[day]["at-"+activity.type][activity.id] === undefined)
                                time_line[day]["at-"+activity.type][activity.id] = {};
                            activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
                            time_line[day]["at-"+activity.type][activity.id] = activity;
                        }
                    });
                }
            });
            return time_line;
        }
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

    function start() {
        getAvailableDays().then(function(_availableDays) {
            setAvailableDays(pre=>_availableDays);
            setSelectedDays(pre=>_availableDays);
            getAvailableTypes().then(function(_availableTypes) {
                setAvailableTypes(pre=>_availableTypes);
                getTimeLine().then(function(_timeLine) {
                    setTimeLine(pre=>_timeLine);
                });
            });
        });
    }

    function changeDays(day) {
        getSelectedDays(day).then(function(_selectedDays) {
            setSelectedDays(pre=>_selectedDays);
            getTimeLine().then(function(_timeLine) {
                setTimeLine(pre=>_timeLine);
                getAvailableTypes().then(function(_availableTypes) {
                    setAvailableTypes(pre=>_availableTypes);
                });
            });
        });
    }

    function changeTypes(type) {
        getSelectedTypes(type).then(function(_selectedTypes) {
            setSelectedTypes(pre=>_selectedTypes);
            getTimeLine().then(function(_timeLine) {
                setTimeLine(pre=>_timeLine);
            });
        });
    }

	useEffect(() => {
        if(data === undefined){
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

                });
            });
        }
	}, [selectedDays]);

	useEffect(() => {
        if(data != undefined){
            getTimeLine().then(function(_timeLine) {
                setTimeLine(pre=>_timeLine);
            });
        }
	}, [selectedTypes]);

    return(
        <div className="schedule">
            <div className='general_title'>
                <div className='general_title_text'>Schedule</div>
                <div className='general_title_buttun'>
                    <button onClick={() => {setShowFilters(showFilters == false ? true : false)}}>
                        <span className="button_icon"><FilterCircleFill/></span><span className='button_text'>Filter</span>
                    </button>
                </div>
            </div>
            {/* <div>{ JSON.stringify(selectedDays, null, 2) }</div> */}
            {zoomInToActivity === true ?
                    <FullActivity timeLine={timeLine} fullActivityId={fullActivityId} data={data} displayChange={setZoomInToActivity} setFullActivityId={setFullActivityId}></FullActivity>
                : null }

            {data != undefined  && showFilters ?
            <div
                className="section_1"
                style={{ 
                    backgroundImage: `url(`+data.data.general_data.image+`)` 
                }}
                >
                

                    <div className="days">
                        {availableDays != undefined ?
                        <div className="days_box">
                            {availableDays.map((day_i) =>
                                <button
                                    className={selectedDays.includes(day_i) ? 'active' : ''}
                                    onClick={() => {changeDays(day_i)}}
                                    key={day_i}
                                >
                                    {day_i}
                                </button>
                            )}
                        </div>
                        : null }
                    </div>
                    <div className="types">
                        <div className="types_box">
                            {availableTypes.map((type_i) =>
                                <button
                                    className={selectedTypes.includes(type_i) ? 'active' : ''}
                                    onClick={() => { changeTypes(type_i)}}
                                    key={type_i}
                                    >
                                    <div><BsFillAlarmFill/></div>
                                    <div>{data.data.activity_type[type_i].title}</div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                : null}
            { timeLine != undefined ?
                <span>
                    {Object.keys(timeLine).map((day_i) =>
                        <span className='day' key={day_i}>
                            { Object.keys(timeLine[day_i]).length > 0 ?
                                <span>
                                <div className='day_title'>{day_i}</div>
                                {Object.keys(timeLine[day_i]).map((type_i) =>
                                    <div className="activities_box" key={type_i}>
                                        {Object.keys(timeLine[day_i][type_i]).map((activity_i) =>
                                            <span key={activity_i}>
                                                <ActivityTeaser key={activity_i} item={timeLine[day_i][type_i][activity_i]} data={data} displayChange={setZoomInToActivity} idActivity={setFullActivityId}></ActivityTeaser>
                                            </span>
                                        )}
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