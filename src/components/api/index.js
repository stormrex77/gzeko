import axios from "axios";
import { useNavigate } from "react-router-dom";

let hostname = window.location.hostname;

function getUrl(target){
    return "http://" + hostname + "/gzekodata/" + target; 
}

function addCart(data){
    var cartInfo = document.getElementById("cartInfo");
    let cartNo = cartInfo.innerText;            
    if (cartNo < 99){
        cartNo++;
        cartInfo.innerText = cartNo;
        cartInfo.style.setProperty("display","block");
        saveCart(data);
    }
}

function viewItem(data){
    sessionStorage.setItem("id", data.id);
    let path = "/view-item?" + data.name;
    data.nav(path);
}

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

function setInfoBar(bg, text){
    const infoBar = document.getElementById("infoBar");
    infoBar.className = bg;
    infoBar.innerText = text;
}

function disable(btnId, spinner) {
    const btnSave = document.getElementById(btnId);
    const btnSpinner = document.getElementById(spinner);
    const infoBar = document.getElementById("infoBar");

    btnSave.setAttribute("disabled", true);
    btnSpinner.removeAttribute("hidden");
    infoBar.style.display = "none";
}

function enable(btnId, spinner) {    
    const btnSave = document.getElementById(btnId);
    const btnSpinner = document.getElementById(spinner);
    const infoBar = document.getElementById("infoBar");

    btnSave.removeAttribute("disabled");
    btnSpinner.setAttribute("hidden", true);
    infoBar.style.display = "block";
    infoBar.scrollIntoView();
    setTimeout(displayNone , 4000);
}

function displayNone(){
    const infoBar = document.getElementById("infoBar");
    infoBar.style.display = "none";    
}

const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        return (
            <Component navigate = {navigate}{...props}/>
        );
    };
    return Wrapper;
};


export {getUrl, addCart, viewItem, setInfoBar, enable, disable, withRouter}