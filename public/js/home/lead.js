const platformSelected = document.getElementById('platformId');
const staffSelected = document.getElementById('staffId');
const originSelected = document.getElementById('originId');
const form = document.querySelector('form');
const btnContact = document.querySelector('.contacted');
const btnFollow = document.querySelector('.follow');
const btnSave = document.querySelector('.submit');
const id = document.getElementById('id');
const inputs = document.querySelectorAll('.input');
const sellerCard = document.querySelector('.seller');
const editsellerNote = document.querySelector('.edit-seller-note');
const sellerNote = document.querySelector('.seller-note');

// ? Modal
const modal = document.querySelector('.modal');
const btnAddNote = document.querySelector('.btn-add-seller-note');
const note = document.querySelector('.input-for-modal');

// ? Notes
const divNotes = document.querySelector('.notes-section');

const openModal = () => {
    modal.classList.toggle('hidden');
}

const quitModal = () => {
    modal.classList.toggle('hidden');
}

const formatDate = (date) => {
    const fullDate = new Date(date)

    const newDate = {};

    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();

    if (day < 10) {
        newDate.day = '0' + day;
    } else {
        newDate.day = day
    }

    if (month < 10) {
        newDate.month = '0' + month;
    } else {
        newDate.day = month
    }

    newDate.year = year
    
    return newDate;
}

const createNotes = (notes = {}) => {
    divNotes.innerHTML = '';
    
    notes.forEach(note => {
        let date = formatDate(note.createdAt)
        divNotes.innerHTML += `
            <div class="card seller">
                <div class="seller-note">
                    <h4>${ date.day } / ${ date.month } / ${ date.year }</h4>
                    <p>${ note.name }</p>
                </div>
            </div>
        `;
    })
}

const createOptionsforSelect = (options, select) => {
    return options.forEach(option => {
        if (select.value != option.id) {
            select.innerHTML += `
                <option value="${ option.id }">${ option.name }</option>
            `;
        }
    });
}

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
            return sendNotification("Ha ocurrido un error", error);
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

btnAddNote.addEventListener('click', () => {
    if (note.value.length <= 0) {
        return sendNotification('Ha ocurrido un error', 'La nota no puede estar vacía.');
    }

    fetch(`${ url }/sellers/create/note`, {
        method: 'POST',
        headers: {
            tkn: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: note.value, userId: id.value })
    })
    .then(response => response.json())
    .then(({ message, error }) => {
        if (error) {
            console.error(error);
            return sendNotification('Ha ocurrido un error', error)
        }

        quitModal();
        note.value = '';
        
        sendNotification('Nota enviada', message);
        return socket.emit('new-note', { id: id.value });
    })
    .catch(console.error);
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
    .catch(console.error);

    fetch(`${ url }/sellers/get/lead-notes`, {
        method: 'GET',
        headers: { tkn: token, leadId: id.value }
    })
    .then(response => response.json())
    .then(({ notes, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error }`);
            return console.error(error);
        }
        createNotes(notes);
    })
    .catch(console.error);

    // ! Sockets zone;
    socket.on('seller-note-saved', ({ id }) => {
        sendNotification('Datos enviados', `Se ha actualizado el registro #${ id }.`);
        setTimeout(() => {
            location.reload();
        }, 5300);
    });
    
    socket.on('update-notes', ({ notes }) => {
        createNotes(notes);
    });
}

const main = async() => {
    await init();
}

main();