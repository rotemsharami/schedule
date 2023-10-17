import {React, useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import "./DivCarusel.scss";
const DivCarusel = ({items}) => {

    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const images = [
        'http://schedule.rotem/sites/default/files/2023-10/FB_IMG_1643905200420_0.jpg',
        'http://schedule.rotem/sites/default/files/2023-10/319034001_481974017373916_8865815498800768161_n_0.jpg',
      ];

      

    return (
        <div className="slider">
          <button onClick={handlePrev}>Previous</button>
          <div className="slider-container">
            <AnimatePresence 
            mode='wait'
            >

              <motion.img
                key={currentImage}
                src={images[currentImage]}
                initial={{ x: "-"+windowSize.current[1] + 'px' }}
                animate={{ x: "0px" }}
                exit={{ x: ((windowSize.current[1])*2) + 'px' }}
                transition={{ duration: 0.5 }}
              />
            

            </AnimatePresence>
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      );
};


export default DivCarusel;