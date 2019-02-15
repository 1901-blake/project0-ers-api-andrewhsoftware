let user = JSON.parse(sessionStorage.getItem('session'));
let status = sessionStorage.getItem('status');
console.log(user);
if (user === null) {
    window.location.replace('http://localhost:5500/Project-0/project0-ers-api-andrewhsoftware/src/HTMLProject1/Login/login.html');
}
else if (user.role == 3) {
    window.location.replace("http://localhost:5500/Project-0/project0-ers-api-andrewhsoftware/src/HTMLProject1/UserHomePage/home.html");
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
    ReimbursementsById(status);
}

async function ReimbursementsById(status){
    
    sessionStorage.setItem('status',document.getElementById('submit_status').value);
    console.log(status);
    const result = await fetch(`http://localhost:3000/reimbursements/status/${status}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
    const body = await result.json();
    console.log("before body");
    console.log(body);
    
    let table = document.getElementById("FindReimbursementsByIdTable");
    console.log(table);
    for (let index = 0; index < body.length; index++) {
        let row = table.insertRow(table.rows.length);
        let reimbursmentidcell = row.insertCell(0);
        let authorcell = row.insertCell(1);
        let amountcell = row.insertCell(2);
        let datesubmittedcell = row.insertCell(3);
        let dateresolvedcell = row.insertCell(4);
        let descriptioncell = row.insertCell(5);
        let resolvercell = row.insertCell(6);
        let statuscell = row.insertCell(7);
        let typecell = row.insertCell(8);


        reimbursmentidcell.className = 'Table_display';
        authorcell.className = 'Table_display';
        amountcell.className = 'Table_display';
        datesubmittedcell.className = 'Table_display';
        dateresolvedcell.className = 'Table_display';
        descriptioncell.className = 'Table_display';
        resolvercell.className = 'Table_display';
        statuscell.className = 'Table_display';
        typecell.className = 'Table_display';

        reimbursmentidcell.innerHTML = body[index].reimbursementid;
        authorcell.innerHTML = body[index].author;
        amountcell.innerHTML = body[index].amount;
        datesubmittedcell.innerHTML = body[index].datesubmitted;
        dateresolvedcell.innerHTML = body[index].dateresolved;
        descriptioncell.innerHTML = body[index].description;
        resolvercell.innerHTML = body[index].resolver;
        statuscell.innerHTML = body[index].status.status;
        typecell.innerHTML = body[index].type.type;
    }
}
async function Update_Reimbursement(event) {
    event.preventDefault();
    let id = document.getElementById('submit_id');
    let status = document.getElementById('submit_status');
    let type = document.getElementById('submit_type');
    console.log(id);
    console.log(status);
    console.log(type);
    let inputValue = {
        reimbursementid: id.value,
        status: status.value,
        type: type.selectedIndex + 1
    }

    const result = await fetch(`http://localhost:3000/reimbursements`, {// method get by default
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