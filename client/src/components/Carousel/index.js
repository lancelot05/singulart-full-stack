import React, { useEffect, useState } from 'react';
import './index.css';
import { ImageStore } from './db';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../MaterialUiTheme';

const Carousel = () => {
  const artwork = useSelector((state) => state.artwork.artwork);
  const isLoading = useSelector((state) => state.artwork.isLoading);

  const [prev, setPrev] = useState(0);
  const [current, setCurrent] = useState(0);

  const [next, setNext] = useState(1);

  useEffect(() => {
    if (artwork) {
      setPrev(artwork.length - 1);
    }
  }, [artwork]);

  const goNext = (current, prev, next) => {
    setCurrent(current === artwork.length - 1 ? 0 : current + 1);
    setNext(next === artwork.length - 1 ? 0 : next + 1);
    setPrev(prev === artwork.length - 1 ? 0 : prev + 1);
  };

  const goBack = (current, prev, next) => {
    setCurrent(current === 0 ? artwork.length - 1 : current - 1);
    setNext(next === 0 ? artwork.length - 1 : next - 1);
    setPrev(prev === 0 ? artwork.length - 1 : prev - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="CarouselContainer">
        <div className="CarouselImg">
          {isLoading || !artwork ? (
            <div className="SpinnerWrapper">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              <div className="left" onClick={() => goBack(current, prev, next)}>
                <ArrowBackIosIcon fontSize="large" />
              </div>
              <div
                className="middleLeft"
                style={{
                  backgroundImage: `url(${artwork[prev].artworkImg})`,
                }}
              >
                <h1>{artwork[prev].title}</h1>
              </div>
              <div
                className="middle"
                style={{
                  backgroundImage: `url(${artwork[current].artworkImg})`,
                }}
              >
                <h1>{artwork[current].title}</h1>
              </div>
              <div
                className="middleRight"
                style={{
                  backgroundImage: `url(${artwork[next].artworkImg})`,
                }}
              >
                <h1>{artwork[next].title}</h1>
              </div>
              <div
                className="right"
                onClick={() => goNext(current, prev, next)}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </div>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Carousel;
