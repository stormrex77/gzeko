import React, { Component } from 'react';
import NavBar from '../components/navbar';
import './styles/viewItem.css';
import {getUrl} from '../components/api/index'
import { Button, Card } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import imgFirstCard from '../images/speaker.webp';
import axios from 'axios';

class ViewItem extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            brand: '',
            color: '',
            image: '',
            price: '0',
            discount: '0',
            category: '',
            description: '',
            seller: '',
            images: [],
            review: []
        }
        this.addCart = this.addCart.bind(this);        
    }

    addCart(){
        var cartInfo = document.getElementById("cartInfo");
        let cartNo = cartInfo.innerText;     
        if (cartNo < 99){
            cartNo++;
            cartInfo.innerText = cartNo;
            cartInfo.style.setProperty("display","block");
            saveCart(this.state);
        }
    }
   

    componentDidMount(){
        sessionStorage.removeItem("search");
        const dataSet = {
            id: sessionStorage.getItem("id"),
            type: "item"
        }        
        let url = getUrl("get_items.php");
        axios.post(url, dataSet)
        .then(res => {
            let defArray = [];
            for (let i = 0; i < res.data.images.length; i++) {                
                defArray.push(
                    <img src={getUrl("uploads/" + res.data.images[i])} alt="" key={i}/>
                )                    
            }            
            this.setState({images: defArray});
            this.setState({id: res.data.id[0]});
            this.setState({name: res.data.name[0]});
            this.setState({brand: res.data.brand[0]});
            this.setState({color: res.data.color[0]});
            this.setState({image: res.data.image[0]});
            this.setState({price: res.data.price[0]});
            this.setState({discount: res.data.discount[0]});
            this.setState({description: res.data.description[0]});
            this.setState({seller: res.data.seller[0]});
            
            axios.post(getUrl("get_review.php"), dataSet)
            .then(res => {
                defArray = [];                
                if (res.data === "failed"){
                    defArray.push(
                        <div className="comment" key={0}>
                            <p>No Review Yet!</p>
                        </div>
                    )
                }else{
                    for (let i = 0; i < res.data.username.length; i++) {
                        defArray.push(
                            <div className="comment" key={i}>
                                <h3>{res.data.username[i]}</h3>
                                <p>{res.data.comment[i]}</p>
                            </div>
                        )
                    }
                }                
                this.setState({review: defArray});
            })
            .catch(error =>{
                console.log(error);
            });

        })
        .catch(error =>{
            console.log(error);
        });
    }
    render(){
        return(
            <>
            <NavBar/>
            <div id='sectViewItem'>
                <div className="left_content">
                    <img src={getUrl("uploads/"+ this.state.image)} alt="" className="image"/>
                    <div className="img_container">
                        {this.state.images}
                    </div>
                </div>
                <div className="right_content">
                    <p>{this.state.name}</p>
                    <br/>
                    <p>Brand: <span>{this.state.brand}</span></p>
                    <p>Color: <span>{this.state.color}</span></p>
                    <p>Price: <span>#{this.state.price}</span></p>
                    <br/>
                    <div className='d-flex justify-content-center'>
                        <Button className='bg-primary' variant='dark' onClick={this.addCart}>ADD TO CART
                            <FaCartPlus className='mx-2'/>
                        </Button>
                    </div>                    
                </div>
            </div>
            
            <div className="description">
                <h2 className="container-fluid d-flex justify-content-between bg-light my-2">Description</h2>
                <p>{this.state.description}</p>
            </div>
            <div className="product_Review">
                <h2 className="container-fluid d-flex justify-content-between bg-light my-2">Review</h2>                
                {this.state.review}                
            </div>            


        <div className="container-fluid d-flex justify-content-between bg-primary text-light border my-2">
        <p>Related Products</p>
        <p className='setPointer'>See All</p>
        </div>
        <section className="container-fluid scrollOverflow sectTopSales">            
        <div>
            <Card className='smallCard bg-light'>
                <Card.Img variant='top' src={imgFirstCard}/>
                <Card.Body>
                    <Card.Text>Small Description of good</Card.Text>
                    <Card.Text className='text-center'>#1500</Card.Text>     
                </Card.Body>                
                <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                    <span className="discountSpan">5</span>%
                </div>
            </Card>
            </div>
            <div>
            <Card className='smallCard bg-light'>
                <Card.Img variant='top' src={imgFirstCard}/>
                <Card.Body>
                    <Card.Text>Small Description of good</Card.Text>
                    <Card.Text className='text-center'>#1500</Card.Text>
                </Card.Body>                
                <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                    <span className="discountSpan">5</span>%
                </div>
            </Card>
            </div>
            <div>
            <Card className='smallCard bg-light'>
                <Card.Img variant='top' src={imgFirstCard}/>
                <Card.Body>
                    <Card.Text>Small Description of good</Card.Text>
                    <Card.Text className='text-center'>#1500</Card.Text>
                </Card.Body>
                <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                    <span className="discountSpan">5</span>%
                </div>
            </Card>
            </div>
        </section>
            </>
        );
    }
};

function saveCart(data){        
    const url = getUrl("add_cart.php");
    axios({
        method: 'post',
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        data: data
    })
    .then(res => {        
        if (res.data.message === "success"){             
            //infoBar.className = "text-success";
            //infoBar.innerText = "Item added to store successfully!";
        }                    
        //enable();
    })
    .catch(error =>({
        error: error.message
    }));
}

export default ViewItem;