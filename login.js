const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    console.log("Register button clicked"); // Debug message
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    console.log("Login button clicked"); // Debug message
    container.classList.remove("active");
});
