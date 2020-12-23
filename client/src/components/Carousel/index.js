import React, { useState } from 'react';
import './index.css';
import { ImageStore } from './db';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(ImageStore.length - 1);
  const [next, setNext] = useState(1);

  const goNext = (current, prev, next) => {
    setCurrent(current === ImageStore.length - 1 ? 0 : current + 1);
    setNext(next === ImageStore.length - 1 ? 0 : next + 1);
    setPrev(prev === ImageStore.length - 1 ? 0 : prev + 1);
  };

  const goBack = (current, prev, next) => {
    setCurrent(current === 0 ? ImageStore.length - 1 : current - 1);
    setNext(next === 0 ? ImageStore.length - 1 : next - 1);
    setPrev(prev === 0 ? ImageStore.length - 1 : prev - 1);
  };

  return (
    <div className="CarouselContainer">
      <div className="CarouselImg">
        <div className="left" onClick={() => goBack(current, prev, next)}>
          <ArrowBackIosIcon fontSize="large" />
        </div>
        <div
          className="middleLeft"
          style={{
            backgroundImage: `url(${ImageStore[prev].img})`,
          }}
        ></div>
        <div
          className="middle"
          style={{
            backgroundImage: `url(${ImageStore[current].img})`,
          }}
        ></div>
        <div
          className="middleRight"
          style={{
            backgroundImage: `url(${ImageStore[next].img})`,
          }}
        ></div>
        <div className="right" onClick={() => goNext(current, prev, next)}>
          <ArrowForwardIosIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
