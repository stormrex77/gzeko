export function postData(type, userData){
    let url = "http://localhost/gzekodata/index.php";
    return new Promise((resolve, reject) =>{
        fetch(url+'?tp='+type,{
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then((response) => response.json()
        .then((res) => { resolve(res);
        }))
        .catch((error) => { reject(error);});
    });
}