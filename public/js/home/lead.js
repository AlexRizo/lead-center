const platformSelected = document.getElementById('platformId');
const staffSelected = document.getElementById('staffId');
const originSelected = document.getElementById('originId');
const form = document.querySelector('form');
const btnContact = document.querySelector('.contacted');
const btnFollow = document.querySelector('.follow');
const btnSave = document.querySelector('.submit');
const id = document.getElementById('id');
const inputs = document.querySelectorAll('.input');
const salerCard = document.querySelector('.seller');
const editSalerNote = document.querySelector('.edit-seller-note');
const salerNote = document.querySelector('.seller-note');

// ? Elementos creados;
const salerInput = document.createElement('textarea');
const saveSalerNote = document.createElement('button');

const createOptionsforSelect = (options, select) => {
    return options.forEach(option => {
        if (select.value != option.id) {
            select.innerHTML += `
                <option value="${ option.id }">${ option.name }</option>
            `;
        }
    });
}

const createSalerNoteActions = () => {
    salerInput.style.width = '100%';
    salerInput.style.height = 'fit-content';
    salerInput.style.padding = '5px';
    salerInput.style.resize = 'none';
    salerInput.maxLength = '500';
    salerInput.rows= '15';
    salerInput.value = salerNote.textContent
    salerInput.className = 'input';

    saveSalerNote.style.margin = '5px 0 0 0';
    saveSalerNote.className = 'btn';
    saveSalerNote.innerText = 'Guardar';

    salerNote.innerText = '';
    salerNote.appendChild(salerInput);
    salerCard.appendChild(saveSalerNote);
}

saveSalerNote.addEventListener('click', () => {
    socket.emit('save-seller-note', { id: id.value }, { saler_note: salerInput.value } );
})

editSalerNote.addEventListener('click', (ev) => {
    createSalerNoteActions();
});

const setContactStatus = (status = 0) => {
    const formData = { 
        id: id.value,
        contact_status: status
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
    .then(({ message, error }) => {
        if (error) {
            return sendNotification("Ha Ocurrido un Error", error);
        }

        sendNotification("Datos Enviados", message);
        setTimeout(() => {
            location.reload();
        }, 5300)
    })
}

btnFollow.addEventListener('click', () => {
    setContactStatus(1)
});

btnContact.addEventListener('click', () => {
    setContactStatus(2)
});


form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const formData = {};

    for (const el of inputs) {
        formData[el.name] = el.value;
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

    // ! Sockets zone;
    socket.on('seller-note-saved', ({ id }) => {
        sendNotification('Datos enviados', `Se ha actualizado el registro #${ id }.`);
        setTimeout(() => {
            location.reload();
        }, 5300);
    });
}

const main = async() => {
    await init();
}

main();