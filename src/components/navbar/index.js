import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';
import { FaGamepad, FaBluetooth, FaCamera, FaFilter, FaPlay, FaLaptop, FaPhone, FaUsb, FaSearch, FaShoppingCart, FaArrowLeft} from 'react-icons/fa'
import './index.css';
import axios from 'axios';
import {getUrl} from '../api/index';


const NavBar = () => {
	let navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [element, setElement] = useState([]);
		
	useEffect(() => {
		const getSearch = sessionStorage.getItem("search");
		if (getSearch){
			setSearch(getSearch);
		}		
		updateCart();
		let cartInfo = document.getElementById("cartInfo");
		const url = getUrl("get_items.php");
		const data = {type: "cart"}
        axios.post(url, data)
        .then(res => {
			const quantity = res.data.quantity;
			let cartNo = 0;
			if (quantity){
				for (let i = 0; i < quantity.length; i++) {
					cartNo = cartNo + parseInt(quantity[i]);
				}
			}            
			cartInfo.innerText = cartNo;
			if (parseInt(cartInfo.innerText) < 1){
				cartInfo.style.display = "none";
			}
        })
        .catch(error =>{
            console.log(error);
        });
	}, [])
	
	function openSearch() {
		if (storageAvailable("sessionStorage")){
			try{
				sessionStorage.setItem("search", search);
				document.getElementById("searchBar").setAttribute("value", search);
				document.getElementById("searchBarMini").setAttribute("value", search);
				let path = "/search?" + search;				
				if (!isEmpty(search)){					
					navigate(path);
					//window.location.reload();
				}				
			}catch(error){
				alert("Something went wrong! "+error);
			}
		}else{
			alert("please enable cookies!");
		}
	}

	function autoFill(val){
		setSearch(val);
		const defArray = [];
		if (isEmpty(val)){
			setElement(defArray);
			return;
		}
		const url = getUrl("get_items.php");
		const dataSet = {search: val, type: "search"}
        axios.post(url, dataSet)
        .then(res => {			
			if (!res.data.name){
				setElement(defArray);
				return;
			}			
			for (let i = 0; i < res.data.name.length; i++) {
				const data = {
					name: res.data.name[i]
				};              
                defArray.push(
                    <li onClick={(e) => setValue(data.name)} key={i}>{data.name}</li>
                )
            }
            setElement(defArray);
        })
        .catch(error =>{
            console.log(error);
        });
	}

	function setValue(name){		
		setSearch(name);				
		openSearch();
	}

	function isEmpty(str){
		return str === null || str.match(/^ *$/) !== null;
	}	

	function keyEnter(e){		
		if (e.key === "Enter"){
			e.preventDefault();
			openSearch();
		}
	}	
	
return (
	<>
	<Navbar collapseOnSelect bg="dark" variant='dark' expand="md" fixed='top'>
		<Container fluid>
			<Navbar.Brand href="/">
				<img
					alt=""
					src={require('../../images/camera-drone.webp')}
					width="30"
					height="30"
					className="d-inline-block align-top"
				/>{' '}
			Gzeko</Navbar.Brand>

			<div className='searchBar posRelative'>
			<Form className="d-flex">
				<FormControl
				type="search"
				placeholder="Search"
				className="me-2"
				id="searchBar"
				autoComplete='off'
				value={search}
				onKeyPress={keyEnter}
				onChange={(e) => setSearch(e.target.value)}
				/>
				<Button onClick={openSearch}>SEARCH</Button>
			</Form>
			<FaSearch className='iconSearch posAbsolute'/>			
			</div>

			<Button className='btnNavSearch' onClick={expandSearch}><FaSearch/></Button>
			<Button className="btnNavCart btn-dark" href='/shopping-cart'>
				<FaShoppingCart/>
				<div className='posRelative'>
					<div className="bg-danger text-light" id="cartInfo"></div>
				</div>
			</Button>
			
			
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="me-auto">
				<Nav.Link href="#home" style={{width: '80px'}}><FaFilter/> Filter</Nav.Link>				
				<NavDropdown title="Accounts" id="basic-nav-dropdown">
					<NavDropdown.Item className='navLinkColor' href="/accounts/signup">Sign Up</NavDropdown.Item>
					<NavDropdown.Item className='navLinkColor' href="/accounts/signin">Sign In</NavDropdown.Item>					
				</NavDropdown>
				<NavDropdown title="Categories" id="basic-nav-dropdown">
					<NavDropdown.Item className='navLinkColor' href="#action/3.1"><FaPlay style={{margin: '2px'}}/> Audio/Video</NavDropdown.Item>
					<NavDropdown.Item className='navLinkColor' href="#action/3.1"><FaBluetooth style={{margin: '2px'}}/> Bluetooth</NavDropdown.Item>
					<NavDropdown.Item className='navLinkColor' href="#action/3.1"><FaCamera style={{margin: '2px'}}/> Camera</NavDropdown.Item>
					<NavDropdown.Item className='navLinkColor' href="#action/3.1"><FaGamepad style={{margin: '2px'}}/> Gaming</NavDropdown.Item>
					<NavDropdown.Item className='navLinkColor' href="#action/3.1"><FaLaptop style={{margin: '2px'}}/> Laptop Accessories</NavDropdown.Item>
					<NavDropdown.Item className='navLinkColor' href="#action/3.1"><FaPhone style={{margin: '2px'}}/> Phone Accessories</NavDropdown.Item>
					<NavDropdown.Item className='navLinkColor' href="#action/3.1"><FaUsb style={{margin: '2px'}}/> Storage</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
	<div className='' id='infoBar'></div>
		
	<section id='searchBox'>
		<div id='scrollInto'></div>
		<div className='posRelative'>
			<Form className="d-flex">
				<FormControl
				type="search"
				placeholder="Search..."
				className="me-2"
				id="searchBarMini"
				autoComplete='off'
				value={search}
				onKeyPress={keyEnter}
				onChange={(e) => autoFill(e.target.value)}
				/>
			</Form>			
			<FaArrowLeft className='iconBack posAbsolute' onClick={closeSearch}/>
		</div>
		<div id='searchContent'>
			<ul id='searchListMini'>
				{element}
			</ul>
		</div>
	</section>
	</>
);
};

