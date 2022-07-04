var categoryWiseData = new Map();
var showError = document.getElementById("showError");
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
        html += `<h3>${key}<h3>`;
        html += `<div id="category${key}" class="row container-fluid">`;
        document.getElementById("quizList").innerHTML = html;
        html += '<table class="table small">';
        
        value.forEach(element => {
            html += `<tr class="d-flex">
                        <td class="col-3">
                        <h5>${element.quizname.trim()}</h5></td>
                        <td class="col-2"></td>
                        <td><button class="btn btn-sm btn-outline-success mx-auto d-block mr-5 pr-5" onclick="window.location.href='addquestion.html?id=${element.id}&name=${element.quizname.trim().replace(/ /g, "%20")}'" id="addquestion" type="submit"><h6>Add Question</h6></button></td>
                        <td><button class="btn btn-sm btn-outline-success mx-auto d-block mr-5 pr-5" onclick="window.location.href='deletequestion.html?id=${element.id}&name=${element.quizname.trim().replace(/ /g, "%20")}'" id="deletequestion" type="submit"><h6>Delete Question</h6></button></td>
                        <td class="col-2"></td>
                        <td class="deleteQuizBtn" data-quizid="${element.id}"><button class="btn btn-sm btn-outline-success mx-auto d-block mr-5 pr-5 deleteQuizBtn" id="deletequiz${element.id}" type="submit" data-quizid="${element.id}"><h6 data-quizid="${element.id}" class="deleteQuizBtn">Delete Quiz</h6></button></td>
                        </tr>`;

        });

        html += "</table></div>";
    }
    document.getElementById("quizList").innerHTML = html;
}

const populateQuizList = () => {
    if (sessionStorage.getItem("accessTokenWiseQuiz") == null) {
        window.location.href = "login.html";
    }
    quizurl = `${wiseQuizApi.url}/api/quiz`;
    const myHeaders = new Headers();
    myHeaders.set("Content-Type","application/json");
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
};

const goToAdmin = ()=>{
    window.location.href = "../admin.html";
};
const deleteQuiz = (quizid)=>{
    if(confirm("Are you sure you want to delete this quiz ?")){
        deletequizurl = `${wiseQuizApi.url}/api/quiz/${quizid}`;
        console.log(deletequizurl);
        const myHeaders = new Headers();
        myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
        const deleteQuizRequest = new Request(deletequizurl, {
            method: 'DELETE',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        });
        fetch(deleteQuizRequest)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson ? await response.json() : null;
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            });

    }

};

document.getElementById("quizList").addEventListener('click', function(e){
    if(e.target.classList.contains("deleteQuizBtn")){
        //Retreiving data-quizid parameter from element
        deleteQuiz(e.target.getAttribute('data-quizid'));
    }
});
populateQuizList();
document.getElementById("back").addEventListener('click', goToAdmin);



