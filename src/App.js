import React, { Component } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/';
import About from './pages/about';
import AddItem from './pages/addItem';
import BAS from './pages/become-a-seller';
import EditItem from './pages/editItem';
import Cart from './pages/shopping-cart';
import Profile from './pages/profile';
import ViewItem from './pages/viewItem';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Search from './pages/search';

/*class App extends Component{
  render(){
    return(
      <Routes>
        <Route exact path='/' component={<Home/>} />
        <Route path='/about' element={<About/>} />        
      </Routes>
    );
  }
}*/


function App() {
return (
  <Routes>
      <Route exact path='/' element={<Home/>} />    
      <Route path='/about' element={<About/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/profile/become-a-seller' element={<BAS/>} />
      <Route path='/profile/add-item' element={<AddItem/>} />
      <Route path='/profile/edit-item' element={<EditItem/>} />
      <Route path='/shopping-cart' element={<Cart/>} />
      <Route path='/view-item' element={<ViewItem/>} />
      <Route path='/accounts/signup' element={<SignUp/>} />
      <Route path='/accounts/signin' element={<SignIn/>} />
      <Route path='/search' element={<Search/>} />      
    </Routes>
);
}

export default App;
