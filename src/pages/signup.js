import React, { Component} from 'react';
import { Spinner } from 'react-bootstrap';
import { FaFacebook, FaGooglePlus, FaLock, FaUser, FaRegAddressBook, FaEnvelope, FaPhone } from 'react-icons/fa';
import NavBar from '../components/navbar';
import './styles/account.css';
import {getUrl, setInfoBar, enable, disable, withRouter} from '../components/api/index';
import axios from 'axios';

class SignUp extends Component{
    constructor() {
        super()        
        this.state = {
            fName: "",
            lName: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
            checked: false
        }        
    }
    
render(){
return (
	<>
	<NavBar/>
	<div id="account-form">
        <div>
            <ul className="form-header">
                <li><label><FaRegAddressBook/> REGISTER</label></li>
				<li><a className='form-header-new' href="#/accounts/signin"><label><FaLock/> LOGIN</label></a></li>
            </ul>
        </div>

        <section className="account-section">
            <div className="account-div">
                <form action="">
                    <ul className="ul-list">
                        <li>
                        <div className='rowDiv'>
						<div className="wrapper">
                            <div className="input-data">
                            <input type="text" required className="input" maxLength={50} name="name"
                            value={this.state.fName}
                            onChange={e => this.setState({fName: e.target.value})}
                             />
                             <span className="icon"><FaUser/></span>
                            <label className="px-1">First Name</label>
                            </div>
                        </div>
						<div className="wrapper">
                            <div className="input-data">
                            <input type="text" required className="input" maxLength={50} name="surname"
                            value={this.state.lName}
                            onChange={e => this.setState({lName: e.target.value})}
                            /><span
                                className="icon"><FaUser/></span>
                            <label className="px-1">Last Name</label>
                            </div>
                        </div>
						</div>
                        </li>
                        <li>
                        <div className='rowDiv'>
						<div className="wrapper">
                            <div className="input-data">
                            <input type="text" required className="input" maxLength={120} name="email"
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                            /><span
                                className="icon"><FaEnvelope/></span>
                            <label className="px-1">Email Address</label>
                            </div>
                        </div>
						<div className="wrapper">
                            <div className="input-data">
                            <input type="text" required className="input" maxLength={11} name="phoneNo"
                            value={this.state.phone}
                            onChange={e => this.setState({phone: e.target.value})}
                            /><span
                                className="icon"><FaPhone/></span>
                            <label className="px-1">Phone Number</label>
                            </div>
                        </div>
						</div>
                        </li>
						<li>
                        <div className='rowDiv'>
						<div className="wrapper">
                            <div className="input-data">
                            <input type="password" required className="input" maxLength={100}
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                            /><span
                                className="icon"><FaLock/></span>
                            <label className="px-1">Password</label>
                            </div>
                        </div>
						<div className="wrapper">
                            <div className="input-data">
                            <input type="password" required className="input" maxLength={100}
                            value={this.state.rePassword}
                            onChange={e => this.setState({rePassword: e.target.value})}
                            /><span
                                className="icon"><FaLock/></span>
                            <label className="px-1">Confirm Password</label>
                            </div>
                        </div>
						</div>
                        </li>
                        <li>
						<div className="form-check my-4">
							<input className="form-check-input" type="checkbox" id="termsCheck"
                            checked={this.state.checked}                        
                            onChange={e => this.setState({checked: e.target.checked})}
                            />
							<label className="form-check-label">I agree to the <a href="#/" className="text-danger">terms and conditions</a></label>
						</div>
                        </li>
                        <li className='signButton posRelative'>
                            <input id='btnSign' type="submit" value="SIGN UP" className="btnSignIn" onClick={e => addUser(e, this.state, this.props)}/>
                            <Spinner id='btnSpinner' animation='border' role={'status'} size='sm' hidden>                            
                            </Spinner>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="social-login">Or continue with &nbsp;
                <a href="https://web.facebook.com/Fb-Login-492560557525367/?_rdc=1&_rdr" className="fb"><FaFacebook/></a>
                <a href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin" className="gp"><FaGooglePlus/></a>
            </div>
        </section>
    </div>
	</>
)
}
}

function addUser(e, data, history){    
    disable("btnSign", "btnSpinner");
    if (!checkValid(
        data.fName,
        data.lName,
        data.email,
        data.phone,
        data.password,
        data.rePassword,
        data.checked
    )){
        enable("btnSign", "btnSpinner");        
        return;
    }
    e.preventDefault();
    let apiPath = getUrl("add_user.php");        
    axios.post(apiPath, data)
    .then(res => {
        enable("btnSign", "btnSpinner");
        switch (res.data.message){
            case "success":
                setInfoBar("bg-success","Registered!");
                let path = "/profile";
                history.navigate(path);                
            break;
            case "exist":
                setInfoBar("bg-danger","Email already registered!");
            break;
            default:
                setInfoBar("bg-danger","An Error Occured!");
            break;            
        }        
    })
    .catch(error => this.setState({
        error: error.message
    }));
}

function checkValid(fName, lName, email, phone, password, rePassword, checked) {    
    if (!checked){
        setInfoBar("bg-danger","Please, Accept The Terms And Conditions To Continue!");        
        return;
    }
    if (isEmpty(fName) || isEmpty(lName) || isEmpty(email) || isEmpty(phone) || isEmpty(password) || isEmpty(rePassword)){
        setInfoBar("bg-danger","Fill In All Information!");
        return false;
    }
    if (isNaN(phone)){
        setInfoBar("bg-danger","Enter Valid Phone Number!"); 
        return false;
    }
    if (password !== rePassword){
        setInfoBar("bg-danger","Passwords Doesn't Match!");
        return false;
    }
    return true;
}

function isEmpty(str){    
    return str === null || str.match(/^ *$/) !== null;
}


export default withRouter(SignUp);
