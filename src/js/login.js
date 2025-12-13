let formMode = 'login'; // 'login' ou 'register'

const modeSwitchButtons = document.querySelectorAll('header span');
async function modeSwitch(mode) {
    if (formMode === mode) return;
    formMode = mode;

    modeSwitchButtons.forEach((button) => button.classList.toggle('not-selected'));
    
    const h1 = document.querySelector('h1');
    h1.textContent = mode === 'register' ? 'Registrar' : 'Login';
}

modeSwitchButtons[0].addEventListener('click', () => modeSwitch('login'));
modeSwitchButtons[1].addEventListener('click', () => modeSwitch('register'));

const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post(`/api/auth/${formMode}`, { name, password });
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/home';
    } catch (error) {
        return alert(error.response.data.error || 'Erro desconhecido');
    }
});