// Код остается без изменений
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');

signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

const sidebar = document.getElementById('sidebar');
const closeSidebarButton = document.getElementById('closeSidebarButton');
const contentContainer = document.querySelector('.content-container');

// Открытие бокового меню
closeSidebarButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    contentContainer.classList.toggle('sidebar-open');
});