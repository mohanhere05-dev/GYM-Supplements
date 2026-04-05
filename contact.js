const hanBurger = document.querySelector('.hamburger');
const navBar = document.querySelector('.navbar');

hanBurger.addEventListener('click', () => {
    navBar.classList.toggle('active');
});