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
      <div>

         
         {data != undefined ? 
         <Header data={data.data.general_data} setShowMenu={setShowMenu} showMenu={showMenu}></Header>
         : null}

         
         <AnimatePresence mode='wait'>
         {showMenu && (
            <motion.div
               initial={{ x:  "-50%"}}
               animate={{ x: "0" }}
               exit={{ x: "-50%" }}
               transition={{ duration: 0.5 }}
         >
               <Menu></Menu>
            </motion.div>
            )}
         </AnimatePresence>
            
         
         <AnimatePresence mode='wait'>
         {data != undefined && !showMenu && (
            <motion.div
               initial={{ x:  "0"}}
               animate={{ x: "0" }}
               exit={{ x: "-100%" }}
               transition={{ duration: 0.5 }}
         >
            <Content data={data}></Content>
         </motion.div>
         )}
         </AnimatePresence>
         
      </div>
      
   );
}

export default App;
