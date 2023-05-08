const table = document.querySelector('.mini-table');

const createTable = (leads = {}) => {
    const tableRow = document.querySelectorAll('.mini-table-row');

    if (tableRow.length > 0) {
        for (let i = 0; i < tableRow.length; i++) {
            table.removeChild(tableRow[i]);
        }
    }

    leads.forEach(lead => {
        table.innerHTML += `
        <a class="mini-table-row" href="${ url }/leads/view/${ lead.id }">
            <nav class="mini-table-body-item">${ lead.name }</nav>
            <nav class="mini-table-body-item">${ lead.email }</nav>
            <nav class="mini-table-body-item">${ lead.note || '-------------' }</nav>
            <nav class="mini-table-body-item">Pendiente</nav>
        </a>
        `; 
    });
}

const init = async() => {
    await fetch(`${ url }/users/get-my-leads`, {
        method: 'GET',
        headers: { tkn: token },
    })
    .then(response => response.json())
    .then(({ pendingLeads, error }) => {
        if (error) {
            sendNotification('Ha ocurrido un error', `${ error } No se han podido cargar los datos.`);
            return console.error(error);
        }
        table.hidden = false;
        createTable(pendingLeads)
    })
    .catch(console.error());
}

const main = async() => {
    await init();
}

main();
