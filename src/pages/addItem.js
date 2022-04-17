import React, { Component } from 'react';
import NavBar from '../components/navbar';
import axios from 'axios';
import './styles/editItem.css';
import { Button, FormControl, Spinner } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import {getUrl, setInfoBar, enable, disable} from '../components/api/index';
import ProfileBar from '../components/profile_bar';

class AddItem extends Component{
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            brand: '',
            color: '',
            imgName: '',
            price: '0',
            discount: '0',
            category: '',
            quantity: '1',
            description: '',
            seller: 'Gzeko',
            image: null,
            file: null,
            dataSent: ''
        }
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeImg(e){
        this.setState({
            image: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    onSubmit(e){
        disable(e.target.id, "btnSpinner");
        if (!checkValid(
            this.state.name,
            this.state.brand,
            this.state.color,
            this.state.image,
            this.state.price,
            this.state.discount,
            this.state.category,
            this.state.quantity,
            this.state.description,
            this.state.seller
        )){
            enable(e.target.id, "btnSpinner");
            return;
        }
        
        const formData = new FormData();
        formData.append('image', this.state.file);
        
        let apiPath = getUrl("uploadPic.php");
        const url = getUrl("add_item.php");
        axios.post(apiPath, formData,{})
        .then(res => {            
            console.log(res.data);
            if ((res.data.message) === "success"){                
                this.setState({id: res.data.id});
                this.setState({imgName: res.data.file});
                axios({
                    method: 'post',
                    url: url,
                    headers: {
                        'content-type': 'application/json'
                    },
                    data: this.state
                })
                .then(res => {
                    if (res.data.message === "success"){ 
                        setInfoBar("bg-success","Item added to store successfully!");
                    }                    
                    enable(e.target.id, "btnSpinner");
                })
                .catch(error => this.setState({
                    error: error.message
                }));
            }else{
                enable(e.target.id, "btnSpinner");
            }          
        })        
    }    
    
    render(){
        return(
            <>
            <NavBar/>
            <section id='profileBody'>
            <div id='profileSideMenu' className='bg-light'>
                <ProfileBar/>
            </div>
                <div id='addItem'>                    
                    <h3>ADD ITEM</h3>
                    <div className="inputAddItem">
                        <div className='inputEditDiv'>
                        <label>Name <span className='text-danger'>*</span></label>
                        <input type="text"
                            maxLength={150}
                            placeholder="Enter Item Name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value})}                            
                            />                        
                        </div>
                        <div className='inputEditDiv'>
                        <label>Brand <span className='text-danger'>*</span></label>
                        <input type="text"
                            maxLength={150}
                            placeholder="Enter Item Brand"
                            value={this.state.brand}
                            onChange={e => this.setState({ brand: e.target.value})}
                            />
                        </div>
                        <div className='inputEditDiv'>
                        <label>Color <span className='text-danger'>*</span></label>
                        <input type="text"
                            maxLength={100}
                            placeholder="Enter Item Color"
                            value={this.state.color}
                            onChange={e => this.setState({ color: e.target.value})}
                            />
                        </div>
                        <div className='inputEditDiv'>
                            <label>Image <span className='text-danger'>*</span></label>
                            <FormControl type="file" accept='image/*'
                            onChange={this.onChangeImg}
                            />
                        </div>
                        <div className='inputEditDiv'>
                        <label>Price <span className='text-danger'>*</span></label>
                        <input type="text"
                            maxLength={150}
                            placeholder="Enter Item Price"
                            value={this.state.price}
                            onChange={e => this.setState({ price: e.target.value})}
                            />
                        </div>
                        <div className='inputEditDiv'>
                        <label>Discount (%) <span className='text-danger'>*</span></label>
                        <input type="text"
                            maxLength={150}
                            placeholder="Enter Price Discount"
                            value={this.state.discount}
                            onChange={e => this.setState({ discount: e.target.value})}
                            />
                        </div>
                        <div className='inputEditDiv'>
                            <label>Category <span className='text-danger'>*</span></label>
                            <select
                            value={this.state.category}
                            onChange={e => this.setState({ category: e.target.value})}>
                                <option value={""}>...</option>
                                <option value={"Audio/Video"}>Audio/Video</option>
                                <option value={"Bluetooth"}>Bluetooth</option>
                                <option value={"Camera"}>Camera</option>
                                <option value={"Gaming"}>Gaming</option>
                                <option value={"Laptop Accessories"}>Laptop Accessories</option>
                                <option value={"Phone Accessories"}>Phone Accessories</option>
                                <option value={"Storage"}>Storage</option>
                            </select>
                        </div>
                        <div className='inputEditDiv'>
                        <label>Quantity <span className='text-danger'>*</span></label>
                        <input type="text"
                            maxLength={150}
                            placeholder="Enter Item Quantity"
                            value={this.state.quantity}
                            onChange={e => this.setState({ quantity: e.target.value})}
                            />
                        </div>
                        <section className='divTextArea'>
                            <label>Description <span className='text-danger'>*</span></label>
                            <textarea
                            maxLength={1500}
                            rows={7}
                            value={this.state.description}
                            onChange={e => this.setState({ description: e.target.value})}>
                            </textarea>
                        </section> 
                    </div>                 
                    <div id='btnDiv'><Button id='btnSave' onClick={this.onSubmit}>
                        <FaSave/> SAVE ITEM
                        <Spinner id='btnSpinner' animation='border' role={'status'} size='sm' hidden>                            
                        </Spinner>
                    </Button></div>
                </div>
            </section>
            </>
        )
    }
}

function checkValid(name, brand, color, image, price, discount, category, quantity, description, seller) {    
    if (isEmpty(name) || isEmpty(brand) || isEmpty(color) || isEmpty(price) || isEmpty(discount) || isEmpty(category) || isEmpty(quantity) || isEmpty(description) || isEmpty(seller)){
        setInfoBar("bg-danger","Fill In All Information!");      
        return false;
    }
    if (isNaN(price) || isNaN(discount)){
        setInfoBar("bg-danger","Price Entered Is Not A Number!");        
        return false;
    }
    if (isNaN(quantity) || parseInt(quantity) < 1){
        setInfoBar("bg-danger","Quantity Entered Is Not A Number!");
        return false;
    }    
    if (image === null){
        setInfoBar("bg-danger", "Select A Valid Image!");
        return false;
    }
    return true;
}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

export default AddItem;