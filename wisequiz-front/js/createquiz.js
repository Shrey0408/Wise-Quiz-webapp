var errorElement = document.getElementById("showError");
const createQuiz = () => {

    quizname = document.getElementById("quizNameInput").value;
    category = document.getElementById("categoryInput").value;
    if (quizname == "" || category == "") {
        errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Please fill all values<b></center></div>`;
        setTimeout(function () {
            errorElement.innerHTML = "";
        }, 3000);
        return;
    }
    newQuizBody = `{"quizname" : "${quizname}","category":"${category}"}`;
    const url = `${wiseQuizApi.url}/api/quiz`;
    const myHeaders = new Headers();
    myHeaders.set("Content-Type","application/json");
    myHeaders.set("Authorization", `Bearer ${sessionStorage.getItem("accessTokenWiseQuiz")}`);
    sendData = {
        method: 'post',
        headers: myHeaders,
        body: newQuizBody
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
            console.log("New Quiz created");
            errorElement.innerHTML = `<div class="alert alert-success" role="alert"><center><b>Success! New quiz ${quizname} created <b></center></div>`;

        })
        .catch((e) => {
            errorElement.innerHTML = `<div class="alert alert-danger" role="alert"><center><b>Error while creating new quiz!<b></center></div>`;
        });
    setTimeout(function () {
        errorElement.innerHTML = "";
    }, 3000);
};
const goToAdmin = () => {
    window.location.href = "../admin.html";
};
document.getElementById("createQuizBtn").addEventListener('click', createQuiz);
document.getElementById("back").addEventListener('click', goToAdmin);
