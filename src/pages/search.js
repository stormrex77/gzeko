import React, { useEffect, useState} from 'react';
import NavBar from '../components/navbar';
import { Button, Card} from 'react-bootstrap';
import './styles/search.css';
import { FaCartPlus } from 'react-icons/fa';
import axios from 'axios';
import {getUrl, addCart, viewItem} from '../components/api/index';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    let navigate = useNavigate(); 
	const [elements, setElement] = useState([]);
    
    useEffect(() => {
        const dataSet = {
            search: sessionStorage.getItem("search"),
            type: "search"
        };
        const url = getUrl("get_items.php");
        axios.post(url, dataSet)
        .then(res => {
            const defArray = [];            
            for (let i = 0; i < res.data.id.length; i++) {
                const data = {
                    id: res.data.id[i],
                    name: res.data.name[i],
                    brand: res.data.brand[i],
                    color: res.data.color[i],
                    image: res.data.image[i],
                    price: res.data.price[i],
                    discount: res.data.discount[i],
                    category: res.data.category[i],
                    description: res.data.description[i],
                    seller: res.data.seller[i],
                    nav: navigate            
                };
                
                defArray.push(
                    <Card className='bigCard bg-light' key={i}>
                    <div onClick={() => viewItem(data)}>
                        <Card.Img variant='top' src={getUrl("uploads/" + data.image)}/> 
                        <Card.Body>
                            <Card.Text>{data.name}</Card.Text>
                            <Card.Text className='text-center'>#{data.price}</Card.Text>
                        </Card.Body>
                    </div>          
                    <div className='d-flex justify-content-center'>
                        <Button className='bg-primary' variant='dark' onClick={() => addCart(data)}>ADD TO CART
                            <FaCartPlus className='mx-2'/>
                        </Button>
                    </div>
                    <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                        <span className="discountSpan">{data.discount}</span>%
                    </div>
                    </Card>
                );      
            }
            setElement(defArray);
        })
        .catch(error =>{
            console.log(error);
            const defArray = [];
            defArray.push(
                <div id='searchEmpty' key={0}>
                    <p>Item Not Found!</p>
                </div>
            );
            setElement(defArray);
        });
    }, [navigate])
return (
    <>
    <NavBar/>
    <section id='sectSearch'>
        {elements}
    </section>
    </>
);
};

export default Search;