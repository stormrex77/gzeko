import React from 'react';
import './styles/profile.css';
import NavBar from '../components/navbar';
import ProfileBar from '../components/profile_bar';

const Profile = () => {
return (
	<>
	<NavBar/>
	<section id='profileBody'>
        <div id='profileSideMenu' className='bg-light'>
			<ProfileBar/>
		</div>
	</section>	
	</>
);
};

export default Profile;
