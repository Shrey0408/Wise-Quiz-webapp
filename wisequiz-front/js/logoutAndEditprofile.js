const logoutUser = ()=>{       
    console.log("In");
    sessionStorage.removeItem("accessTokenWiseQuiz");
    if(window.location.href.includes("/admin/")){
        window.location.hef= "../login.html"
    }
    window.location.href = "login.html";
};
const editProfile = ()=>{
    if(window.location.href.includes("/admin/")){
        window.location.hef= "../editprofile.html"
    }
    window.location.href = "editprofile.html";
};
document.getElementById("editProfileBtn").innerText = sessionStorage.getItem("wiseQuizUsername");
document.getElementById("logoutBtn").addEventListener('click', logoutUser);
document.getElementById("editProfileBtn").addEventListener('click', editProfile);