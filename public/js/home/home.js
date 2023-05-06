const table = document.querySelector('.table');

const init = async() => {
    await fetch(`${ url }/users/get-pending`, {
        method: 'GET',
        headers: { tkn: 'token' },
    })
    .then(response => response.json())
    .then(({ leads, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error } No se han podido cargar los datos.`);
            return console.warn(error);
        }
        console.table(leads);
    })
    .catch(console.error());
}

const main = async() => {
    await init();
}

main();