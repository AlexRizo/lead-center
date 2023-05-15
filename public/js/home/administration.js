const form = document.querySelector('form') || null;
const noteSection = document.querySelector('.notes-section');

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    const inputs = document.querySelectorAll('.input');
    const formData = {};

    for (const input of inputs) {
        if (input.value.length === 0) {
            return sendNotification('Ha ocurrido un error', 'Existen campos vacíos.');
        } else {
            formData[input.name] = input.value
        }
    }

    console.log(formData);

    return socket.emit('new-alert', formData);
});

const viewAdmin = (id) => {
    window.location = `${ url }/administration/view/seller/${ id }?tkn=${ token }`;
}

const viewLead = (id) => {
    window.location = `${ url }/leads/view/${ id }?tkn=${ token }`;
}

const init = async() => {
    // TODO: ****
    socket.emit('get-admin-notes');

    // socket.on('send-admin-notes', ({ messages }) => {
    //     messages.forEach(message => {
    //         noteSection.innerHTML += `
    //         <div class="card admin">
    //             <div class="note">
    //                 <nav class="note-title">Usuarios Inactivos:</nav>
    //                 <p>Los usuarios inactivos no tienen acceso al sistema.</p>
    //             </div>
    //         </div>`;
    //     });
    // })

    // // ! Sockets zone;
    // socket.on('send-alert', ({ message }) => {
    //     const note = document.createElement('div');
    //     note.className = 'card admin';

    //     note.innerHTML = `
    //     <div class="card admin">
    //         <div class="note">
    //             <nav class="note-title">Usuarios Inactivos:</nav>
    //             <p>Los usuarios inactivos no tienen acceso al sistema.</p>
    //         </div>
    //     </div>
    //     `;
    // });
}

const main = async() => {
    await init();
}

main();