function expandSearch(e){
	e.preventDefault();	
	document.getElementById("searchBox").style.display = "block";
	document.getElementById("searchBarMini").focus();
	document.getElementById("scrollInto").scrollIntoView();
	document.getElementsByTagName("body")[0].style.overflowY = "hidden";
}

function closeSearch(e){
	e.preventDefault();
	document.getElementById("searchBox").style.display = "none";
	document.getElementsByTagName("body")[0].style.overflowY = "auto";
}

function updateCart(){
	if (storageAvailable("localStorage")){
		try{
			let objId = JSON.parse(localStorage.getItem("id"));
			let objQuantity = JSON.parse(localStorage.getItem("quantity"));
			if (!objId){objId = [];}
			if (!objQuantity){objQuantity = [];}
			const url = getUrl("update_cart.php");
			for (let i = 0; i < objId.length; i++){
				const data = {id: objId[i], quantity: objQuantity[i]}
				axios.post(url, data)
				.then(res => {
				})
				.catch(error =>{
					console.log(error);
				});
			}
			localStorage.removeItem("id");
			localStorage.removeItem("quantity");
		}catch(error){
			alert("Something went wrong! "+error);
		}
	}else{
		alert("please enable cookies!");
	}
}

function storageAvailable(type){
	var storage;
	try{
		storage = window[type];
		var x = "storage_Test";        
		storage.setItem(x,x);
		storage.removeItem(x);
		return true;
	}catch(e){
		return e instanceof DOMException && (
			e.code === 22 || e.code === 1014 || e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED"
		) && (Storage && Storage.length !== 0);
	}
}	

export default NavBar;
