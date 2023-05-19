const noteSection = document.querySelector('.notes-section');
const form = document.querySelector('form') || document.createElement('form');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    
    const inputs = document.querySelectorAll('.input');
    const formData = {};

    for (const input of inputs) {
        if (input.value.length === 0) {
            return sendNotification('Ha ocurrido un error', 'Existen campos vacíos.');
        } else {
            formData[input.name] = input.value
        }
    }

    return socket.emit('new-alert', formData);
});

const createNotes = (messages = {}) => {
    messages.forEach(message => {
        noteSection.innerHTML += `
        <div class="card admin">
            <div class="note">
                <nav class="note-title">${ message.name }</nav>
                <p>${ message.message }</p>
                <button class="btn btn-delete" onclick="deleteNote(${ message.id })">Eliminar</button>
            </div>
        </div>`;
    });
}

const deleteNote = (id) => {
    socket.emit('delete-note', id);
    sendNotification('Eliminando', 'Eliminando la nota...');
    setTimeout(() => {
        location.reload();
    }, 5500);
}

const viewAdmin = (id) => {
    window.location = `${ url }/administration/view/seller/${ id }?tkn=${ token }`;
}

const viewLead = (id) => {
    window.location = `${ url }/leads/view/${ id }?tkn=${ token }`;
}

const init = async() => {
    // ! Sockets zone;
    socket.emit('get-admin-notes');

    socket.on('send-admin-notes', async({ messages }) => {
        createNotes(messages);
    });
}

const main = async() => {
    await init();
}

main();