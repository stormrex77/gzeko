import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import NavBar from "../components/navbar";
import ProfileBar from "../components/profile_bar";
import './styles/bas.css';

class BAS extends Component{
    constructor() {
        super()        
        this.state = {
            name: "",
            email: "",
            phone1: "",
            phone2: "",
            state: "",
            area: "",
            address: ""
        }
    }

render(){
return (
    <>
        <NavBar/>
        <section id='profileBody'>
        <div id='profileSideMenu' className='bg-light border'>
            <ProfileBar/>
        </div>
        
        <div id="bas_container">
            <h3>Become A Seller</h3>
                <div className="inputAddItem">
                    <div className='inputEditDiv'>
                    <label>Seller Name <span className='text-danger'>*</span></label>
                    <input type="text"
                        maxLength={150}
                        placeholder="Seller Name Visible To All"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value})}                            
                        />                        
                    </div>
                    <div className='inputEditDiv'>
                    <label>Email <span className='text-danger'>*</span></label>
                    <input type="text"
                        maxLength={150}
                        placeholder="Enter Valid Email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value})}
                        />
                    </div>
                    <div className='inputEditDiv'>
                    <label>Phone Number 1 <span className='text-danger'>*</span></label>
                    <input type="text"
                        maxLength={100}
                        placeholder="Enter Phone Number"
                        value={this.state.phone1}
                        onChange={e => this.setState({ phone1: e.target.value})}
                        />
                    </div>
                    <div className='inputEditDiv'>
                        <label>Phone Number 2 <span className='text-danger'></span></label>
                        <input type="text"
                        maxLength={100}
                        placeholder="Enter Phone Number"
                        value={this.state.phone2}
                        onChange={e => this.setState({ phone2: e.target.value})}
                        />
                    </div>                    
                    <div className='inputEditDiv'>
                        <label>State <span className='text-danger'>*</span></label>
                        <select
                        value={this.state.state}
                        onChange={e => this.setState({ state: e.target.value})}>
                            <option value={""}>...</option>
                            <option value={"Edo"}>Edo</option>  
                        </select>
                    </div>
                    <div className='inputEditDiv'>
                        <label>Area <span className='text-danger'>*</span></label>
                        <select
                        value={this.state.area}
                        onChange={e => this.setState({ area: e.target.value})}>
                            <option value={""}>...</option>
                            <option value={"Benin"}>Benin</option>
                        </select>
                    </div>
                    <section className='divTextArea'>
                        <label>Address <em>(shop address)</em> <span className='text-danger'>*</span></label>
                        <textarea
                        maxLength={1500}
                        rows={7}
                        value={this.state.address}
                        onChange={e => this.setState({ address: e.target.value})}>
                        </textarea>
                    </section> 
                </div>                 
                <div id='btnDiv'><Button id='btnSave' onClick={this.onSubmit}>
                    <FaSave/> BECOME A SELLER
                    <Spinner id='btnSpinner' animation='border' role={'status'} size='sm' hidden>                            
                    </Spinner>
                </Button></div>
            </div>
        </section>    
    </>
)
}
}

export default BAS;