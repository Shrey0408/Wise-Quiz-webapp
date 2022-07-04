window.onload = () => {
    if (sessionStorage.getItem("accessTokenWiseQuiz") == null) {
        window.location.href = "login.html";
    }//Get parameters from URL
    if(!document.URL.includes('?id=')){

        window.location.href = "quiz.html";
    }
    var quizname = document.URL.split("=")[2].replace(/%20/g, " ");
    
    document.getElementById("quizname").innerHTML = quizname;
}

var quizid = document.URL.split("?")[1].split("=")[1].split("&")[0];
var data = [];
var noOfQuestions = 0;

const displayQuestions = (data) => {
    html = "<form>";
    data.forEach((element, index) => {
        noOfQuestions++;
        html += `<p><strong>${index + 1}. ${element.question}</strong></p>`;
        for (let i = 1; i <= 4; i++) {
            html += `<input type="radio" id="${element.id}${element["option" + i]}" name="${element.id}" value="${element["option" + i]}">
            <label for="${element.id}${element.option + i}">${String.fromCharCode(64 + i)}. ${element["option" + i]}</label><br>`;
        }
        html += "<br>";
    });
    console.log(noOfQuestions);
    if(noOfQuestions == 0){
       console.log("In");
        html = "<br><br><h4 class='d-flex justify-content-center align-items-center'>No questions to display. Please ask admin to add questions.&nbsp;";
        html += `<a onclick="window.location.href='quiz.html'" href="#" id="back"> <h6 class="my-5">Click here to go back</h6></a> </h4>`
        document.getElementById("mainContent").innerHTML = html;
        return;    
    }
    html += '<button type="button" id="evaluate" class="btn btn1 btn-outline-success">Evaluate</button></form>';
    html += `<br><button class="btn btn-outline-success" onclick="window.location.href='quiz.html'" id="back" type="submit">Back</button>`
    
    document.getElementById("questions").innerHTML = html;
    document.getElementById("evaluate").addEventListener("click", getResult);
};

//             <input type="radio" id="css" name="fav_language" value="CSS">
//             <label for="css">CSS</label><br>
//             <input type="radio" id="javascript" name="fav_language" value="JavaScript">
//             <label for="javascript">JavaScript</label>
//             <br>`;


const getquestions = () => {
    const url = `${wiseQuizApi.url}/api/quiz/question/all/${quizid}`;
    const myHeaders = new Headers();
    myHeaders.set("Content-Type","application/json");
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
            displayQuestions(data);
        })
        .catch((e) => {
            console.log(e);
        });
};

const getResult = () => {
    let answersWithQuestionId = [];
    data.forEach((element) => {
        if (document.querySelector(`input[name="${element.id}"]:checked`) !== null) {
            let obj = {"questionid": element.id,"answerEntered":document.querySelector(`input[name="${element.id}"]:checked`).value};
            document.querySelector(`input[name="${element.id}"]:checked`).value
            answersWithQuestionId.push(obj);
        }
    });
    console.log(answersWithQuestionId);
    const url = `${wiseQuizApi.url}/api/quiz/evaluate`;
    const myHeaders = new Headers();
    myHeaders.set("Content-Type","application/json");
    myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
    sendData = {
        method: 'post',
        headers: myHeaders,
        body: JSON.stringify(answersWithQuestionId)
    }
    fetch(url, sendData)
        .then(async response => {
            // const isJson = response.headers.get('content-type')?.includes('application/json');
            // const data = isJson ? await response.json() : null;
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            //Redirect to below link on
            console.log(data);
            sessionStorage.setItem("resultText",data+ " out of "+noOfQuestions);
            let percentage=parseInt(data)/noOfQuestions;
            if(percentage>0.5){
                window.location.href = "result.html?result=pass";
            }else{
                window.location.href = "result.html?result=fail";
            }
        })
        .catch((e) => {
            console.log(e);
        });
};
getquestions();




