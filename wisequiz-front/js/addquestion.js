var quizid = document.URL.split("?")[1].split("=")[1].split("&")[0];
var showError = document.getElementById("showError");
window.onload = () => {
    if (sessionStorage.getItem("accessTokenWiseQuiz") == null) {
        window.location.href = "../login.html";
    }//Get parameters from URL
    if(!document.URL.includes('?id=')){

        window.location.href = "../createquiz.html";
    }
    var quizname = document.URL.split("=")[2].replace(/%20/g, " ");
    document.getElementById("quizNameInput").value = quizname;
}
const clear = () =>{
    document.getElementById("questionInput").value ="";
    document.getElementById("optionA").value ="";
    document.getElementById("optionB").value ="";
    document.getElementById("optionC").value ="";
    document.getElementById("optionD").value ="";
    document.getElementById("correctAnswer").value ="";
};
const addQuestions = () => {

    quizname = document.getElementById("quizNameInput").value;
    question = document.getElementById("questionInput").value;
    optionA = document.getElementById("optionA").value;
    optionB = document.getElementById("optionB").value;
    optionC = document.getElementById("optionC").value;
    optionD = document.getElementById("optionD").value;
    correctAnswer = document.getElementById("correctAnswer").value;

    if (question == "" || optionA == "" || optionB == "" || optionC == "" || optionD == "" || correctAnswer == "Choose...") {
        showError.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Please fill all the values<b></center></div>`;
        setTimeout(function () {
            showError.innerHTML = "";
        }, 3000);
        return;
    }

    //Set correct answer according to Optioon selected by user
    switch (correctAnswer) {
        case "Option A":
            correctAnswer = optionA;
            break;
        case "Option B":
            correctAnswer = optionB;
            break;
        case "Option C":
            correctAnswer = optionC;
            break;
        case "Option D":
            correctAnswer = optionD;
            break;
    }
    console.log(question + " " + optionA + " " + optionB + " " + optionC + " " + optionD + " " + correctAnswer);
    newQuestionBody = `{"question":"${question}","option1":"${optionA}","option2":"${optionB}","option3":"${optionC}","option4":"${optionD}","answer":"${correctAnswer}"}`;
    const url = `${wiseQuizApi.url}/api/quiz/question/${quizid}`;
    const myHeaders = new Headers();
    myHeaders.set("Content-Type","application/json");
    myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
    sendData = {
        method: 'post',
        headers: myHeaders,
        body: newQuestionBody
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
            console.log("New Quiz creaQuestions Added");
            showError.innerHTML = `<div class="alert alert-success" role="alert"><center><b>Success! New Qustion added to Quiz ${quizname}<b></center></div>`;
            clear();
        })
        .catch((e) => {
            showError.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Error while adding new question!<b></center></div>`;
        });
    setTimeout(function () {
        showError.innerHTML = "";
    }, 3000);
};
const goToAdmin = () => {
    window.location.href = "../admin.html";
};
document.getElementById("addQuestionBtn").addEventListener('click', addQuestions);
document.getElementById("back").addEventListener('click', goToAdmin);
