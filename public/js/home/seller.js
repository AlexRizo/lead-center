const form = document.querySelector('form');
const id = document.getElementById('id');
const inputs = document.querySelectorAll('.input');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = {};

    for (const input of inputs) {
        formData[input.name] = input.value;
    }

    fetch(`${ url }/staff/update/${ id.value }`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            tkn: token
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(({ message, error }) => {
        if (error) {
            return sendNotification("Ha Ocurrido un Error", error);
        }

        sendNotification('Datos Enviados', message);
        setTimeout(() => {
            location.reload();
        }, 5300);
    })
});

const init = async() => {
    // TODO: ****
}

const main = async() => {
    await init();
}

main();