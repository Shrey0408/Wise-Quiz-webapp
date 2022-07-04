var errorElement = document.getElementById("showError");
const populateFields = () => {
    username = sessionStorage.getItem("wiseQuizUsername");
    document.getElementById("usernameInput").value = username;
    
    firstname = document.getElementById("firstnameInput");
    lastname = document.getElementById("secondnameInput");
    email = document.getElementById("emailInput");

    const url = `${wiseQuizApi.url}/api/users/${username}`;
    const myHeaders = new Headers();
    myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
    const getQuestionsRequest = new Request(url, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    });
    fetch(getQuestionsRequest)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            data = isJson ? await response.json() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log(data);
            firstname.value = data.firstname;
            lastname.value = data.lastname;
            email.value = data.email;
        })
        .catch((e) => {
            console.log(e);
        });
};
const updateProfile = () => {

    firstname = document.getElementById("firstnameInput").value;
    lastname = document.getElementById("secondnameInput").value;
    email = document.getElementById("emailInput").value;
    username = document.getElementById("usernameInput").value;

    if (firstname == "" || lastname == "" || email == "" || username == "") {
        errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Please enter all values<b></center></div>`;
        setTimeout(function () {
            errorElement.innerHTML = "";
        }, 3000);
        return;
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Invalid Email!<b></center></div>`;
        document.getElementById("emailInput").value = "";
        setTimeout(function () {
            errorElement.innerHTML = "";
        }, 3000);
        return;
    }

    userBody = `{"firstname":"${firstname}","lastname":"${lastname}","email":"${email}","username":"${username}"}`;
    const url = `${wiseQuizApi.url}/api/users/${username}`;
    const myHeaders = new Headers();
    myHeaders.set("Content-Type","application/json");
    myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
    sendData = {
        method: 'put',
        headers: myHeaders,
        body: userBody
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
            errorElement.innerHTML = `<div class="alert alert-success" role="alert"><center><b>Success! Your User account has been updated <b></center></div>`;
            console.log(data);
            setTimeout(function () {
                errorElement.innerHTML = "";        
            }, 2000);

        })
        .catch((e) => {
            console.log(e);
            errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Error!<b></center></div>`;
        });
    setTimeout(function () {
        errorElement.innerHTML = "";
    }, 3000);
};

populateFields();
document.getElementById("updateProfileBtn").addEventListener('click', updateProfile);

