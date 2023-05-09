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
            <nav class="table-item">${ lead.name }</nav>
            <nav class="table-item">${ lead.email }</nav>
            <nav class="table-item">${ lead.city }</nav>
            <nav class="table-item">${ lead.phone_number }</nav>
            <nav class="table-item">${ lead.reason }</nav>
            <nav class="table-item">${ lead.date_contact }</nav>
            <nav class="table-item">${ ((lead.staffId) != null ? lead.Staff.name : 'Sin asignar') }</nav>
        </a>`; 
    });
}

const init = async() => {
    await fetch(`${ url }/users/get-pending`, {
        method: 'GET',
        headers: { tkn: token },
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