import React from 'react';
import NavBar from '../components/navbar';
import ControlledCarousel from '../components/carousel';
import HomeSubContents from '../components/home_subcontents';

const Home = () => {
return (
	<>
	<NavBar/>
	<ControlledCarousel/>
    <HomeSubContents/>
	</>	
);
};

export default Home;
