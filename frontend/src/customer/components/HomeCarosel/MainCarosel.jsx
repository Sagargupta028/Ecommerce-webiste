import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { MainCaroselData } from './MainCaroselData';
import 'react-alice-carousel/lib/alice-carousel.css';

// const responsive = {
//     0: { items: 1 },
//     568: { items: 2 },
//     1024: { items: 3 },
// };


const MainCarosel = () => {
    
    const items = MainCaroselData.map((item)=> <img className='cursor-pointer'role='presentation' src={item.image} alt=''/>)
    return (
    <AliceCarousel
     items={items}
     disableButtonsControls
     autoPlay
     autoPlayInterval={3000}
     infinite
    />)
};

export default MainCarosel;