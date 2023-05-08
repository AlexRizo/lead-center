const form = document.querySelector('form');
const btnSave = document.querySelector('.submit');
const inputs = document.querySelectorAll('.input');

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const formData = {};

    for (const input of inputs) {
        if (input.name === 'phone_number') {
            formData[input.name] = input.value.replace(/ /g, '');
        } else {
            formData[input.name] = input.value;
        }
    }

    fetch(`${ url }/users/create`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            tkn: token,
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(({ message, error }) => {
        if (error) {
            console.error(error);
            return sendNotification("Ha ocurrido un error", message || "Algunos datos no son correctos.");
        }
                
        sendNotification("Prospecto creado", message);
        // setTimeout(() => {
        //     location.reload();
        // }, 5300)
    })
});

const init = async() => {
    // TODO: ****
}

const main = async() => {
    await init();
}

main();