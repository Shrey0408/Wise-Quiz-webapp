var errorElement = document.getElementById("showError");
const addRoleToUser = () => {

    username = document.getElementById("usernameInput").value;
    if (username == "") {
        errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Please enter username<b></center></div>`;
        setTimeout(function () {
            errorElement.innerHTML = "";
        }, 3000);
        return;
    }
    roleToUserBody = `{"username" : "${username}","rolename":"ROLE_ADMIN"}`;
    const url = `${wiseQuizApi.url}/api/users/addroletouser`;
    const myHeaders = new Headers();
    myHeaders.set("Content-Type","application/json");
    myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
    sendData = {
        method: 'post',
        headers: myHeaders,
        body: roleToUserBody
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
            console.log("Added User Role");
            errorElement.innerHTML = `<div class="alert alert-success" role="alert"><center><b>Success! Admin role added to user ${username}<b></center></div>`;

        })
        .catch((e) => {
            if (e == 404) {
                errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>User Not Found<b></center></div>`;
            } else if (e == 409) {
                errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>User already has Admin role<b></center></div>`;
            }
        });
    setTimeout(function () {
        errorElement.innerHTML = "";
    }, 3000);
};
const goToAdmin = ()=>{
      window.location.href = "../admin.html";
};
document.getElementById("addAdmin").addEventListener('click', addRoleToUser);
document.getElementById("back").addEventListener('click', goToAdmin);
