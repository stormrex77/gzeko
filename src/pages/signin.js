import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { FaFacebook, FaGooglePlus, FaLock, FaRegAddressBook, FaUser } from 'react-icons/fa';
import NavBar from '../components/navbar';
import './styles/account.css';
import {getUrl, setInfoBar, enable, disable, withRouter} from '../components/api/index';
import axios from 'axios';

class SignIn extends Component{
    constructor() {
        super()        
        this.state = {            
            email: "",            
            password: ""            
        }        
    }

render(){
return (
	<>
	<NavBar/>
	<div id="account-form">
        <div>
            <ul className="form-header">
                <li><label><FaLock/> LOGIN</label></li>
                <li><a className='form-header-new' href='#/accounts/signup'><label><FaRegAddressBook/> Register</label></a></li>
            </ul>
        </div>

        <section className="account-section">
            <div className="account-div">
                <form action="">
                    <ul className="ul-list">
                        <li>
                        <div className="wrapper">
                            <div className="input-data">
                            <input type="text" required className="input" maxLength={120} name="email"
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                            />
                            <span className="icon"><FaUser/></span>
                            <label className="px-1">Your Email</label>
                            </div>
                        </div>
                        </li>                        
                        <li>
                        <div className="wrapper">
                            <div className="input-data">
                            <input type="password" required className="input" maxLength={100}
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                            />
                            <span className="icon"><FaLock/></span>
                            <label className="px-1">Password</label>
                            </div>
                        </div>
                        </li>
                        <li><span className="remember"><input type="checkbox" id="check"/><label>Remember
                                Me</label></span><span className="remember"><a href="#/">Forget Password</a></span>
                        </li>
                        <li className='signButton posRelative'>
                        <input id='btnSign' type="submit" value="SIGN IN" className="btnSignIn" onClick={e => setUser(e, this.state, this.props)}/>
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

function setUser(e, data, history){
    disable("btnSign", "btnSpinner");
    if (!checkValid(        
        data.email,        
        data.password        
    )){
        enable("btnSign", "btnSpinner");    
        return;
    }
    e.preventDefault();
    let apiPath = getUrl("set_login.php");
    axios.post(apiPath, data)
    .then(res => {
        enable("btnSign", "btnSpinner");
        switch (res.data.message){
            case "success":
                setInfoBar("bg-success","Registered!");
                let path = "/profile";
                history.navigate(path);                
            break;
            case "failed":
                setInfoBar("bg-danger","Invalid Username or Password!");                
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

function checkValid(email, password) {    
    if (isEmpty(email) || isEmpty(password)){
        setInfoBar("bg-danger","Fill In All Information!");
        return false;
    }    
    return true;
}

function isEmpty(str){    
    return str === null || str.match(/^ *$/) !== null;
}


export default withRouter(SignIn);


