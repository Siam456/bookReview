import React from 'react';
import CovidAlert from './CovidAlert';
import Motivation from './Motivation';
import Partner from './Partners';
import PopularBooks from './PopularBooks';
import PopularCategory from './PopularCategory';
import TopCarousel from './TopCarousel';

const Home = () => {
    return (
        <>
            <TopCarousel />
            <PopularCategory /> 
            <CovidAlert />
            <PopularBooks />
            <Motivation />
            <Partner />
        </>
    );
};

export default Home;