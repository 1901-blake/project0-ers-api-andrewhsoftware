async function Login(event) {
    event.preventDefault(); // prevent default form submission
  
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    const credentials = {
      username,
      password
    }
  
    console.log(credentials);
    const result = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if (result.status === 200) {
  
      console.log('Success');
  
      let body = await result.json();
      sessionStorage.setItem('session', JSON.stringify(body));
  
      window.location.assign('../UserHomePage/home.html');
    } else {
      console.log('Invalid Password or Username.');
      document.getElementById('pass').value = '';
      document.getElementById('error-message').innerText = 'Invalid Username or Password. Have a nice day.';
    }
  
  
  }