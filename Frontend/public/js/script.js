function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Check if all fields are filled
    if (!username || !password || !role) {
        document.getElementById('message').innerText = 'Please fill in all fields.';
        return;
    }

    const loginData = {
        UserName: username,
        PassWord: password,
        Role: role
    };

    const jsonData = JSON.stringify(loginData);
    console.log('Sending data:', jsonData); // Debugging line to check what is sent

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU0113695b1e79289f816a87d2553cffbb6cfd0c8f0c956e5cbecbbbda45b79ad9cd841bcd683797d83d43e9a5bd46dac6'
        },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Error Response:', errorData); // Log the error
                // Show the error message with the username and password
                document.getElementById('message').innerText = `Login failed: ${errorData.message}. Username: ${username}, Password: ${password}`;
            });
        } else {
            return response.json();
        }
    })
    .then(data => {
        document.getElementById('message').innerText = `Login successful. Username: ${username}, Password: ${password}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = `Login failed. Please try again. Username: ${username}, Password: ${password}`;
    });
}




function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        document.getElementById('message').innerText = 'Please fill in both username and password.';
        return;
    }

    const url = (
        'http://localhost:3000/hello?' +
        new URLSearchParams({ myName: username, lastName: password}).toString()
      );
    
    fetch(url)
    .then(response => response.text())
    .then(text => {
        document.getElementById('message').innerText = text;
    })
    //.catch(error => console.error('Error:', error));
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Request failed. Please try again.';
    });
}
