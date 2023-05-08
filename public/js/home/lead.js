const platformSelected = document.getElementById('platformId');
const staffSelected = document.getElementById('staffId');
const originSelected = document.getElementById('originId');
const form = document.querySelector('form');
const btnContact = document.querySelector('.contacted');
const btnSave = document.querySelector('.submit');
const id = document.getElementById('id');
const inputs = document.querySelectorAll('.input');

const createOptionsforSelect = (options, select) => {
    return options.forEach(option => {
        if (select.value != option.id) {
            select.innerHTML += `
                <option value="${ option.id }">${ option.name }</option>
            `;
        }
    });
}

btnContact.addEventListener('click', () => {
    const formData = { 
        id: id.value,
        contact_status: 1
    };

    fetch(`${ url }/users/update/contact-status/${ id.value }`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            tkn: token,
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(async({ message, error }) => {
        if (error) {
            return sendNotification("Ha Ocurrido un Error", error);
        }

        await sendNotification("Nueva Notificación", message);
        setTimeout(() => {
            location.reload();
        }, 5500)
    })
});

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const formData = {};

    for (const input of inputs) {
        formData[input.name] = input.value;
    }

    fetch(`${ url }/users/update/${ id.value }`, {
        method: 'PUT',
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
                
        sendNotification("Datos Enviados", message);
        setTimeout(() => {
            location.reload();
        }, 5300)
    })
});

const init = async() => {
    // TODO: ****
    await fetch(`${ url }/staff/get`, {
        method: 'GET',
        headers: { tkn: token },
    })
    .then(response => response.json())
    .then(({ response, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error }`);
            return console.error(error);
        }

        if (response.ur != 1) {
            createOptionsforSelect(response.staffs, staffSelected);
            createOptionsforSelect(response.origins, originSelected);
            createOptionsforSelect(response.platforms, platformSelected);
            btnSave.hidden = false;
        }
    })
    .catch(console.error());
}

const main = async() => {
    await init();
}

main();