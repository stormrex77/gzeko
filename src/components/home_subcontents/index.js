import React from 'react';
import { Button, Card} from 'react-bootstrap';
import './index.css';
import imgFirstCard from '../../images/apple-phones.webp';
import { FaCartPlus } from 'react-icons/fa';

function home_subcontents(){
    return (
        <>
        <div className="container-fluid d-flex justify-content-between bg-primary text-light border my-2">
            <p>Top Sales</p>
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
                <div className='d-flex justify-content-center'>
                    <Button className='bg-primary' variant='dark' onClick={addCart}>ADD TO CART
                        <FaCartPlus className='mx-2'/>
                    </Button>
                </div>
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
                <div className='d-flex justify-content-center'>
                    <Button className='bg-primary' variant='dark' onClick={addCart}>ADD TO CART
                        <FaCartPlus className='mx-2'/>
                    </Button>
                </div>
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
                <div className='d-flex justify-content-center'>
                    <Button className='bg-primary' variant='dark' onClick={addCart}>ADD TO CART
                        <FaCartPlus className='mx-2'/>
                    </Button>
                </div>
                <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                    <span className="discountSpan">5</span>%
                </div>
            </Card>
            </div>
        </section>

        <div className="container-fluid d-flex justify-content-between bg-primary text-light border my-2">
            <p>Hot Items</p>
            <p className='setPointer'>See All</p>
        </div>        
        <section id='sectItems'>
            <Card className='bigCard bg-light'>
                <Card.Img variant='top' src={imgFirstCard}/>
                <Card.Body>
                    <Card.Text>Small Description of good</Card.Text>
                    <Card.Text className='text-center'>#1500</Card.Text>
                </Card.Body>
                <div className='d-flex justify-content-center'>
                    <Button className='bg-primary' variant='dark' onClick={addCart}>ADD TO CART
                        <FaCartPlus className='mx-2'/>
                    </Button>
                </div>
                <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                    <span className="discountSpan">5</span>%
                </div>
            </Card>
            <Card className='bigCard bg-light'>
                <Card.Img variant='top' src={imgFirstCard}/>
                <Card.Body>
                    <Card.Text>Small Description of good</Card.Text>
                    <Card.Text className='text-center'>#1500</Card.Text>
                </Card.Body>
                <div className='d-flex justify-content-center'>
                    <Button className='bg-primary' variant='dark' onClick={addCart}>ADD TO CART
                        <FaCartPlus className='mx-2'/>
                    </Button>
                </div>
                <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                    <span className="discountSpan">5</span>%
                </div>
            </Card>
            <Card className='bigCard bg-light'>
                <Card.Img variant='top' src={imgFirstCard}/>
                <Card.Body>
                    <Card.Text>Small Description of good</Card.Text>
                    <Card.Text className='text-center'>#1500</Card.Text>
                </Card.Body>
                <div className='d-flex justify-content-center'>
                    <Button className='bg-primary' variant='dark' onClick={addCart}>ADD TO CART
                        <FaCartPlus className='mx-2'/>
                    </Button>
                </div>
                <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                    <span className="discountSpan">5</span>%
                </div>
            </Card>
        </section>        
        </>        
    );
}

function addCart(e){
    e.preventDefault();
    var cartInfo = document.getElementById("cartInfo");
    var cartNo = parseInt(cartInfo.innerText);
    if (cartNo < 99){
        cartInfo.innerText = cartNo + 1;
        cartInfo.style.setProperty("display","block");
    }
}


export default home_subcontents;