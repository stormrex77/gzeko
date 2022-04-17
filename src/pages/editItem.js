import React, { Component } from 'react';
import NavBar from '../components/navbar';
import axios from 'axios';
import './styles/editItem.css';
import { Button, FormControl, Spinner, Table } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import {getUrl, setInfoBar, enable, disable} from '../components/api/index';
import ProfileBar from '../components/profile_bar';

class EditItem extends Component{
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            brand: '',
            color: '',
            imgName: '',
            imgName1: '',
            imgName2: '',
            imgName3: '',
            imgName4: '',
            imgName5: '',
            price: '',
            discount: '',
            category: '',
            quantity: '',
            description: '',
            seller: 'Gzeko',
            image: null,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            image5: null,
            images: [],            
            btnName: 'UPDATE ITEM',
            elements: []
        }        
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onChangeImg1 = this.onChangeImg1.bind(this);
        this.onChangeImg2 = this.onChangeImg2.bind(this);
        this.onChangeImg3 = this.onChangeImg3.bind(this);
        this.onChangeImg4 = this.onChangeImg4.bind(this);
        this.onChangeImg5 = this.onChangeImg5.bind(this);
        this.headChange = this.headChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdateImage = this.onUpdateImage.bind(this);
        this.onUpdateImage1 = this.onUpdateImage1.bind(this);
        this.onUpdateImage2 = this.onUpdateImage2.bind(this);
        this.onUpdateImage3 = this.onUpdateImage3.bind(this);
        this.onUpdateImage4 = this.onUpdateImage4.bind(this);
        this.onUpdateImage5 = this.onUpdateImage5.bind(this);
        this.UpdateImages = this.UpdateImages.bind(this);
    }

    componentDidMount(){
        document.getElementById("btnSave").onclick = this.onSubmit;
        const dataSet = {
            userId: sessionStorage.getItem("userId"),
            type: "tView"
        };
        if (!dataSet.userId){
            dataSet.userId = "Gzeko";
        }
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
                    imgName: res.data.image[i],
                    imgName1: res.data.images[0],
                    imgName2: res.data.images[1],
                    imgName3: res.data.images[2],
                    imgName4: res.data.images[3],
                    imgName5: res.data.images[4],
                    price: res.data.price[i],
                    discount: res.data.discount[i],
                    category: res.data.category[i],
                    description: res.data.description[i],
                    quantity: res.data.quantity[i],
                    seller: res.data.seller[i]                    
                };
                
                defArray.push(
                    <tr className="tableRow" onClick={() => this.setState(data)} key={i}>
                        <td>{i + 1}</td>
                        <td>{data.id}</td>
                        <td>
                            <div className='tdDiv'>{data.name}</div>                            
                            <div className='tdRel'><div className='tdView border bg-light'>{data.name}</div></div>
                        </td>
                        <td>{data.brand}</td>
                        <td>{data.color}</td>                                
                        <td>{data.price}</td>
                        <td>{data.discount}</td>
                        <td>{data.category}</td>
                        <td>
                            <div className='tdDiv'>{data.description}</div>
                            <div className='tdRel'><div className='tdView border bg-light'>{data.description}</div></div>                        
                        </td>
                        <td>{data.quantity}</td>                               
                    </tr>
                );      
            }
            this.setState({elements: defArray});
        })
        .catch(error =>{
            console.log(error);            
        });
    }

    onChangeImg(e){
        this.setState({
            image: e.target.files[0]
        })
    }
    onChangeImg1(e){
        this.setState({
            image1: e.target.files[0]
        })
    }
    onChangeImg2(e){
        this.setState({
            image2: e.target.files[0]
        })
    }
    onChangeImg3(e){
        this.setState({
            image3: e.target.files[0]
        })
    }
    onChangeImg4(e){
        this.setState({
            image4 : e.target.files[0]
        })
    }
    onChangeImg5(e){
        this.setState({
            image5: e.target.files[0]            
        })
    }
    
    onUpdateImage(){
        const img = [this.state.image];        
        this.UpdateImages("btnImage", "btnSpinner0", img, "one");
    }
    onUpdateImage1(){
        const img = [this.state.image1];        
        this.UpdateImages("btnImage1", "btnSpinner1", img, "one");
    }
    onUpdateImage2(){
        const img = [this.state.image2];        
        this.UpdateImages("btnImage2", "btnSpinner2", img, "one");
    }
    onUpdateImage3(){
        const img = [this.state.image3];        
        this.UpdateImages("btnImage3", "btnSpinner3", img, "one");
    }
    onUpdateImage4(){
        const img = [this.state.image4];        
        this.UpdateImages("btnImage4", "btnSpinner4", img, "one");
    }
    onUpdateImage5(){
        const img = [this.state.image5];        
        this.UpdateImages("btnImage5", "btnSpinner5", img, "one");
    }

    UpdateImages(btnId, spinnerId, img, type){
        if (type !== ("one")){            
            btnId = "btnSave";
            spinnerId = "btnSpinner";
            img = [this.state.image, this.state.image1, this.state.image2, this.state.image3, this.state.image4, this.state.image5];            
            if (this.state.image === null || this.state.image1 === null || this.state.image2 === null ||
                this.state.image3 === null || this.state.image4 === null || this.state.image5 === null){
                setInfoBar("bg-danger", "Select Valid Images!");
                enable(btnId, spinnerId);
                return;
            }
        }
        disable(btnId, spinnerId);
        if (this.state.id === ""){
            setInfoBar("bg-danger", "Select An Item To Update!");
            enable(btnId, spinnerId);
            return;
        }        
        for (let i=0; i < img.length; i++){
            if (img[i] === null){
                setInfoBar("bg-danger", "Select A Valid Image!");
                enable(btnId, spinnerId);
                return;
            }

            const formData = new FormData();
            formData.append('image', img[i]);
            formData.append('id', this.state.id);
            formData.append('name', btnId);
            formData.append('count', i);
                                    
            let apiPath = getUrl("updatePic.php");
            axios({
                method: 'post',
                url: apiPath,
                headers: {
                    'content-type': 'multipart/form-data'
                },
                data: formData
            })            
            .then(res => {                
                if ((res.data.message) === "success"){
                    setInfoBar("bg-success", "Image Updated!");
                    switch (btnId) {
                        case "btnImage":
                            this.setState({imgName: res.data.file});
                        break;
                        case "btnImage1":
                            this.setState({imgName1: res.data.file});
                        break;
                        case "btnImage2":
                            this.setState({imgName2: res.data.file});
                        break;
                        case "btnImage3":
                            this.setState({imgName3: res.data.file});
                        break;
                        case "btnImage4":
                            this.setState({imgName4: res.data.file});
                        break;
                        case "btnImage5":
                            this.setState({imgName5: res.data.file});
                        break;
                        case "btnSave":
                            setInfoBar("bg-success", "All Images Updated!");
                            switch (i) {
                                case 0:
                                    this.setState({imgName: res.data.file});       
                                break;
                                case 1:
                                    this.setState({imgName1: res.data.file});       
                                break;
                                case 2:
                                    this.setState({imgName2: res.data.file});       
                                break;
                                case 3:
                                    this.setState({imgName3: res.data.file});       
                                break;
                                case 4:
                                    this.setState({imgName4: res.data.file});       
                                break;
                                case 5:
                                    this.setState({imgName5: res.data.file});       
                                break;
                                default:
                                break;
                            }                            
                        break;
                        default:
                        break;
                    }
                    enable(btnId, spinnerId);                    
                }else{
                    enable(btnId, spinnerId);
                }
            })       
        }        
    }

    headChange(e){   
        var hActive = document.getElementsByClassName("headActive")[0];        
        if (e.target.className === "headInactive"){
            hActive.className = "headInactive";
            e.target.className = "headActive";
            if(e.target.innerText === "EDIT INFO"){
                document.getElementsByClassName("inputAddItem")[0].style.display = "flex";
                document.getElementsByClassName("inputAddItem")[1].style.display = "none";
                document.getElementById("btnSave").onclick = this.onSubmit;
                this.setState({btnName: 'UPDATE ITEM'});
            }else{
                document.getElementsByClassName("inputAddItem")[0].style.display = "none";
                document.getElementsByClassName("inputAddItem")[1].style.display = "flex";
                document.getElementById("btnSave").onclick = this.UpdateImages;
                this.setState({btnName: 'UPDATE ALL IMAGES'});                
            }
        }        
    }
    
    onSubmit(e){
        disable(e.target.id);     
        if (!checkValid(
            this.state.name,
            this.state.brand,
            this.state.color,            
            this.state.price,
            this.state.discount,
            this.state.category,
            this.state.quantity,
            this.state.description,
            this.state.seller
        )){
            enable(e.target.id);
            return;
        }
                
        const url = getUrl("update_item.php");
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
                setInfoBar("bg-success", "Item Updated successfully!");                                  
            }
            enable(e.target.id);
            const data = {
                id: '',
                name: '',
                brand: '',
                color: '',                
                price: '',
                discount: '',
                category: '',
                quantity: '',
                description: '',                
            };
            this.setState(data);
        })
        .catch(error => this.setState({
            error: error.message
        }));  
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
                    <div id='editorHead'>
                        <h4 className='headActive' onClick={this.headChange}>EDIT INFO</h4>
                        <div></div>
                        <h4 className='headInactive' onClick={this.headChange}>EDIT IMAGES</h4>
                    </div>
                    <Table striped bordered hover responsive id="tblItems">
                            <thead>
                            <tr className="tableHead">
                                <th>S/N</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Color</th>                                
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Quantity</th>                                
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.elements}
                            </tbody>                            
                        </Table>                           
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

                    <div className='inputAddItem' style={{display: 'none'}}>
                        <div className='inputEditDiv'>
                            <label>Item Image <span className='text-danger'>*</span></label>
                            <div className='extraImages'><img alt='Preview' src={getUrl("uploads/" + this.state.imgName)}/></div>
                            <FormControl type="file" accept='image/*'
                            onChange={this.onChangeImg}
                            />
                            <Button id='btnImage' onClick={this.onUpdateImage}>
                                <FaSave/> Update Image
                                <Spinner id='btnSpinner0' animation='border' role={'status'} size='sm' hidden>                            
                                </Spinner>
                            </Button>
                        </div>
                        <div className='inputEditDiv'>
                            <label>Additional Image1 <span className='text-danger'>*</span></label>
                            <div className='extraImages'><img alt='Preview' src={getUrl("uploads/" + this.state.imgName1)}/></div>
                            <FormControl type="file" accept='image/*'
                            onChange={this.onChangeImg1}
                            />
                            <Button id='btnImage1' onClick={this.onUpdateImage1}>
                                <FaSave/> Update Image
                                <Spinner id='btnSpinner1' animation='border' role={'status'} size='sm' hidden>                            
                                </Spinner>
                            </Button>
                        </div>
                        <div className='inputEditDiv'>
                            <label>Additional Image2 <span className='text-danger'>*</span></label>
                            <div className='extraImages'><img alt='Preview' src={getUrl("uploads/" + this.state.imgName2)}/></div>
                            <FormControl type="file" accept='image/*'
                            onChange={this.onChangeImg2}
                            />
                            <Button id='btnImage2' onClick={this.onUpdateImage2}>
                                <FaSave/> Update Image
                                <Spinner id='btnSpinner2' animation='border' role={'status'} size='sm' hidden>                            
                                </Spinner>
                            </Button>
                        </div>
                        <div className='inputEditDiv'>
                            <label>Additional Image3 <span className='text-danger'>*</span></label>
                            <div className='extraImages'><img alt='Preview' src={getUrl("uploads/" + this.state.imgName3)}/></div>
                            <FormControl type="file" accept='image/*'
                            onChange={this.onChangeImg3}
                            />
                            <Button id='btnImage3' onClick={this.onUpdateImage3}>
                                <FaSave/> Update Image
                                <Spinner id='btnSpinner3' animation='border' role={'status'} size='sm' hidden>                            
                                </Spinner>
                            </Button>
                        </div>
                        <div className='inputEditDiv'>
                            <label>Additional Image4 <span className='text-danger'>*</span></label>
                            <div className='extraImages'><img alt='Preview' src={getUrl("uploads/" + this.state.imgName4)}/></div>
                            <FormControl type="file" accept='image/*'
                            onChange={this.onChangeImg4}
                            />
                            <Button id='btnImage4' onClick={this.onUpdateImage4}>
                                <FaSave/> Update Image
                                <Spinner id='btnSpinner4' animation='border' role={'status'} size='sm' hidden>                            
                                </Spinner>
                            </Button>
                        </div>
                        <div className='inputEditDiv'>
                            <label>Additional Image5 <span className='text-danger'>*</span></label>
                            <div className='extraImages'><img alt='Preview' src={getUrl("uploads/" + this.state.imgName5)}/></div>
                            <FormControl type="file" accept='image/*'
                            onChange={this.onChangeImg5}
                            />
                            <Button id='btnImage5' onClick={this.onUpdateImage5}>
                                <FaSave/> Update Image
                                <Spinner id='btnSpinner5' animation='border' role={'status'} size='sm' hidden>                            
                                </Spinner>
                            </Button>
                        </div>
                    </div>
                    <div id='btnDiv'><Button id='btnSave'>
                        <FaSave/> {this.state.btnName}
                        <Spinner id='btnSpinner' animation='border' role={'status'} size='sm' hidden>                            
                        </Spinner>
                    </Button></div>
                </div>                
            </section>
            </>
        )
    }
}


function checkValid(name, brand, color, price, discount, category, quantity, description, seller) {    
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
    return true;
}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

export default EditItem;