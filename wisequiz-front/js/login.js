loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", loginFunction);
//If Enter is pressed in password field try to login
document.getElementById("passwordInput").addEventListener("keypress",(event)=>{
    if(event.key == "Enter"){
        loginFunction();
    }
});

function loginFunction() {
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;

    loginInfo = `{"username" : "${username}","password":"${password}"}`;
    const url = `${wiseQuizApi.url}/api/login`;
    sendData = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: loginInfo
    }
    console.log(sendData);
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
            console.log(data.accessToken);
            sessionStorage.setItem("accessTokenWiseQuiz", data.accessToken);
            sessionStorage.setItem("wiseQuizUsername", username);
            clear();
            //Redirect to below link on
            window.location.href = "quiz.html";
        })
        .catch((e) => {
            console.log(e);
            document.getElementById("loginError").innerHTML = `<span class="alert alert-danger">
                Invalid username or password
                </span><br><br>`;
            setTimeout(clear,2000);
        });
}
//Clear all fields and Error messsage
function clear(){
    document.getElementById("usernameInput").value="";   
    document.getElementById("passwordInput").value="";
    document.getElementById("loginError").innerHTML="";
}