function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Check if all fields are filled
    if (!username) {
        document.getElementById('message').innerText = 'Please enter username.';
        return;
    } else if (!password) {
        document.getElementById('message').innerText = 'Please enter password.';
        return;
    } else if (!role) {
        document.getElementById('message').innerText = 'Please select role.';
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
            'Application-Key': 'TU1acb64269387193be95049328ebbba3f11cc71937e930f5f1b3e1d8f9985db53a96caf0aa0dc69c2cedf625c59132f22'
        },
        body: jsonData
    })
    .then(response => {
        if (response.status === 200) {
            return response.json(); // Successful login, return the response data
        } else if (response.status === 401 || response.status === 403) {
            // Unauthorized or Forbidden - likely wrong username or password
            throw new Error('Invalid username or password.');
        } else {
            // Other status codes
            throw new Error('Login failed. Please try again.');
        }
    })
    .then(data => {
        // Login successful
        //console.log('Data from API:', data);
        const userFullName = data.displayname_en || username;
        document.getElementById('message').innerText = `Login successful.\nUsername: ${username}\nName: ${userFullName}\nRole: ${role}`;

        // Optional: Redirect to another page after successful login
        // window.location.href = '/dashboard.html'; // Example of redirecting to another page

        console.log('Login success:', data); // For debugging purposes
    })
    .catch(error => {
        // Handle error (invalid credentials or other)
        console.error('Error:', error.message);
        document.getElementById('message').innerText = error.message;
    });
}


