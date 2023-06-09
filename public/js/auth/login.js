const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'https://altozano.leadscenter.work');

const token = localStorage.getItem('tkn') || null;

if (token && token.length > 10) {
    window.location = url;
}

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const btn = document.querySelector('button');

const formData = {};

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    for (const input of inputs) {
        if (!input.value) {
            input.style.borderColor = 'red'
            input.placeholder = 'Este campo es obligatorio *'
            return false;
        } else {
            input.style.borderColor = '';
            formData[input.name] = input.value;
        }
    }

    fetch(`${ url }/auth/login`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(({ error, tkn, ur, uid }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', error);
            return console.error(error);
        } else {
            localStorage.setItem('tkn', tkn);
            localStorage.setItem('ur', ur);
            localStorage.setItem('uid', uid);
            location.reload();
        }
    })
    .catch(console.error());
});