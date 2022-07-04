var categoryWiseData = new Map();
var showError = document.getElementById("showError");
window.onload = () => {
    if (sessionStorage.getItem("accessTokenWiseQuiz") == null) {
        window.location.href = "../login.html";
    }//Get parameters from URL
    if(!document.URL.includes('?id=')){

        window.location.href = "../quzlist.html";
    }
    var quizname = document.URL.split("=")[2].replace(/%20/g, " ");
    
    document.getElementById("quizname").innerHTML = `<strong>${quizname}<strong>`;
}

var quizid = document.URL.split("?")[1].split("=")[1].split("&")[0];

const displayQuestions = (data) => {
    html = "";
    console.log(quizid);
    data.forEach((element,index)=> {

        html += '<table class="table small">';
        html += `<tr class="d-flex">
                        <td class="col-10">
                        <h5>${index+1}. ${element.question.trim()}</h5></td>
                        
                        <td class="deleteQuestionBtn" data-questionid="${element.id}"><button class="btn btn-sm btn-outline-success mx-auto d-block mr-5 pr-5 deleteQuestionBtn" id="deletequestion${element.id}" type="submit" data-questionid="${element.id}"><h6 data-questionid="${element.id}" class="deleteQuestionBtn">Delete Question</h6></button></td>
                        </tr>`;

        html += "</table></div>";
    });
    document.getElementById("questionList").innerHTML = html;
}

const getquestions = () => {
    const url = `${wiseQuizApi.url}/api/quiz/question/all/${quizid}`;
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
                const organizedData = organizeData(data);
                return Promise.reject(error);
            }
            console.log(data);
            displayQuestions(data);
        })
        .catch((e) => {
            console.log(e);
        });
};


const deleteQuestion = (questionid)=>{
    console.log(questionid);
    if(confirm("Are you sure you want to delete this question ?")){
        deletequizurl = `${wiseQuizApi.url}/api/quiz/question/${quizid}/${questionid}`;
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

const goToAdmin = ()=>{
    window.location.href = "../admin.html";
};

document.getElementById("questionList").addEventListener('click', function(e){
    if(e.target.classList.contains("deleteQuestionBtn")){
        //Retreiving data-quizid parameter from element
        deleteQuestion(e.target.getAttribute('data-questionid'));
    }
});

getquestions();
document.getElementById("back").addEventListener('click', goToAdmin);




