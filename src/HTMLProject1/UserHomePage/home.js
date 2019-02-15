let user = JSON.parse(sessionStorage.getItem('session'));
if(user === null){
    window.location.replace('http://localhost:5500/Project-0/project0-ers-api-andrewhsoftware/src/HTMLProject1/Login/login.html');
}
window.onload = function(){
    if (user.role == 3){
        document.getElementById("finance-manager").style.display = "none";
        document.getElementById("admin").style.display = "none";
    }
    else if(user.role == 2){
        document.getElementById("admin").style.display = "none";
    } else if (user.role == 1){
        console.log("hello admin");
    }
}

//document.getElementById("myReimbursements").onclick(window.location.assign('../UserHomePage/MyReimbursements/.html'));