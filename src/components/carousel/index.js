import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import imgFirstSlide from '../../images/apple-phones.webp';
import imgSecondSlide from '../../images/camera-drone.webp';
import imgThirdSlide from '../../images/camera.jpeg';
import imgLastSlide from '../../images/gamepad.jpeg';
import './index.css';

function ControlledCarousel() { 
    const [index, setIndex] = useState(0);  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };  
    setBigScreenImage(index - 1, index + 1);
    return (
      <>
        <div className="bigScreenCarousel">
            <div style={{width: 'auto'}}><img className="d-block bigScreenImage me-1" src={imgLastSlide} alt='prevSlide'/></div>
            <div style={{width: 'auto'}}><img className="d-block bigScreenImage" src={imgSecondSlide} alt='prevSlide'/></div>
        </div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block carouselImage"
              src={imgFirstSlide}
              alt="First slide"
            />        
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block carouselImage"
              src={imgSecondSlide}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block carouselImage"
              src={imgThirdSlide}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block carouselImage"
              src={imgLastSlide}
              alt="Last slide"
            />
          </Carousel.Item>
        </Carousel>
      </>    
    );
  }
  
  function setBigScreenImage(prevSlideNo, nextSlideNo){
    var carouselImage = document.getElementsByClassName("carouselImage");
    var bigScreenImage = document.getElementsByClassName("bigScreenImage");  
    if (prevSlideNo < 0) {
      prevSlideNo = 2;
    }
    if (nextSlideNo > 2) {
      nextSlideNo = 0;
    }  
    if (carouselImage.length > 0){
      bigScreenImage[0].setAttribute("src",carouselImage[prevSlideNo].getAttribute("src"));
      bigScreenImage[1].setAttribute("src",carouselImage[nextSlideNo].getAttribute("src"));
    }  
  }
  
  export default ControlledCarousel;