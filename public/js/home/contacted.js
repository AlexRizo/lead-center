const viewLead = (id) => {
    window.location = `${ url }/leads/view/${ id }?tkn=${ token }`;
}

const init = async() => {
    // ! Sockets zone;
    socket.on('send-admin-notes', async({ messages }) => {
        createNotes(messages);
    });
}

const main = async() => {
    await init();
}

main();