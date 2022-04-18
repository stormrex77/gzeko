import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
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


function App() {
return (
  <>
    <Router>    
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

      <Route exact path='gzeko/' element={<Home/>} />      
      <Route path='gzeko/about' element={<About/>} />
      <Route path='gzeko/profile/' element={<Profile/>} />
      <Route path='gzeko/profile/become-a-seller' element={<BAS/>} />
      <Route path='gzeko/profile/add-item' element={<AddItem/>} />
      <Route path='gzeko/profile/edit-item' element={<EditItem/>} />
      <Route path='gzeko/shopping-cart' element={<Cart/>} />
      <Route path='gzeko/view-item' element={<ViewItem/>} />
      <Route path='gzeko/accounts/signup' element={<SignUp/>} />
      <Route path='gzeko/accounts/signin' element={<SignIn/>} />
      <Route path='gzeko/search' element={<Search/>} />
    </Routes>
    </Router>
  </>
);
}

export default App;