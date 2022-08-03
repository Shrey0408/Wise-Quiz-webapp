const check = () => {
    if ((accessToken = sessionStorage.getItem("accessTokenWiseQuiz")) != undefined) {
        var decodedJWTBody = parseJwt(sessionStorage.getItem("accessTokenWiseQuiz"));
        var userRoles = decodedJWTBody.roles;
        console.log(decodedJWTBody)
        //Check Expiry time. Go to login if current time is more than expiry date.
        const expiryDate = new Date(0);
        expiryDate.setUTCSeconds(decodedJWTBody.exp);
        const now = new Date();
        if (now > expiryDate) {
            goToLoginPage();
        }

        //Check for user roles
        if (!userRoles.includes("ROLE_USER")) {
            goToLoginPage();
        }
        if (window.location.href.includes("/admin/")) {
            if (!userRoles.includes("ROLE_ADMIN")) {
                html = "<br><br><h4 class='d-flex justify-content-center align-items-center'>You are not authorized.&nbsp;";
                html += `<a onclick="window.location.href='../quiz.html'" href="#" id="back"> <h6 class="my-5">Click here to go back</h6></a> </h4>`
                document.getElementsByTagName("body")[0].innerHTML = html;
            }
        } else if (window.location.href.includes("/admin")) {
            if (!userRoles.includes("ROLE_ADMIN")) {
                html = "<br><br><h4 class='d-flex justify-content-center align-items-center'>You are not authorized.&nbsp;";
                html += `<a onclick="window.location.href='quiz.html'" href="#" id="back"> <h6 class="my-5">Click here to go back</h6></a> </h4>`
                document.getElementsByTagName("body")[0].innerHTML = html;
            }
        }
    } else {
        goToLoginPage();
    }
};
//Decode the body of JWT token
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
const goToLoginPage = () => {
    if (window.location.href.includes("/admin/")) {

        window.location.href = "../login.html"
    } else {
        window.location.href = "login.html";
    }
};
check();