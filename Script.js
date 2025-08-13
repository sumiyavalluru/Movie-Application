const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function signup(e) {
    e.preventDefault();
    let username = document.getElementById("signupUsername").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Signup successful! Please login.");
    container.classList.remove("active");
}

function login(e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedEmail = localStorage.getItem("email");
    let storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "movies.html";
    } else {
        alert("Invalid credentials");
    }
}
