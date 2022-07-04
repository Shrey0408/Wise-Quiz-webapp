var errorElement = document.getElementById("showError");
const signup = () => {

    firstname = document.getElementById("firstnameInput").value;
    lastname = document.getElementById("lastnameInput").value;
    email = document.getElementById("emailInput").value;
    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;
    confirmPassword = document.getElementById("confirmpasswordInput").value;

    if (firstname == "" || lastname == "" ||  email =="" || username =="" || password =="" || confirmPassword=="") {
        errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Please enter all values<b></center></div>`;
        setTimeout(function () {
            errorElement.innerHTML = "";
        }, 3000);
        return;
    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Invalid Email!<b></center></div>`;
        document.getElementById("emailInput").value="";
        setTimeout(function () {
            errorElement.innerHTML = "";
        }, 3000);
        return;
    }
    if((errorMsg = validatePassword(password, confirmPassword)) !=""){
        document.getElementById("passwordInput").value = "";
        document.getElementById("confirmpasswordInput").value ="";
        errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>${errorMsg}<b></center></div>`;
        setTimeout(function () {
            errorElement.innerHTML = "";
        }, 3000);
        return;
    }
    newUserBody = `{"firstname":"${firstname}","lastname":"${lastname}","email":"${email}","username":"${username}","password":"${password}"}`;
    const url = `${wiseQuizApi.url}/api/users`;
    sendData = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: newUserBody
    }
    fetch(url, sendData)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            errorElement.innerHTML = `<div class="alert alert-success" role="alert"><center><b>Success! Your User account has been created <b></center></div>`;
            setTimeout(function () {
                errorElement.innerHTML = "";
                clear();
                window.location.href = "login.html";
            }, 2000);

        })
        .catch((e) => {
            console.log(e);
            if(e==409){
                errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Error!Username already exists in system<b></center></div>`;
            }else{
                errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Error!<b></center></div>`;
            }
            clear();
        });
    setTimeout(function () {
        errorElement.innerHTML = "";
    }, 3000);
};
const validatePassword= (password, confirmPassword)=>{
    if(password.length <8){
        return "Password length must be greater than 8 characters";
    }
    if(password != confirmPassword){
        return "Passowd and confirm passowrd did not match";
    }
    return "";
};
const clear = ()=>{
    document.getElementById("firstnameInput").value = "";
    document.getElementById("lastnameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("usernameInput").value = "";
    document.getElementById("passwordInput").value = "";
    document.getElementById("confirmpasswordInput").value = "";
}

document.getElementById("signupBtn").addEventListener('click', signup);

