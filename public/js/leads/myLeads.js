const pendingTable = document.querySelector('.pending-table');
const pendingTitle = document.querySelector('.without-pending');

const contactedTable = document.querySelector('.contacted-table');
const contactedTitle = document.querySelector('.contacted-lead');

const followTable = document.querySelector('.follow-table');
const followTitle = document.querySelector('.follow-lead');

const status = ['Pendiente', 'En Seguimiento', 'Contactado']


const createTable = (table, leads = {}, row) => {
    const tableRow = document.querySelectorAll(row);

    if (tableRow.length > 0) {
        for (let i = 0; i < tableRow.length; i++) {
            table.removeChild(tableRow[i]);
        }
    }

    leads.forEach(lead => {
        table.innerHTML += `
        <a class="mini-table-row ${ row }" href="${ url }/leads/view/${ lead.id }?tkn=${ token }">
            <nav class="mini-table-body-item">${ lead.name }</nav>
            <nav class="mini-table-body-item">${ lead.email }</nav>
            <nav class="mini-table-body-item">${ lead.saler_note || '-------------' }</nav>
            <nav class="mini-table-body-item">${ status[lead.contact_status] }</nav>
        </a>
        `; 
    });
}

const init = async() => {
    // ? Fetch para prospectos pendientes asignados a mi;
    fetch(`${ url }/users/get-my-leads`, {
        method: 'GET',
        headers: {
            status: 0,
            tkn: token
        },
    })
    .then(response => response.json())
    .then(({ leads, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error } No se han podido cargar los datos.`);
            return console.error(error);
        }

        if (leads.length > 0) {
            pendingTable.hidden = false;
            pendingTitle.hidden = true;
            createTable(pendingTable, leads, '.pending-row');
        }
    })
    .catch(console.error());

    // ? Fetch para prospectos contactados en seguimiento asignados a mi;
    fetch(`${ url }/users/get-my-leads`, {
        method: 'GET',
        headers: {
            status: 1,
            tkn: token
        },
    })
    .then(response => response.json())
    .then(({ leads, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error } No se han podido cargar los datos.`);
            return console.error(error);
        }

        if (leads.length > 0) {
            followTable.hidden = false;
            followTitle.hidden = true;
            createTable(followTable, leads, '.follow-row');
        }
    })
    .catch(console.error());

    // ? Fetch para prospectos contactados asignados a mi;
    fetch(`${ url }/users/get-my-leads`, {
        method: 'GET',
        headers: {
            status: 2,
            tkn: token
        },
    })
    .then(response => response.json())
    .then(({ leads, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error } No se han podido cargar los datos.`);
            return console.error(error);
        }
        set
        if (leads.length > 0) {
            contactedTable.hidden = false;
            contactedTitle.hidden = true;
            createTable(contactedTable, leads, '.contacted-row');
        }
    })
    .catch(console.error());
}

const main = async() => {
    await init();
}

main();
