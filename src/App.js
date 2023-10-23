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
      <div style={{"overflow-x": "hidden"}}>    
         {data != undefined ? 
         <Header data={data.data.general_data} setShowMenu={setShowMenu} showMenu={showMenu}></Header>
         : null}
            <motion.div
               initial={{ x:  "-100%"}}
               animate={{ x: showMenu ? "0" : "-100%"}}
               exit={{ x: showMenu ? "30%" : "0"}}
               transition={{ duration: 0.5 }}
               style={{position:"absolute", width:"30%"}}
         >
               <Menu></Menu>
            </motion.div>
         {data != undefined && (
            <motion.div
            initial={{ x:  "0"}}
            animate={{ x: showMenu ? "30%" : "0"}}
            exit={{ x: showMenu ? "30%" : "0"}}
            transition={{ duration: 0.5 }}
            style={{position:"absolute", width:"100%"}}
            >
               <Content data={data}></Content>
            </motion.div>
         )}
      </div>
   );
}

export default App;
