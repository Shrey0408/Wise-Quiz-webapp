window.onload = () => {
    if (sessionStorage.getItem("accessTokenWiseQuiz") == null) {
        window.location.href = "login.html";
    }
    populateQuiz();
    displayAdminBtn();
};
const displayAdminBtn = ()=>{
    var decodedJWTBody = parseJwt(sessionStorage.getItem("accessTokenWiseQuiz"));
    var userRoles =  decodedJWTBody.roles;
    const adminBtn = document.getElementById('adminBtn');    
    console.log(userRoles);
    //If user roles contains ROLE_ADMIN role show Admin Button for Admin Controls 
    if(userRoles.includes("ROLE_ADMIN")){
        adminBtn.removeAttribute("hidden");
    }else{
        adminBtn.setAttribute("hidden", "hidden");
    }
};
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

var categoryWiseData = new Map();
const organizeData = (data) => {
    data.forEach(element => {
        if (categoryWiseData.has(element.category)) {
            categoryWiseData.get(element.category).push({ "id": element.id, "quizname": element.quizname });
        } else {
            let arr = [{ "id": element.id, "quizname": element.quizname }];
            categoryWiseData.set(element.category, arr);
        }
    });
}

const displayCategoryWiseData = () => {
    html = "";
    for (let [key, value] of categoryWiseData) {
        html += `<h2>${key}</h2>`;
        html += `<div id="category${key}" class="row container-fluid">`;
        value.forEach(element => {
            html += `<a class = "col-3 col-lg-3 col-md-3" href=questions.html?id=${element.id}&name=${element.quizname.trim().replace(/ /g, "%20")}>
            <div class="quizCard card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                  <h4 class="card-title">${element.quizname.trim()}</h4>
                </div>
              </div>
              </a>`;
        });
        html += "</div><br><br>";
    }
    document.getElementById("allquizes").innerHTML = html;
}

const populateQuiz = () => {
    if (sessionStorage.getItem("accessTokenWiseQuiz") == null) {
        window.location.href = "login.html";
    }
    quizurl = `${wiseQuizApi.url}/api/quiz`;
    const myHeaders = new Headers();
    myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
    const getQuizRequest = new Request(quizurl, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    });
    fetch(getQuizRequest)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                const organizedData = organizeData(data);
                return Promise.reject(error);
            }
            organizeData(data);
            displayCategoryWiseData(categoryWiseData);
        })
        .catch((e) => {
            console.log(e);
        });
}
//If admin Button is clicked redirect to admin.html page
document.getElementById("adminBtn").addEventListener('click',function(){
    window.location.href = "admin.html";
});

const searchQuizCards = () => {
    let inputVal = searchText.value.toLowerCase();
    let quizCards = document.getElementsByClassName("quizCard");
    Array.from(quizCards).forEach(function (element) {
        let cardTitle = element.getElementsByTagName("h4")[0].innerText.toLowerCase();
        if (cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }else {
            element.style.display = "none";
        }
    });
}

var searchText = document.getElementById("searchText");
