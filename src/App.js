import {React, useEffect, useState, useRef} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Menu from './components/Menu/Menu';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
function App() {
   const [data, setData] = useState();

   const [showMenu, setShowMenu] = useState(false);

   const [selectedPage, setSelectedPage] = useState("General");

   const windowSize = useRef([window.innerWidth, window.innerHeight]);



   

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
            <motion.div
               initial={{ x:  "-100%"}}
               animate={{ x: showMenu ? "0" : "-100%"}}
               exit={{ x: showMenu ? (windowSize.current[0] >= 767 ? "30%" : "80%") : "0"}}
               transition={{ duration: 0.4 }}
               style={{position:"fixed", width:(windowSize.current[0] >= 767 ? "30%" : "80%"), top: "60px"}}
         >
               <Menu setSelectedPage={setSelectedPage} selectedPage={selectedPage} setShowMenu={setShowMenu}></Menu>
            </motion.div>
         {data != undefined && (
            <motion.div
            initial={{ x:  "0"}}
            animate={{ x: showMenu ? (windowSize.current[0] >= 767 ? "30%" : "80%") : "0"}}
            exit={{ x: showMenu ? (windowSize.current[0] >= 767 ? "30%" : "80%") : "0"}}
            transition={{ duration: 0.4 }}
            style={{ width:"100%", marginTop: "60px"}}
            >
               {showMenu ? 
                  <div className='hiding_div'
                  style={{ height: (windowSize.current[1]) -60 + 'px' }}
                  ></div>
               :null}

               <Content data={data} setSelectedPage={setSelectedPage} selectedPage={selectedPage}></Content>
            </motion.div>
         )}
      </div>
   );
}

export default App;
