import {React, useEffect, useState} from 'react';
import './Schedule.scss';
import {getData} from "../../tools/data";
import moment from 'moment';
import { ArrowDown, MusicNoteBeamed, GeoAltFill, Activity } from "react-bootstrap-icons";
import ActivityTeaser from '../ActivityTeaser/ActivityTeaser';
import { BsFillAlarmFill } from "react-icons/bs";

const Schedule = () => {
    const [data, setData] = useState();
    const [days, setDays] = useState([]);
    const [types, setTypes] = useState([]);
    const [timeItems, setTimeItems] = useState({});
    const [typesItems, setTypesItems] = useState([]);

    const [availableTypes, setAvailableTypes] = useState([]);

    const [typesItemsByDays, setTypesItemsByDays] = useState([]);
    const [selectedActivityType, setSelectedActivityType] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedType, setSelectedType] = useState();
    const [displayType, setDisplayType] = useState("time");
    const [displayByTimeAllsDays, setDisplayByTimeAllsDays] = useState(true);
    const [displayByTimeAllsDaysAndAllTypes, setDisplayByTimeAllsDaysAndAllTypes] = useState(true);
    const [displayByTimeAllsTypes, setDisplayByTimeAllsTypes] = useState(true);
    const [selectedTimeItems, setSelectedTimeItems] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
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

    const setSelectedDaysArray = (index) => {
        let old_state_of_selectedDays = selectedDays;
        if (old_state_of_selectedDays.includes(index)){
            const preState = selectedDays;
            old_state_of_selectedDays = old_state_of_selectedDays.filter(a => a !== index);
        }
        else{
            old_state_of_selectedDays = [...old_state_of_selectedDays, index];
        }
        setSelectedDays(pre => old_state_of_selectedDays);
        setAvailableTypes(pre => getAvailableTypes(timeItems, old_state_of_selectedDays));
        return old_state_of_selectedDays;
    }

    const setSelectedTypesArray = (index) => {
        let old_state_of_selectedTypes = selectedTypes;
        if (old_state_of_selectedTypes.includes(index)){
            const preState = selectedTypes;
            old_state_of_selectedTypes = old_state_of_selectedTypes.filter(a => a !== index);
        }
        else{
            old_state_of_selectedTypes = [...old_state_of_selectedTypes, index];
        }
        setSelectedTypes( pre => old_state_of_selectedTypes);
        return old_state_of_selectedTypes;
    }


    const getTimeItems = (SelectedDays, SelectedTypes) => {
        if(data.data.activeities != undefined){
            
            let sorted = data.data.activeities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
            let time_items = {};
            sorted.forEach(element => {
                
                let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");


                if((SelectedDays.includes(day) || SelectedDays.length === 0)){
                    
                    if(time_items[day] === undefined)
                        time_items[day] = {};
                    let day_activities = data.data.activeities.filter((item) => day === moment(item.start, 'YYYY-MM-DD HH:mm').format("DD/MM"));
                    let sorted_day_activities = day_activities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
                    sorted_day_activities.forEach(activity => {
                        if((SelectedTypes.includes(activity.type) || SelectedTypes.length === 0)){
                            if(time_items[day][activity.type] === undefined)
                                time_items[day][activity.type] = {};
                            if(time_items[day][activity.type][activity.id] === undefined)
                                time_items[day][activity.type][activity.id] = {};
                            activity.range = (moment(activity.end, 'YYYY-MM-DD HH:mm').unix() - moment(activity.start, 'YYYY-MM-DD HH:mm').unix()) / 3600;
                            time_items[day][activity.type][activity.id] = activity;
                        }
                    });
                    
                }
            });
           //setTimeItems(pre => time_items);
            //setAvailableTypes(pre => getAvailableTypes(time_items, SelectedDays));
            setTimeItems(pre => time_items);
            return time_items;

        }
    }

    let setActiveDay = (dayI) => {
        return selectedDays.includes(dayI) ? 'active' : '';
    }

    let setActiveTypes = (typeI) => {
        return selectedTypes.includes(typeI) ? 'active' : '';
    }


    let _setDays = ()=> {
        let sorted = data.data.activeities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
        let time_items = {};
        sorted.forEach(element => {
            let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
            if(selectedDays.includes(day) || selectedDays.length === 0){
                if(time_items[day] === undefined){
                    time_items[day] = {};
                }
            }
        });
        //console.log(time_items);
        setDays(pre => Object.keys(time_items));
        return Object.keys(time_items);
    }


    let getAvailableTypes = (time_items, selected_days) => {
        if(selected_days != undefined){
            console.log(days);
            let _types = [];
            Object.keys(time_items).forEach(day_i => {
                if(selected_days.includes(day_i)){
                    Object.keys(time_items[day_i]).forEach(type_i => {
                        if(!_types.includes(type_i))
                            _types.push(type_i);
                    });
                }
            });

            console.log(_types);

            setAvailableTypes(pre => _types);
            return _types;
        }
    }


    let _setTypes = () => {
        let sorted = data.data.activeities.sort(function(a, b){return (moment(a.start, 'YYYY-MM-DD HH:mm').unix()) - (moment(b.start, 'YYYY-MM-DD HH:mm').unix())});
        let _types = [];
        sorted.forEach(element => {
            let day = moment(element.start, 'YYYY-MM-DD HH:mm').format("DD/MM");
            let type = element.type;
            if(selectedDays.includes(day) || selectedDays.length === 0){
                if(!_types.includes(element.type)){
                    _types.push(element.type);
                }
            }
        });
        return _types;
    }




	useEffect(() => {
        if(data === undefined){
            setData({data:getData()});
        }
        if(data != undefined){
            setTimeItems(pre => getTimeItems([], []));
            
            
            setAvailableTypes(pre => getAvailableTypes());
            setSelectedDays(pre => _setDays());
            
        }
	}, [data]);
    return(
        <div className="schedule">



            <div>{ JSON.stringify(types, null, 2) }</div>

            




            {displayType == "time" ?
                <div className="time_display">
                    <div className="days">
                        <div className="days_box">
                            {days.map((day_i) =>
                                <button
                                    className={setActiveDay(day_i)}
                                    onClick={() => {
                                        getTimeItems(setSelectedDaysArray(day_i), selectedTypes);
                                    }}
                                    key={day_i}
                                >
                                    {day_i}
                                </button>
                            )}
                        </div>
                    </div>
                    
                    { availableTypes != undefined ?
                        <div className="types">
                            <div className="types_box">

                                {availableTypes.map((type_i) =>
                                
                                    <button
                                        className={setActiveTypes(type_i)}
                                        onClick={() => {
                                            getTimeItems(selectedDays, setSelectedTypesArray(type_i));
                                        }}
                                        key={type_i}
                                        >
                                        <div><BsFillAlarmFill/></div>
                                        <div>{data.data.activity_type[type_i].title}</div>
                                    </button>
                                )}
                            </div>
                        </div>
                    : null }
                      
                    { timeItems != undefined ?
                        <span>
                            {Object.keys(timeItems).map((day_i) =>
                                <span className='day' key={day_i}>
                                    { Object.keys(timeItems[day_i]).length > 0 ?
                                        <span>
                                        <div className='day_title'>{day_i}</div>
                                        {Object.keys(timeItems[day_i]).map((type_i) =>
                                            <div className="activities_box" key={type_i}>
                                                {Object.keys(timeItems[day_i][type_i]).map((activity_i) =>
                                                    <span key={activity_i}>
                                                        <ActivityTeaser key={activity_i} item={timeItems[day_i][type_i][activity_i]}></ActivityTeaser>
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
            : null }
        </div>
    );
};

export default Schedule;