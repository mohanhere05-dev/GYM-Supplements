if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

const hanBurger = document.querySelector('.hamburger');
const navBar = document.querySelector('.navbar');

hanBurger.addEventListener('click', () => {
    navBar.classList.toggle('active');
});