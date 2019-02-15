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
    MyUserTable();
}
async function MyUserTable(){

    let table = document.getElementById("My_User_table");
    console.log(table);
        let row = table.insertRow(table.rows.length);
        let user_idcell = row.insertCell(0);
        let usernamecell = row.insertCell(1);
        let firstnamecell = row.insertCell(2);
        let lastnamecell = row.insertCell(3);
        let emailcell = row.insertCell(4);
        let roleidcell = row.insertCell(5);


        user_idcell.className = 'Table_display';
        usernamecell.className = 'Table_display';
        firstnamecell.className = 'Table_display';
        lastnamecell.className = 'Table_display';
        emailcell.className = 'Table_display';
        roleidcell.className = 'Table_display';

        user_idcell.innerHTML = user.userid;
        usernamecell.innerHTML = user.username;
        firstnamecell.innerHTML = user.firstname;
        lastnamecell.innerHTML = user.lastname;
        emailcell.innerHTML = user.email;
        roleidcell.innerHTML = user.role;
    }
