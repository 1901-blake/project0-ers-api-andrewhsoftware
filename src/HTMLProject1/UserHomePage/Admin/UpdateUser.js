let user = JSON.parse(sessionStorage.getItem('session'));
if (user === null) {
    window.location.replace('http://localhost:5500/Project-0/project0-ers-api-andrewhsoftware/src/HTMLProject1/Login/login.html');
}
else if (user.role == 3) {
    window.location.replace("http://localhost:5500/Project-0/project0-ers-api-andrewhsoftware/src/HTMLProject1/UserHomePage/home.html");
}
else if (user.role == 2) {
    window.location.replace("http://localhost:5500/Project-0/project0-ers-api-andrewhsoftware/src/HTMLProject1/UserHomePage/home.html");
}
window.onload = function () {
    if (user.role == 3) {
        document.getElementById("finance-manager").style.display = "none";
        document.getElementById("admin").style.display = "none";
    }
    else if (user.role == 2) {
        document.getElementById("admin").style.display = "none";
    } else if (user.role == 1) {
        console.log("hello admin");
    }
    AllUserTable();
}
async function AllUserTable() {

    const result = await fetch(`http://localhost:3000/users`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const body = await result.json();
    console.log("before body");
    console.log(body);

    let table = document.getElementById("All_Users_table");
    console.log(table);
    for (let index = 0; index < body.length; index++) {
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

        user_idcell.innerHTML = body[index].userid;
        usernamecell.innerHTML = body[index].username;
        firstnamecell.innerHTML = body[index].firstname;
        lastnamecell.innerHTML = body[index].lastname;
        emailcell.innerHTML = body[index].email;
        roleidcell.innerHTML = body[index].role.roleid;
    }
}
async function Update_User(event) {
    event.preventDefault();
    let id = document.getElementById('submit_userid');
    let username = document.getElementById('submit_username');
    let firstname = document.getElementById('submit_firstname');
    let lastname = document.getElementById('submit_lastname');
    let email = document.getElementById('submit_email');
    let role = document.getElementById('submit_role');

    let inputValue = {
        userid: id.value,
        username: username.value,
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        role: role.value

    }

    const result = await fetch(`http://localhost:3000/users`, {// method get by default
        method: 'PATCH',
        body: JSON.stringify(inputValue),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    console.log(result);
    console.log(result.status);


}