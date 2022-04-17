import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaMinus, FaMoneyCheck, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';
import NavBar from '../components/navbar';
import './styles/shopping-cart.css';
import imgFirstCard from '../images/speaker.webp';
import axios from 'axios';
import {getUrl, viewItem} from '../components/api/index';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    let navigate = useNavigate();
    const [elements, setElement] = useState([]);	

    useEffect(() => {
        const dataSet = {            
            type: "cart"
        };
        const url = getUrl("get_items.php");
        axios.post(url, dataSet)
        .then(res => {
            if (!res.data.id){
                document.getElementById("cartEmpty").style.setProperty("display","flex");
                document.getElementById("btnCheckout").style.setProperty("display","none");
                document.getElementById("cartInfo").style.setProperty("display","none");
                return;
            }            
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
                    quantity: res.data.quantity[i],
                    totalPrice: 0,
                    nav: navigate
                };
                const totalPrice = parseInt(data.price) * parseInt(data.quantity);
                data.totalPrice = totalPrice;
                const itemId = "item" + i;
                const txtItemId = "txtItem" + i;
                const itemTPriceId = "itemTPrice" + i;
                defArray.push(
                    <div className='cartCard bg-light' id={itemId} key={i}>
                        <div className='itemCard posRelative' onClick={() => viewItem(data)}>
                            <img alt='item' src={getUrl("uploads/" + data.image)}/>
                            <div>
                                <p><span>{data.name}</span></p>
                                <p><span>Brand:</span> {data.brand}</p>
                                <p><span>Color:</span> {data.color}</p>
                                <p><span>Seller:</span> {data.seller}</p>
                                <p>#{data.price}</p>
                            </div>                    
                            <div className="bg-dark text-info discountInfo p-1 posAbsolute">-
                                <span className="discountSpan">{data.discount}</span>%
                            </div>
                        </div>
                        <div className='cartButtons'>
                            <div className='cartRemove text-primary' onClick={() => removeItem(data, i)}><FaTrash/> REMOVE</div>
                            <div className='cartNoEditor'>
                                <Button onClick={() => minusItem(data, i)}><FaMinus/></Button>
                                <input
                                type="text"
                                className="txtItemNo bg-light"
                                id={txtItemId}                      
                                defaultValue={data.quantity}
                                onChange={() => editItemNo(data, i)}
                                /> 
                                <Button onClick={() => addItem(data, i)}><FaPlus/></Button>
                            </div>
                            <div className='itemTotalPrice' id={itemTPriceId}>#{totalPrice}</div>
                        </div>
                    </div>
                )         
            }
            setElement(defArray);            
        })
        .catch(error =>{
            console.log(error);
        });
    }, [navigate])
return (
    <>
    <NavBar/>
    <section id='sectCart'>
        <div id='cartEmpty'>
            <p>No item added to cart yet!</p>
        </div>
        {elements}
        <div className='cartButtons2'>
            <Button><FaShoppingCart/> CONTINUE SHOPPING</Button>
            <Button id='btnCheckout'><FaMoneyCheck/> CHECKOUT</Button>
        </div>
    </section>

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
};

function editItemNo(data, index){
    var cartInfo = document.getElementById("cartInfo");
    var txtItem = document.getElementById("txtItem" + index);
    var itemTotal = document.getElementById("itemTPrice" + index);
    var txtItemNo = document.getElementsByClassName("txtItemNo");   
    data.quantity = parseInt(txtItem.value);
    var totalItemNo = 0;
    var itemTotalNo = data.price * data.quantity;
    
    for (let i = 0; i < txtItemNo.length; i++){
        totalItemNo = totalItemNo + parseInt(txtItemNo[i].value);
    }
    if (totalItemNo > 0 && totalItemNo < 100){
        cartInfo.innerText = totalItemNo;
        itemTotal.innerText = "#" + itemTotalNo;
    }    
    if (data.quantity < 1){
        removeItem(data, index);
        return;
    }
    saveQuantity(data.id, data.quantity);
}

function minusItem(data, index){
    var cartInfo = document.getElementById("cartInfo");
    var txtItem = document.getElementById("txtItem" + index);
    var itemTotal = document.getElementById("itemTPrice" + index);
    var cartNo = parseInt(cartInfo.innerText);
    
    data.quantity = parseInt(txtItem.value) - 1;
    var itemTotalNo = data.price * data.quantity;
    if (cartNo > 0){
        cartInfo.innerText = cartNo - 1;
        txtItem.value = data.quantity;
        itemTotal.innerText = "#" + itemTotalNo;
        cartInfo.style.setProperty("display","block");
    }
    if ((cartNo - 1) === 0){
        cartInfo.style.setProperty("display","none");
    }
    if (data.quantity < 1){        
        removeItem(data, index);
        return;
    }
    saveQuantity(data.id, data.quantity);    
}

function addItem(data, index){
    var cartInfo = document.getElementById("cartInfo");
    var txtItem = document.getElementById("txtItem" + index);
    var itemTotal = document.getElementById("itemTPrice" + index);
    var cartNo = parseInt(cartInfo.innerText);
        
    if (cartNo < 99){
        data.quantity = parseInt(txtItem.value) + 1;
        var itemTotalNo = data.price * data.quantity;
        cartInfo.innerText = cartNo + 1;
        txtItem.value = data.quantity;
        itemTotal.innerText = "#" + itemTotalNo;
        cartInfo.style.setProperty("display","block");
        saveQuantity(data.id, data.quantity);        
    }
}

function removeItem(data, index){
    const url = getUrl("delete_cart.php");
    axios.post(url, data)
    .then(res => {
        if (res.data.message === "success"){
            let sectCart = document.getElementById("sectCart");
            let cartCard = document.getElementById("item" + index);
            let cartInfo = document.getElementById("cartInfo");
            let txtItem = document.getElementById("txtItem" + index);    
            data.quantity = parseInt(txtItem.value);
            let cartNo = parseInt(cartInfo.innerText) - data.quantity;
            if (cartNo > 0){
                cartInfo.innerText = cartNo;
                cartInfo.style.setProperty("display","block");
            }
            if (cartNo < 1){
                document.getElementById("cartEmpty").style.setProperty("display","flex");
                document.getElementById("btnCheckout").style.setProperty("display","none");
                cartInfo.style.setProperty("display","none");
            }
            sectCart.removeChild(cartCard);    
        }
    })
    .catch(error =>{
        console.log(error);
    });    
}

function saveQuantity(id, quantity){
    if (storageAvailable("localStorage")){
        try{
            let objId = JSON.parse(localStorage.getItem("id"));
            let objQuantity = JSON.parse(localStorage.getItem("quantity"));
            if (!objId){objId = [];}
            if (!objQuantity){objQuantity = [];}
            objId.push(id);
            objQuantity.push(quantity);
            localStorage.setItem("id", JSON.stringify(objId));
            localStorage.setItem("quantity", JSON.stringify(objQuantity));
            updateCart();
        }catch(error){
            alert("Something went wrong! "+error);
        }
    }else{
        alert("please enable cookies!");
    }
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





export default Cart;