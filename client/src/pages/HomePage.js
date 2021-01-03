import React from 'react';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import { homeObjOne, homeObjTwo } from '../components/Section/data';

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Section {...homeObjTwo} />
      <Section {...homeObjOne} />
    </div>
  );
};

export default HomePage;
