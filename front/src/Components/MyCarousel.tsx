import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import b1 from '../../public/img/bureaux1.jpeg';
import b2 from '../../public/img/bureaux2.jpeg';
import b3 from '../../public/img/bureaux3.jpeg';
import b4 from '../../public/img/bureaux4.jpeg';
import b5 from '../../public/img/bureaux5.jpeg';
import b6 from '../../public/img/bureaux6.jpeg';
import b7 from '../../public/img/bureaux7.jpg';



import "./MyCarousel.css";

const imageData = [
  {
    label: "Open space du premier étage",
    alt: "image1",
    img: b1
  },
  {
    label: "Open space du deuxième étage",
    alt: "image2",
    img: b2
  },
  {
    label: "Salle de repos",
    alt: "image3",
    img: b3
  },
  {
    label: "Salle de pause",
    alt: "image4",
    img: b4
  },
  {
    label: "Salle de réunion",
    alt: "image4",
    img: b5
  },
  {
    label: "Hall",
    alt: "image4",
    img: b6
  },
  {
    label: "Open space du cinquième étage",
    alt: "image4",
    img: b7
  },
];

const renderSlides = imageData.map((image) => (
  <div key={image.alt}>
    <img src={image.img} alt={image.alt} />
    <p className="legend">{image.label}</p>
  </div>
));

export default function MyCarousel() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  return (
    <div className="App">
      
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className="carousel-container"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}