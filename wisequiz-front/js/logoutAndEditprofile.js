const logoutUser = ()=>{       

    sessionStorage.removeItem("accessTokenWiseQuiz");
    console.log(window.location.href.includes("/admin/"));
    if(window.location.href.includes("/admin/")){

        window.location.href= "../login.html";
    }else{
    window.location.href = "login.html";
    }
};
const editProfile = ()=>{
    if(window.location.href.includes("/admin/")){
        window.location.href= "../editprofile.html";
    }else{
    window.location.href = "editprofile.html";
    }
};
document.getElementById("editProfileBtn").innerText = sessionStorage.getItem("wiseQuizUsername");
document.getElementById("logoutBtn").addEventListener('click', logoutUser);
document.getElementById("editProfileBtn").addEventListener('click', editProfile);