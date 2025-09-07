import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import 'react-alice-carousel/lib/alice-carousel.css';
import './HomeSectionCarousel.css';


const HomeSectionCarosel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const syncActiveIndex = ({ item }) => setActiveIndex(item)

  const responsive = {
    0: {
      items: 2,
      itemsFit: "contain",
    },
    568: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5,
      itemsFit: "contain",
    },
  };

  const items = data?.slice(0, 10).map((item) => (
    <div className="">
      {" "}
      <HomeSectionCard product={item} />
    </div>
  ));
  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5">{sectionName}</h2>
      <div className="relative border p-5">
        <AliceCarousel
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="fadeout"
          animationDuration={500}
        />

      </div>
    </div>
  )
}

export default HomeSectionCarosel
