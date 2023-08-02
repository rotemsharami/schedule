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
    const [typesItemsByDays, setTypesItemsByDays] = useState([]);
    const [selectedActivityType, setSelectedActivityType] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedType, setSelectedType] = useState();
    const [displayType, setDisplayType] = useState("time");
    const [displayByTimeAllsDays, setDisplayByTimeAllsDays] = useState(true);
    const [displayByTimeAllsDaysAndAllTypes, setDisplayByTimeAllsDaysAndAllTypes] = useState(true);
    const [displayByTimeAllsTypes, setDisplayByTimeAllsTypes] = useState(true);


    const [sortedItems, setSortedItems] = useState({});

    


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


    const sort_activities = (activeities) => {
        let data = [];
        let sorted_object = {};
        Object.keys(activeities).forEach((index)=>{
            data.push(activeities[index]);
        });
        let sorted = data.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
        sorted.forEach(element => {
            sorted_object[element.id] = element;
        });
        return sorted_object;

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
                    if(time_items[day][activity.type][activity.id] === undefined)
                        time_items[day][activity.type][activity.id] = {};
                    activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
                    time_items[day][activity.type][activity.id] = activity;
                });
            }
        });

        

        setTimeItems(time_items);
        return time_items;
    }


    const getSortedItems = (data) => {
        let sorted_data = {
            by_day:{}
        };
        let all_activities_by_day = {};
        let all_activities_by_day_array = [];
        data.activeities.forEach(activity => {
            let day = moment(activity.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
            if(all_activities_by_day[day] === undefined)
                all_activities_by_day[day] = {};
            if(all_activities_by_day[day][activity.id] === undefined)
                all_activities_by_day[day][activity.id] = activity;
        });

        Object.keys(all_activities_by_day).forEach(day_i => {
            sorted_data.by_day[day_i] = sort_activities(all_activities_by_day[day_i]);
        });


        setSortedItems(sorted_data);

        console.log(sorted_data);

        

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
            if(types_items[activity.type][day][activity.id] === undefined)
                types_items[activity.type][day][activity.id] = {};             
            activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
            types_items[activity.type][day][activity.id] = activity;
        });
        setTypesItems(types_items);
    }
	useEffect(() => {
        let allData = getData();
        setData(allData);
        let time_itemss = getTimeItems(allData);
        let types_items = getTypesItems(allData);

        let sorted_items = getSortedItems(allData);

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
                                    className={(selectedDay == day_i && displayByTimeAllsDays == false) ? 'active' : ''}
                                    onClick={() => {
                                        setSelectedDay(day_i);
                                        setDisplayByTimeAllsDays(false);
                                    }}
                                    key={day_i}
                                    >
                                    {day_i}
                                </button>
                            )}
                            <button onClick={() => {
                                if(displayByTimeAllsDays == false)
                                    setDisplayByTimeAllsDays(true);
                                }}
                                className={displayByTimeAllsDays ? "active" : ""}
                                >All
                            </button>
                        </div>
                    </div>
                    { timeItems[selectedDay] != undefined ?
                        <div className="types">
                            <div className="types_box">
                                {Object.keys(timeItems[selectedDay]).map((type_i) =>
                                    <button
                                        className={selectedType == type_i && displayByTimeAllsDaysAndAllTypes == false ? 'active' : ''}
                                        onClick={() => {
                                            setDisplayByTimeAllsDaysAndAllTypes(false);
                                            setSelectedType(type_i);
                                        }}
                                        key={type_i}
                                        >
                                        {data.activity_type[type_i].title}
                                    </button>
                                )}
                                <button onClick={() => {
                                        if(displayByTimeAllsDaysAndAllTypes == false){
                                            setDisplayByTimeAllsDays(false);
                                            setDisplayByTimeAllsDaysAndAllTypes(true);
                                        }
                                    }}
                                    className={displayByTimeAllsDaysAndAllTypes ? "active" : ""}
                                    >All
                                </button>
                            </div>
                        </div>
                    : null }
                    { displayByTimeAllsDays == false && displayByTimeAllsDaysAndAllTypes == false ?
                        <span>
                            { timeItems[selectedDay] != undefined ?
                                <span>
                                    { timeItems[selectedDay][selectedType] != undefined ?
                                        <span>
                                            { timeItems[selectedDay][selectedType] != undefined ?
                                                <div className="activities">
                                                    <div className="activities_box">
                                                        {Object.keys(timeItems[selectedDay][selectedType]).map((activity_i) =>
                                                            <ActivityTeaser key={activity_i} item={timeItems[selectedDay][selectedType][activity_i]}></ActivityTeaser>
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




                    { displayByTimeAllsDays == false && displayByTimeAllsDaysAndAllTypes == true ?
                        <span>
                            { timeItems[selectedDay] != undefined ?
                                <span>
                                    {Object.keys(timeItems[selectedDay]).map((type_i) =>
                                        <span key={type_i}>
                                            {Object.keys(timeItems[selectedDay][type_i]).map((activity_i) =>
                                                <span key={activity_i}>
                                                    <ActivityTeaser key={activity_i} item={timeItems[selectedDay][type_i][activity_i]}></ActivityTeaser>
                                                </span>
                                            )}
                                        </span>
                                    )}
                                </span>
                            : null }
                        </span>
                    : null }




                    { displayByTimeAllsDays && displayByTimeAllsDaysAndAllTypes == false ?
                        <span>
                            { typesItems[selectedType] != undefined ?
                                <span>
                                    {Object.keys(typesItems[selectedType]).map((day_i) =>
                                        <span className='day'>
                                            <div className='day_title'>{day_i}</div>
                                            <div className="activities_box">
                                                {Object.keys(typesItems[selectedType][day_i]).map((activity_i) =>
                                                    <span key={activity_i}>
                                                        <ActivityTeaser key={activity_i} item={typesItems[selectedType][day_i][activity_i]}></ActivityTeaser>
                                                    </span>
                                                )}
                                            </div>
                                        </span>
                                    )}
                                </span>
                            : null }
                        </span>
                    : null }
                    { displayByTimeAllsDaysAndAllTypes && displayByTimeAllsDays ?
                        <span>
                            { sortedItems.by_day != undefined ?
                                <span>
                                    {Object.keys(sortedItems.by_day).map((day_i) =>   
                                        <span key={day_i} className='day'>
                                            <div className='day_title'>{day_i}</div>
                                            {Object.keys(sortedItems.by_day[day_i]).map((activity_i) => 
                                                <span key={activity_i}>
                                                    <ActivityTeaser key={activity_i} item={sortedItems.by_day[day_i][activity_i]}></ActivityTeaser>
                                                </span>
                                            )}
                                        </span>
                                    )}
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