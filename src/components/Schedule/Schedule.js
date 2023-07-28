import {React, useEffect, useState} from 'react';
import './Schedule.scss';
import {getData} from "../../tools/data";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity } from "react-bootstrap-icons";
import ActivityTeaser from '../ActivityTeaser/ActivityTeaser';
const Schedule = () => {
    const [data, setData] = useState();
    const [timeItems, setTimeItems] = useState([]);
    const [typesItems, setTypesItems] = useState([]);

    

    const [selectedActivityType, setSelectedActivityType] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedType, setSelectedType] = useState();
    const [displayType, setDisplayType] = useState("time");

    const setDisplayTypeActions = (type) => {
        switch(type){
            case "time":

                break;

            case "category":
                setSelectedType(Object.keys(typesItems)[0]);
                setSelectedDay(Object.keys(typesItems[Object.keys(typesItems)[0]])[0]);
                break;

        }   

    }

    const getTimeItems = (_data) => {
        let sorted = _data.activeities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
        let time_items = {}; 
        sorted.forEach(element => {
            let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
            if(time_items[day] === undefined){
                time_items[day] = {};
                let day_activities = _data.activeities.filter((item) => day === moment(item.start, 'YYYY-MM-DD HH:mm').format("DD/MM"));
                let sorted_day_activities = day_activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
                sorted_day_activities.forEach(activity => {
                    if(time_items[day][activity.type] === undefined)
                        time_items[day][activity.type] = {};
                    if(time_items[day][activity.type][activity.location] === undefined)
                        time_items[day][activity.type][activity.location] = {};
                    if(time_items[day][activity.type][activity.location][activity.id] === undefined)
                        time_items[day][activity.type][activity.location][activity.id] = {};
                    activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
                    time_items[day][activity.type][activity.location][activity.id] = activity;
                });
            }
        });
        setTimeItems(time_items);
        return time_items;
    }

    const getTypesItems = (_data) => {
        let sorted = _data.activeities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
        let types_items = {}; 
        sorted.forEach(activity => {
            if(types_items[activity.type] === undefined)
                types_items[activity.type] = {};
            let day = moment(activity.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
            if(types_items[activity.type][day] === undefined)
                types_items[activity.type][day] = {};
            // if(types_items[activity.type][day][activity.location] === undefined)
            //     types_items[activity.type][day][activity.location] = {};
            if(types_items[activity.type][day][activity.id] === undefined)
                types_items[activity.type][day][activity.id] = {};             
            activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
            types_items[activity.type][day][activity.id] = activity;
        });
        
        setTypesItems(types_items);
        console.log(types_items);

    }


	useEffect(() => {
        let allData = getData();
        setData(allData);
        let time_itemss = getTimeItems(allData);
        let types_items = getTypesItems(allData);
        
        

        let dayIndex = Object.keys(time_itemss)[0];
        setSelectedDay(dayIndex);
        let typeIndex = Object.keys(time_itemss[dayIndex])[0];
        setSelectedType(typeIndex);
        let locationIndex = Object.keys(time_itemss[dayIndex][typeIndex])[0];
        setSelectedLocation(locationIndex);
	}, []);
    return(
        <div className="schedule">
            <div className="display_type">
                <div className="display_type_box">
                    <button onClick={() => {setDisplayType("time")}} className={displayType == "time" ? 'active' : ''}>Time</button>
                    <button onClick={() => {setDisplayType("category")}} className={displayType == "category" ? 'active' : ''}>Category</button>
                </div>
            </div>
            {displayType == "time" ?
            <div className="time_display">
                <div className="days">
                    <div className="days_box">
                        {Object.keys(timeItems).map((day_i) =>
                        <button
                            className={selectedDay == day_i ? 'active' : ''}
                            onClick={() => {setSelectedDay(day_i)}}
                            key={day_i}
                            >
                            {day_i}
                        </button>
                        )}
                        <button onClick={() => {setSelectedDay("all")}}>All</button>
                    </div>
                </div>
                { timeItems[selectedDay] != undefined ?
                <div className="types">
                    <div className="types_box">
                        {Object.keys(timeItems[selectedDay]).map((type_i) =>
                        <button
                            className={selectedType == type_i ? 'active' : ''}
                            onClick={() => {
                                setSelectedType(type_i);
                            }}
                            key={type_i}
                            >
                            {data.activity_type[type_i].title}
                        </button>
                        )}
                    </div>
                </div>
                : null }
                { timeItems[selectedDay] != undefined ?
                <span>
                { timeItems[selectedDay][selectedType] != undefined ?
                <span>
                    { timeItems[selectedDay][selectedType] != undefined ?
                        <div className="activities">
                            <div className="activities_box">
                                {Object.keys(timeItems[selectedDay][selectedType]).map((location_i) =>
                                <span key={location_i}>
                                    {Object.keys(timeItems[selectedDay][selectedType][location_i]).map((activity_i) =>
                                        <ActivityTeaser key={activity_i} item={timeItems[selectedDay][selectedType][location_i][activity_i]}></ActivityTeaser>
                                    )}
                                </span>
                                )}
                            </div>
                        </div>
                    : null }
                    </span>
                : null }
                </span>
                : null }
            </div>
            : null }


            {displayType == "category" ?
            <span>

                { typesItems != undefined ?
                    <div className="types">
                        <div className="types_box">
                            {Object.keys(typesItems).map((type_i) =>
                            <button
                                className={selectedType == type_i ? 'active' : ''}
                                onClick={() => {
                                    setSelectedType(type_i);
                                }}
                                key={type_i}
                                >
                                {data.activity_type[type_i].title}
                            </button>
                            )}
                        </div>
                    </div>
                    : null }


                { typesItems[selectedType] != undefined ?
                <div className="days">
                    <div className="days_box">
                        {Object.keys(typesItems[selectedType]).map((day_i) =>
                        <button
                            className={selectedDay == day_i ? 'active' : ''}
                            onClick={() => {setSelectedDay(day_i)}}
                            key={day_i}
                            >
                            {day_i}
                        </button>
                        )}
                        <button onClick={() => {setSelectedDay("all")}}>All</button>
                    </div>
                </div>
                : null }

                { typesItems[selectedType] != undefined ?
                <span>
                { typesItems[selectedType][selectedDay] != undefined ?
                <span>
                    { typesItems[selectedType][selectedDay] != undefined ?
                        <div className="activities">
                            <div className="activities_box">
                                {Object.keys(typesItems[selectedType][selectedDay]).map((activity_i) =>
                                <span key={activity_i}>
                                    
                                    <ActivityTeaser key={activity_i} item={typesItems[selectedType][selectedDay][activity_i]}></ActivityTeaser>
                                    
                                </span>
                                )}
                            </div>
                        </div>
                    : null }
                    </span>
                : null }
                </span>
                : null }










                </span>
            : null }
            

        </div>
    );
};

export default Schedule;