const table = document.querySelector('.table');

const createTable = (leads = {}) => {
    const tableRow = document.querySelectorAll('.table-body');

    if (tableRow.length > 0) {
        for (let i = 0; i < tableRow.length; i++) {
            table.removeChild(tableRow[i]);
        }
    }

    leads.forEach(lead => {
        table.innerHTML += `
        <a href="${ url }/leads/view/${ lead.id }?tkn=${ token }" class="table-body">
            <nav class="table-item tbit-1">${ lead.name }</nav>
            <nav class="table-item tbit-2">${ lead.email }</nav>
            <nav class="table-item tbit-3">${ lead.city }</nav>
            <nav class="table-item tbit-4">${ lead.phone_number }</nav>
            <nav class="table-item tbit-5">${ lead.Origin.name }</nav>
            <nav class="table-item tbit-6">${ lead.date_contact }</nav>
            <nav class="table-item tbit-7">${ ((lead.staffId) != null ? lead.Staff.name : 'Sin asignar') }</nav>
        </a>`; 
    });
}

const init = async() => {
    await fetch(`${ url }/users/get-pending`, {
        method: 'GET',
        headers: {
            tkn: token,
            ur: localStorage.getItem('ur'),
            uid: localStorage.getItem('uid')
        },
    })
    .then(response => response.json())
    .then(({ leads, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error } No se han podido cargar los datos.`);
            return console.error(error);
        }
        createTable(leads)
    })
    .catch(console.error());
}

const main = async() => {
    await init();
}

main();