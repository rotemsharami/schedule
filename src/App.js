import {React, useEffect, useState, useRef} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header/Header';
import NewsFlashTop from './components/NewsFlashTop/NewsFlashTop';
import Content from './components/Content/Content';
import Menu from './components/Menu/Menu';
import FullActivity from './components/FullActivity/FullActivity';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
function App() {
   const [data, setData] = useState();
   const [showMenu, setShowMenu] = useState(false);
   //const [selectedPage, setSelectedPage] = useState("General");
   const [selectedPage, setSelectedPage] = useState("Schedule");
   const windowSize = useRef([window.innerWidth, window.innerHeight]);
   const [showshowFullActivity, setShowFullActivity] = useState(false);
   const [fullActivityId, setFullActivityId] = useState();
   const [timeLine, setTimeLine] = useState({});

   let getShowFullActivity = (show) => {
      setShowFullActivity(show);
   }

   let getFullActivityData = (info) => {
      console.log(info);
      setFullActivityId(info.activityId);
      setTimeLine(info.timeLine);
   }

   
	useEffect(() => {
      if(data === undefined){
          axios.get('https://schedule.latinet.co.il/en/activities')
          .then(response => {
              setData({data:response.data.data});
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
      }
      if(data != undefined){
          
      }
 }, [data]);

   return (
      <div style={{"overflowX": "hidden"}}>    
         {data != undefined ? 
         <Header data={data.data.general_data} setShowMenu={setShowMenu} showMenu={showMenu}></Header>
         : null}

            {data != undefined ?
            <NewsFlashTop data={data}></NewsFlashTop>
            : null}

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
                  ></Content>
            </motion.div>
         )}
      </div>
   );
}

export default App;
