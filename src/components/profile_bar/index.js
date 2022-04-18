import React from 'react';
import { Nav} from 'react-bootstrap';
import { FaFolder, FaUser, FaToolbox } from 'react-icons/fa';
import './index.css';

const ProfileBar = () => {
return (
	<>
    <Nav.Link href="#/profile"><FaUser/> Dashboard</Nav.Link>
    <div>
        <Nav.Link onClick={() => barDrop(0)}><FaUser/> Become A Seller</Nav.Link>
        <ul className='barHide'>
            <li><Nav.Link href="#/profile/become-a-seller" ><FaFolder/> Apply</Nav.Link></li>
            <li><Nav.Link href="#/profile/add-item" ><FaFolder/> Add Items</Nav.Link></li>
            <li><Nav.Link href="#/profile/edit-item" ><FaFolder/> Edit Items</Nav.Link></li>
            <li><Nav.Link href="#/profile/edit-item" ><FaToolbox/> Settings</Nav.Link></li>
        </ul>
    </div>    
	</>
);
};

function barDrop(index){
    const hideElements = document.getElementsByClassName("barHide");
    const dropElements = document.getElementsByClassName("barDrop");    
    
    for (let i=0; i<dropElements.length; i++){
        if (dropElements[index].className === "barDrop"){
            dropElements[index].className = "barHide";
            return;
        }
        dropElements[i].className = "barHide";
    }
    if (hideElements.length > 0){
        hideElements[index].className = "barDrop";
    }
}

export default ProfileBar;
